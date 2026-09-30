# Syntax highlighting previews

These files are small highlighting fixtures. Copy them into a configured project for full semantic highlighting. The C# example uses C# 12; Go uses generics and `max` (Go 1.21+); Swift uses actors and concurrency; the Vue examples use Vue 3.3+ and SCSS; the Angular examples use modern standalone components, signals and `@let` (Angular 18.1+). Dart uses records (Dart 3+), Flutter uses super parameters, and Java uses records and text blocks (Java 17+).

## Language highlighting

Both variants enable semantic highlighting and additional syntax rules. Types, parameters, properties, constants and methods have consistent semantic colors; template bindings and embedded expressions keep their own syntax highlighting.

| Language | Examples | Additional highlighting |
| --- | --- | --- |
| C# | [C#](csharp/ThemePreview.cs) | Records, delegates, fields, extension methods, XML documentation and interpolated strings |
| TypeScript/TSX | [TypeScript](typescript/preview.ts), [TSX](typescript/advanced.tsx) | Conditional/mapped types, JSX components and props, JSDoc and readonly parameter properties |
| React | [JSX](react/preview.jsx), [TSX](react/preview.tsx) | Component/native tag distinction, props, fragments, expression boundaries, quoted prop-object keys and JSX/TSX parity |
| Vue | [Vue](vue/App.vue) | Directives, shorthand bindings, slots, interpolations and embedded TypeScript/SCSS |
| Angular | [Component](angular/preview.component.ts), [template](angular/preview.component.html) | Property/event/two-way bindings, pipes, control flow and inline templates |
| Go | [Go](go/preview.go) | Builtin functions and types, import aliases, interfaces and format placeholders |
| Rust | [Rust](rust/preview.rs) | Lifetimes, macros, attributes, associated types and ownership/unsafe modifiers |
| Swift | [Swift](swift/preview.swift) | Protocols, associated types, argument labels, attributes and compiler directives |
| Bash | [Bash](bash/preview.sh) | Variable expansion, positional/special parameters, substitutions, command flags and heredocs |
| Ruby | [Ruby](ruby/preview.rb) | Class references, instance/class variables, keyword/block parameters, interpolation, builtin methods and YARD |
| Dart/Flutter | [Dart](dart/preview.dart), [Flutter](flutter/preview.dart) | Types/widgets, annotations, fields, constructor tear-offs, interpolation, escapes and Dartdoc |
| Java | [Java](java/ThemePreview.java) | Records, generic types, arrays, annotations, Javadoc, constructors and inferred variables |

## Color palettes and contrast

The dark variant keeps the Monokai color families with a subtly lighter keyword/operator accent. The light variant uses darker counterparts for high contrast on white, including more readable comments and strings.

| Syntax role | Dark | Light |
| --- | --- | --- |
| Keywords and operators | Pink `#F9377D` | Deep pink `#AC154C` |
| Types and properties | Cyan `#66D9EF` | Deep cyan `#005466` |
| Functions and methods | Green `#A6E22E` | Deep green `#2F6100` |
| Local variables and function parameters | Neutral `#F0F3F6` | Neutral `#24292F` |
| Decorators and macro markers | Orange `#FD971F` | Burnt orange `#8A451F` |
| Constants, numbers and escapes | Purple `#AE81FF` | Deep purple `#552AA3` |
| Strings | Yellow `#E6DB74` | Ochre `#794E00` |
| Comments | Orange `#FD971F` | Gray-green `#555B50` |

Every color in the light variant's semantic syntax palette has at least **7:1 contrast against the white editor background**. Selection, search and other editor overlays use their own backgrounds.

Markdown previews use dedicated neutral backgrounds for inline code and fenced code blocks in both variants. Plain code text has at least **7:1 contrast**, and the semantic syntax palette retains at least **4.5:1 contrast** on code-block backgrounds.

## Preview in VS Code

