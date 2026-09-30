# Go highlighting analysis

## Verified classification

The built-in `source.go` grammar was inspected and tokenized. Semantic classifications were checked against gopls upstream.

- Builtin functions use `entity.name.function.support.builtin.go`; ordinary calls, including `fmt.Printf`, use `entity.name.function.support.go`.
- Primitive types use `storage.type.numeric.go`, `storage.type.string.go` and related scopes.
- Explicit import aliases use `variable.other.import.go`.
- Interfaces are emitted by gopls as `type.interface`, not `interface`.
- Recognized printf directives use `string.format`; TextMate uses `constant.other.placeholder.go`.

## Integrated rules

Builtin functions/types and import aliases are cyan. `type.interface:go` adds italic to interface names. `string.format:go` preserves purple placeholders under semantic highlighting. Receiver parameters, generics, properties, channels and concurrent control flow use the shared category colors.

## Recognition details

TextMate cannot distinguish generic declarations from value parameters, or interfaces from struct names. It also does not retain receiver/import identity at references. gopls v0.22+ classifies receivers as parameters and fields as properties; older versions can emit variables instead. `defaultLibrary` denotes predeclared symbols, rather than every function from the standard library.

Raw strings and struct tags keep string colors. Build constraints are comments in the installed grammar; gopls can highlight `go:build` as a namespace. Godoc links use semantic classifications of the resolved symbols.

Example: [`examples/go/preview.go`](../../examples/go/preview.go).

## Sources

- [Installed grammar revision](https://github.com/worlpaker/go-syntax/blob/c74e22eb9ef32958e3edd130ea750ce78d8b8241/syntaxes/go.tmLanguage.json)
- [gopls semantic token implementation](https://github.com/golang/tools/blob/gopls/v0.23.0/gopls/internal/golang/semtok.go)
- [gopls configuration](https://github.com/golang/tools/blob/master/gopls/doc/settings.md)
