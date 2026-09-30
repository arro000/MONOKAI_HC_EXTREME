# Swift highlighting analysis

## Verified classification

The installed `source.swift` grammar was tokenized; SourceKit-LSP's parser, registry and semantic-token tests were inspected.

- Protocol names use `entity.name.type.protocol.swift` and semantic `interface`.
- Generic/associated type declarations use `variable.language.generic-parameter.swift` and `variable.language.associatedtype.swift`.
- External argument labels are `function.parameterLabel`, rather than a dedicated argument-label type.
- Attributes use `storage.modifier.attribute.swift`; SourceKit-LSP can classify them as `modifier`, a resolved wrapper type or `macro`.
- Actors map to semantic `class`.
- String interpolation uses `punctuation.section.embedded.begin.swift`/`.end.swift` and `meta.embedded.line.swift`.

## Integrated rules

Protocols and generic/associated types are cyan italic; builtins cyan. External argument labels are cyan semantic tokens. Attributes, modifiers, macros and compiler directives are orange; interpolation delimiters purple; documentation comments italic. Optional operators and async control flow retain shared keyword/operator colors.

## Recognition details

The lexical scope `support.function.any-method.swift` is shared between call names and argument labels, so only semantic highlighting reliably distinguishes the label. `self`, `Self` and `super` also share a lexical scope.

The installed grammar recognizes multi-hash raw strings but does not tokenize their inner interpolation/escapes as precisely as single-hash strings. SourceKit-LSP may emit resolved wrapper attributes as types and does not guarantee readonly modifiers for every `let` declaration. No invented actor, optional or property-wrapper token types are used.

Example: [`examples/swift/preview.swift`](../../examples/swift/preview.swift).

## Sources

- [Installed grammar revision](https://github.com/jtbandes/swift-tmlanguage/commit/3fca2fa10f7dc962d19ee617b17844d6eecfa2cb)
- [SourceKit-LSP semantic parser](https://github.com/swiftlang/sourcekit-lsp/blob/045c18e9e9ea35b896857b6cb982aa2373fb5816/Sources/SwiftLanguageService/SyntaxHighlightingTokenParser.swift)
- [Semantic token tests](https://github.com/swiftlang/sourcekit-lsp/blob/045c18e9e9ea35b896857b6cb982aa2373fb5816/Tests/SourceKitLSPTests/SemanticTokensTests.swift)
