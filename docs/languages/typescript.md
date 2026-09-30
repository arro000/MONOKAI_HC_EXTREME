# TypeScript and TSX highlighting analysis

## Verified classification

The installed TypeScript/TSX grammars, JSDoc injections and TypeScript language service classifications were checked (VS Code 1.132.1 / TypeScript 6.0.3).

- Generic declarations and concrete type arguments share `meta.type.parameters`; only semantic `typeParameter` reliably distinguishes them.
- `infer U` has a precise fallback selector: `meta.type.infer entity.name.type`.
- Variable/constructor keywords use `storage.type.ts` or `.tsx` directly.
- Component names use `support.class.component.tsx`, distinct from native `entity.name.tag.tsx`.
- JSX props/attributes share `entity.other.attribute-name.tsx`; object keys use `meta.object-literal.key.tsx`.
- JSDoc tags such as `@param` use `storage.type.class.jsdoc`.
- Readonly constructor properties are emitted as `parameter.declaration.readonly`.

## Integrated rules

Declaration keywords are pink; TSX component names, props/object keys and JSDoc tags cyan. Function parameters, including readonly constructor parameters, use the same neutral color and regular font as local variables. References classified as readonly properties still use the property category. Generic type parameters remain cyan italic semantic tokens; concrete type arguments keep their type style. Conditional/mapped types, discriminated unions, destructuring, regex and template literals use their existing category rules.

Decorator `@` markers are orange. Function names and nested decorator arguments keep their own classifications, including Angular inline templates.

## Recognition details

The installed grammar gives the decorator function and nested function arguments identical scope stacks. The official semantic provider emits their symbol classifications, not `decorator`. Restricting the lexical decorator rule to `@` prevents color propagation into arguments.

The classifier skips JSX tag/attribute names and generic tag arguments, so those depend on TextMate even with semantic highlighting enabled. Props and native JSX attributes cannot be distinguished lexically; both are cyan. `as const satisfies` includes a grammar/classifier ambiguity for `const` that cannot be corrected selectively by theme rules.

Examples: [`preview.ts`](../../examples/typescript/preview.ts) and [`advanced.tsx`](../../examples/typescript/advanced.tsx).

## Sources

- [Installed TypeScript-TmLanguage revision](https://github.com/microsoft/TypeScript-TmLanguage/commit/48f608692aa6d6ad7bd65b478187906c798234a8)
- [VS Code TypeScript semantic provider](https://github.com/microsoft/vscode/blob/main/extensions/typescript-language-features/src/languageFeatures/semanticTokens.ts)
