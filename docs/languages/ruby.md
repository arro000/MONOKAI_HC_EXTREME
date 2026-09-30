# Ruby highlighting analysis

## Verified classification

The built-in VS Code Ruby grammar was checked against the example using real TextMate tokenization. Ruby LSP's semantic listener was inspected to confirm its classifications.

- Class/module declarations use `entity.name.type.class.ruby` and `entity.name.type.module.ruby`; capitalized references commonly use `support.class.ruby`.
- Instance/class variables use `variable.other.readwrite.instance.ruby` and `.class.ruby`.
- Positional parameters use `variable.parameter.function.ruby`; keyword parameter declarations instead use `constant.other.symbol.hashkey.parameter.function.ruby`.
- Block bindings use `variable.other.block.ruby`.
- Interpolation bodies nest `source.ruby` inside `meta.embedded.line.ruby`; their delimiters use `punctuation.section.embedded.begin.ruby` and `.end.ruby`.
- YARD tags, types and parameter names have separate `comment.line.*.yard.ruby` scopes.

## Integrated rules

Types, field-like variables and recognized Ruby builtin/DSL methods are cyan. Methods are green, symbols/constants purple and strings yellow. Positional, keyword and block parameters use the neutral local-variable color and regular font. Splat/block argument operators are pink. Interpolation delimiters are purple; embedded expressions recover their own token colors instead of inheriting the surrounding string color. YARD tags/types are cyan and documented parameter names neutral.

Ruby LSP emits standard `class`, `namespace`, `method`, `variable` and `parameter` classifications that the shared semantic rules already cover. It resolves ambiguous bare method calls versus local-variable references; a TextMate grammar alone cannot reliably distinguish them. Constant references can also be lexically ambiguous with type references, so no name-based Rails or other framework classification is added.

## Example and verification

[`preview.rb`](../../examples/ruby/preview.rb) covers keyword/block parameters, builtin methods, symbols, regular expressions, interpolation, YARD and heredocs. Its syntax was checked with Prism 1.9.0. Install **Ruby LSP** (`Shopify.ruby-lsp`) for semantic highlighting in a configured Ruby project.

## Sources

- [Grammar revision used by the installed VS Code](https://github.com/Shopify/ruby-lsp/commit/ba41f8b4f9677fb14c1ecbe15d73ebe12a0d3859)
- [Ruby LSP semantic listener](https://github.com/Shopify/ruby-lsp/blob/main/lib/ruby_lsp/listeners/semantic_highlighting.rb)
