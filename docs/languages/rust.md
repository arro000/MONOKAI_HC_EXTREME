# Rust highlighting analysis

## Verified classification

The built-in `source.rust` grammar and rust-analyzer's token registry/provider were inspected.

- Lifetimes use `entity.name.type.lifetime.rust`; the same lexical scope is also used for labels. rust-analyzer distinguishes `lifetime` from `label`.
- Macros use both function-like and type-like TextMate names. rust-analyzer supplies `macro` and the subtype `procMacro`.
- Attribute macros are `decorator`; builtin attributes/derive names inherit from the custom `attribute` type.
- Constants can use the custom `const` type, which inherits from `variable` rather than a readonly classification.
- Associated types use `typeAlias.associated`. Ownership-related classifications use `reference`, `mutable` and `consuming` modifiers; unsafe contexts use `unsafe`.

## Integrated rules

Lifetimes are purple italic; semantic labels are orange. Macros and attribute identifiers are orange; traits and associated types are cyan italic. Constants and Option/Result variants are purple. Byte/raw markers and format specifiers are purple, while documentation comments are italic.

Ownership modifiers change typography while retaining the category color: references italic, mutable bindings/receivers underlined, consuming references/calls bold, unsafe operations bold and underlined. Intra-doc links are underlined.

## Recognition details

The `consuming` modifier reports classifications supplied by rust-analyzer, not every possible move. `.macro` and `.attribute` are modifiers for tokens inside those constructs; using them to recolor all contents would flatten strings, arguments and operators.

The lexical grammar uses the same scopes for lifetimes and labels and recognizes brace interpolation in ordinary strings without knowing whether they are format strings. rust-analyzer supplies more precise format information, including raw format strings. Semantic string tokens can override lexical raw/byte markers.

Custom tokens use `rust-analyzer.semanticHighlighting.nonStandardTokens`, enabled by default.

Example: [`examples/rust/preview.rs`](../../examples/rust/preview.rs).

## Sources

- [Installed grammar revision](https://github.com/dustypomerleau/rust-syntax/blob/268fd42cfd4aa96a6ed9024a2850d17d6cd2dc7b/syntaxes/rust.tmLanguage.json)
- [rust-analyzer token registry](https://github.com/rust-lang/rust-analyzer/blob/03fcb77246f2568adb0e9b2fa60d19c6cc1686f4/crates/rust-analyzer/src/lsp/semantic_tokens.rs)
- [Provider classifications](https://github.com/rust-lang/rust-analyzer/blob/03fcb77246f2568adb0e9b2fa60d19c6cc1686f4/crates/rust-analyzer/src/lsp/to_proto.rs)
