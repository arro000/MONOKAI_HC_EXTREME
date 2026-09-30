@propertyWrapper
struct Box<T> {
    var wrappedValue: T
}

/// Loads a value.
/// - Parameter name: External argument label differs from the local name.
protocol Loader {
    associatedtype Item: Sendable
    func load(named name: String, _ count: Int) async throws -> Item?
    func clone() -> Self
}

actor Cache {
    @Box var count: Int = 0

    func load(named name: String, _ count: Int) async throws -> String? {
        self.count = count
        let text = "value: \(name)\n"
        let raw = #"value: \#(name)\#n"#
        let multiline = #"""
        value: \#(name)
        """#
        let multipleHashes = ##"value: \##(name)"##
        let optional: String? = name
        let forced: String! = name
        let size = optional?.count ?? forced!.count
        if #available(macOS 13, *) { print(text, raw, multiline, size, multipleHashes) }
        return name
    }
}

enum State {
    case idle
    case loaded(value: Int)
}

func inspect(_ cache: Cache) async throws {
    let result = try await cache.load(named: "demo", 1)
    let state: State = .loaded(value: result?.count ?? 0)
    print(state, SelfCheck.self)
}

struct SelfCheck {}

#if os(Linux) && compiler(>=6.0)
let location = #fileID
#else
let location = #file
#endif
