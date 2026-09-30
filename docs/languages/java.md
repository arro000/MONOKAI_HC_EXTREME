# Java highlighting analysis

## Verified classification

The built-in VS Code Java grammar was checked against the example using real TextMate tokenization. The semantic token contributions from Language Support for Java by Red Hat were inspected (1.57.0).

- Type references use `storage.type.java`, `.generic.java`, `.object.array.java` and `.primitive.java`; inferred `var` uses `storage.type.local.java`.
- Records use `entity.name.type.record.java` lexically and the custom semantic token `record`.
- Parameters use `variable.parameter.java`; variable declarations use `variable.other.definition.java`.
- Annotation names and `@` markers have `storage.type.annotation.java` and `punctuation.definition.annotation.java`; annotation argument names use `constant.other.key.java`.
- Javadoc tags use `keyword.other.documentation.javadoc.java` and the semantic selector `keyword.documentation`.
- Red Hat contributes `annotation`, `annotationMember`, `modifier`, `record` and `recordComponent`, plus the `constructor` modifier.

## Integrated rules

Types, arrays, record names and generic type arguments are cyan; semantic generic parameters retain the shared italic style. `var` and modifiers are pink, annotations orange, annotation members/Javadoc tags cyan and methods green. Parameters and record components use the neutral local-variable color. Semantic constructors use cyan; the grammar alone sometimes classifies constructor calls as functions, so lexical-only highlighting can remain green.

Fields and readonly symbols use the shared property/readonly semantic rules when the language service supplies those classifications. Lexical variable declarations cannot reliably distinguish fields, local variables or constants, so declarations stay neutral rather than relying on uppercase naming. Text blocks and lambda/method-reference syntax use their existing string/operator/function categories.

## Example and verification

[`ThemePreview.java`](../../examples/java/ThemePreview.java) covers generics, records, annotations, Javadoc, enums, lambdas, method references, text blocks and switch expressions. It compiles with `javac --release 17` and runs successfully on JDK 21. Semantic selector colors were checked against the extension's declared token types; a live Java language server was not used.

Install **Language Support for Java by Red Hat** (`redhat.java`) and open a configured Java project for semantic highlighting.

## Sources

- [Grammar revision used by the installed VS Code](https://github.com/redhat-developer/vscode-java/commit/f09b712f5d6d6339e765f58c8dfab3f78a378183)
- [Java extension semantic token contributions](https://github.com/redhat-developer/vscode-java/blob/main/package.json)
