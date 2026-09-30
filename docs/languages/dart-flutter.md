# Dart and Flutter highlighting analysis

## Verified classification

The built-in VS Code Dart grammar was checked using real TextMate tokenization. Actual semantic tokens were obtained from the Dart 3.12.2 language server for the standalone Dart example.

- Types and Flutter widget classes use `support.class.dart`; `void` uses `storage.type.primitive.dart` lexically.
- Metadata such as `@override` uses `storage.type.annotation.dart`. The language server emits `annotation` for `@`, and a symbol token with the `annotation` modifier for the annotation name.
- `$name` and `${expression}` use `meta.embedded.expression.dart`; simple embedded identifiers use `variable.parameter.dart`, regardless of whether the symbol is really a parameter.
- Semantically, interpolation punctuation uses `source.interpolation` and `void` uses `keyword.void`.
- Instance fields use `variable.instance` at declaration and `property.instance` at reference; static fields similarly use `variable.static`/`property.static`.
- Named argument labels are `parameter.label`. They retain the neutral parameter/local-variable color.
- Generic declarations use `typeParameter`, constructors are generally `class.constructor`, and constructor tear-offs use `method.constructor`.

## Integrated rules

Types, widget classes, fields and import prefixes are cyan, methods/functions green, annotations orange and interpolation/escapes purple. Local variables and parameters are neutral. Generic type parameters retain the shared cyan italic semantic style. Raw strings remain string-colored without treating their `$` or backslashes as interpolation/escapes. Dartdoc references and inline code receive cyan lexical fallbacks.

Flutter uses the `dart` language ID and Dart's analyzer classifications. Widget constructors are ordinary classes/constructors, callbacks are functions or methods, and widget arguments are parameters; the theme does not invent widget-specific semantic tokens. The analyzer does not consistently emit `readonly` for Dart `final`/`const`, so those symbols retain their supplied variable/property categories.

## Examples and verification

- [`Dart preview`](../../examples/dart/preview.dart): generics, mixins, extensions, enums, records, async code, raw/multiline strings and Dartdoc. `dart analyze` passes; actual semantic tokens and their resulting colors were checked in both variants.
- [`Flutter preview`](../../examples/flutter/preview.dart): stateful/stateless widgets, constructors, callbacks, collection `if`/spread and list builders. Its Dart syntax/formatting and TextMate colors were checked; full Flutter analysis requires the Flutter SDK and a configured Flutter project. Copy it into a Flutter project's `lib/main.dart` to inspect its semantic classifications.

Install **Dart** (`Dart-Code.dart-code`) and **Flutter** (`Dart-Code.flutter`) with the appropriate SDKs.

## Sources

- [Installed Dart grammar revision](https://github.com/dart-lang/dart-syntax-highlight/commit/b2e04fbe2334bfe56940106b652f4c5799affbb1)
- [Dart analyzer semantic mappings](https://github.com/dart-lang/sdk/blob/main/pkg/analysis_server/lib/src/lsp/semantic_tokens/mapping.dart)
- [Dart analyzer custom token types and modifiers](https://github.com/dart-lang/sdk/blob/main/pkg/analysis_server/lib/src/lsp/constants.dart)
- [Dart-Code semantic scope fallbacks](https://github.com/Dart-Code/Dart-Code/blob/master/package.json)