1. Open this extension's repository in VS Code and press **F5** to start the Extension Development Host.
2. In the new window, choose **Monokai HC extreme dark** or **Monokai HC extreme light**.
3. Open the examples with the appropriate language extensions installed:
   - C#: **C#** (`ms-dotnettools.csharp`), optionally with C# Dev Kit.
   - TypeScript: VS Code's built-in TypeScript support.
   - React JSX/TSX: VS Code's built-in JavaScript/TypeScript support, with React and its types in the project.
   - Vue: **Vue - Official** (`Vue.volar`).
   - Angular: **Angular Language Service** (`Angular.ng-template`).
   - Go: **Go** (`golang.go`) with gopls semantic tokens enabled.
   - Rust: **rust-analyzer** (`rust-lang.rust-analyzer`).
   - Swift: **Swift** (`swiftlang.swift-vscode`) with a Swift toolchain.
   - Bash: VS Code's built-in shellscript grammar.
   - Ruby: **Ruby LSP** (`Shopify.ruby-lsp`) with a configured Ruby environment.
   - Dart: **Dart** (`Dart-Code.dart-code`) with the Dart SDK.
   - Flutter: **Flutter** (`Dart-Code.flutter`) with the Flutter SDK; copy the fixture into a Flutter project's `lib/main.dart`.
   - Java: **Language Support for Java by Red Hat** (`redhat.java`) with a JDK and configured Java project.
4. Compare `editor.semanticHighlighting.enabled` set to `true` and `false`. The default, `"configuredByTheme"`, enables semantic highlighting for both themes.
5. Use **Developer: Inspect Editor Tokens and Scopes** to inspect both the TextMate scopes and semantic token classifications.

Check declaration/reference consistency, generic types, parameters, properties, constants, documentation, string interpolation, Vue directives/slots and Angular bindings/pipes/control flow. Also check the Angular inline template, Vue styles, selections, search matches and word highlights.

## Language-specific checks

- **Go:** `len`/`make`/`close`/`max` are cyan; ordinary calls are green. gopls distinguishes interfaces, generic parameters, receivers, field references and format directives.
- **Rust:** lifetimes are purple and macros orange. With rust-analyzer, references are italic, mutable bindings/receivers underlined, consuming bindings/calls bold, and unsafe operations bold + underlined. These styles preserve each token's category color.
- **Swift:** protocols and generic/associated types are cyan italic; attributes/directives are orange; interpolation delimiters purple. SourceKit-LSP distinguishes external argument labels from function names.
- **Bash:** variable names and positional parameters are cyan, flags orange, special parameters and expansion delimiters purple. Compare expanded and quoted heredocs, as well as literal and interpolating quotes.
- **TypeScript/TSX:** compare generic parameters with concrete type arguments, `infer`, mapped types, readonly constructor parameters, native JSX tags vs components, JSDoc and nested decorator arguments.
- **Function parameters:** ordinary parameters, destructured parameter bindings and readonly constructor parameters use the local-variable foreground and regular font with semantic highlighting enabled or disabled. Rust ownership modifiers can still refine typography independently of the color.
- **React:** compare [`react/preview.jsx`](react/preview.jsx) and [`react/preview.tsx`](react/preview.tsx). Component tags (including `UI.Badge` and `UserContext.Provider`) and props are cyan; native tags/fragments are pink; expression boundaries are purple. Inspect hooks, state setters, callbacks, refs and event handlers with semantic highlighting enabled. Values, JSX text and comments retain their category colors, including inside spread props, conditional rendering and nested tags.
- **Ruby:** keyword/block parameters are neutral like locals; instance/class variables and builtin methods cyan, symbols/constants purple, method calls green. Interpolation expressions recover their own colors inside strings and heredocs. Compare YARD tags/types with documented parameter names.
- **Dart/Flutter:** widget/type names are cyan, methods green, complete annotations orange and interpolation/escapes purple. Parameters, including named argument labels, are neutral. With semantic highlighting, compare field declarations/references and generic type parameters; raw strings retain literal `$` and backslashes.
- **Java:** types and records are cyan, annotations orange, annotation members/Javadoc tags cyan and `var` pink. Parameters/record components are neutral. Compare generics, arrays, lambda/method references and text blocks with semantic highlighting on and off.

For Go semantic highlighting, a project can enable `"gopls": { "semanticTokens": true }` in VS Code settings. Recent gopls versions distinguish fields as `property` and receivers as `parameter`; older versions may classify them as ordinary variables. Rust's custom token distinctions use `rust-analyzer.semanticHighlighting.nonStandardTokens`, enabled by default.

Semantic tokens depend on the installed language service and project configuration. A color theme styles the tokens supplied by those extensions; it does not parse or compile the languages itself.

For detailed classification notes, see the analyses for [Go](../docs/languages/go.md), [Rust](../docs/languages/rust.md), [Swift](../docs/languages/swift.md), [Bash](../docs/languages/bash.md), [TypeScript](../docs/languages/typescript.md), [React](../docs/languages/react.md), [Ruby](../docs/languages/ruby.md), [Dart/Flutter](../docs/languages/dart-flutter.md) and [Java](../docs/languages/java.md).
