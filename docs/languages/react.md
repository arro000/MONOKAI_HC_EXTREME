# React JSX and TSX highlighting analysis

## What benefits from additional highlighting

React mixes element structure, component references and JavaScript expressions. The useful distinctions are:

| Element | Treatment |
| --- | --- |
| Component tags, including `UI.Badge`, `Fragment` and context providers | Cyan, regular font |
| Native tag names such as `input` and `button` | Pink |
| Props, including `onChange`, `key`, `ref`, ARIA and data attributes | Cyan |
| Quoted/unquoted object keys used to construct spread props | Cyan |
| Tag/fragment delimiters and prop-assignment `=` | Pink |
| JSX expression boundaries `{...}` | Purple |
| Spread operators, conditional operators and control flow | Existing pink operator/keyword rules |
| Hooks, custom hooks, state setter calls and callback functions | Existing green function rules |
| Prop string values, JSX text, comments and expression contents | Their existing string/text/comment/semantic colors |

The dark theme uses its existing Monokai colors; the light theme uses the existing high-contrast counterparts. All changes apply to both `.jsx` and `.tsx`.

## Verified TextMate classifications

The installed JavaScriptReact and TypeScriptReact grammars were inspected and tokenized using their registered roots, `source.js.jsx` and `source.tsx`.

- Components: `support.class.component.js.jsx` / `.tsx`.
- Prop names: `entity.other.attribute-name.js.jsx` / `.tsx`.
- Object keys: `meta.object-literal.key.js.jsx` / `.tsx`; quoted keys additionally have string scopes and require a contextual override.
- Embedded expressions: `meta.embedded.expression.js.jsx` / `.tsx`, with delimiters `punctuation.section.embedded.begin` and `.end` qualified by the language suffix.
- Tags/fragments: `punctuation.definition.tag.begin` and `.end`, qualified by the same suffixes.
- Prop assignments: `punctuation.separator.key-value` under `meta.tag.attributes`, allowing a targeted rule without recoloring the entire attributes container.
- JSX JavaScript declaration keywords use `storage.type.js.jsx`, completing the existing TSX declaration coverage.

Existing `meta.embedded` rules reset expression bodies. Container scopes such as `meta.tag` and `meta.jsx.children` are not broadly recolored, preserving nested JavaScript, strings and comments.

## Semantic classifications and React-specific names

The TypeScript 6.0.3 language service was queried with React 19 type definitions and real JSX/TSX fixtures. It classifies `useState`, `useEffect`, `useRef`, custom hooks and state setter calls as functions. React does not introduce an official `hook`, `state`, `reactProp` or `contextProvider` semantic token type.

JSX component/attribute names use TextMate even with semantic highlighting enabled: the official classifier skips those JSX positions. Expressions inside JSX are classified normally. Thus an event prop name is cyan while its callback value follows the callback's symbol classification.

`onClick`, `key` and `ref` share the ordinary prop scope. React hooks also share function classifications with ordinary functions, including imported aliases. Name-based distinctions would require additional tokenization; the theme preserves the classifications supplied by VS Code.

## Examples and verification

- [`preview.tsx`](../../examples/react/preview.tsx): typed props, hooks/custom hooks, memoized components, context, refs, event handlers, spread props, fragments and list/conditional rendering.
- [`preview.jsx`](../../examples/react/preview.jsx): matching JSX coverage using JavaScript.

Both fixtures were compiled with TypeScript 6.0.3 and React 19 types (strict checking for TSX). Lexical color checks cover both themes, including embedded expressions, quoted prop keys, prop values and JSX comments. Semantic verification confirms function classification for hooks and lexical fallback for JSX tag/prop names.

## Sources

- [TypeScript-TmLanguage revision used by the installed grammars](https://github.com/microsoft/TypeScript-TmLanguage/commit/48f608692aa6d6ad7bd65b478187906c798234a8)
- [VS Code TypeScript semantic provider](https://github.com/microsoft/vscode/blob/main/extensions/typescript-language-features/src/languageFeatures/semanticTokens.ts)
- [React TypeScript guide](https://react.dev/learn/typescript)
