# Syntax highlighting previews

These files are small highlighting fixtures. Copy them into a configured project for full semantic highlighting. The C# example uses C# 12; Go uses generics and `max` (Go 1.21+); Swift uses actors and concurrency; the Vue examples use Vue 3.3+ and SCSS; the Angular examples use modern standalone components, signals and `@let` (Angular 18.1+).

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

For Go semantic highlighting, a project can enable `"gopls": { "semanticTokens": true }` in VS Code settings. Recent gopls versions distinguish fields as `property` and receivers as `parameter`; older versions may classify them as ordinary variables. Rust's custom token distinctions use `rust-analyzer.semanticHighlighting.nonStandardTokens`, enabled by default.

Semantic tokens depend on the installed language service and project configuration. A color theme styles the tokens supplied by those extensions; it does not parse or compile the languages itself.
