# Change Log

All notable changes to the "monokai-hc-extreme" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [1.4.0]
### Added

- explicit React JSX support alongside TSX for component names, props and object keys
- JSX/TSX expression, tag, fragment and prop-assignment delimiter colors using the existing palettes
- matching quoted prop-object key styling and JSX declaration keyword styling
- React JSX/TSX examples covering hooks, context providers, refs, memoized components, events, spread props and conditional/list rendering
- React highlighting analysis documenting the actual lexical and semantic classifications

## [1.3.0]
### Added

- semantic highlighting for types, parameters, properties, constants, functions and decorators in both themes
- C# semantic token support for records, delegates, fields, extension methods and XML documentation
- TextMate rules for C#/TypeScript declarations, generics, properties, documentation and string interpolation
- Vue directive/shorthand styling and Angular binding, pipe and embedded-template styling
- Go builtin/type/import styling and semantic interface/format placeholder support
- Rust lifetimes, macros, attributes, associated types and semantic ownership/unsafe styling
- Swift protocols, associated types, argument labels, attributes and compiler directives
- Bash variables, positional/special parameters, command substitutions, flags, builtin commands and heredocs
- TypeScript/TSX component, JSDoc and readonly parameter-property styling
- highlighting examples and per-language analysis for all supported languages, with a manual verification guide
- tag-triggered Marketplace publishing, GitHub Releases and VSIX artifacts through GitHub Actions

### Changed

- preserve the classic Monokai syntax palette in the dark theme and use darker equivalents in the light theme
- improve light-theme contrast for comments, strings, functions, attributes, diagnostics and line numbers
- replace broad light-theme attribute coloring with targeted rules and reset embedded expression colors
- correct the light theme's type and preformatted-text foreground in both variants
- preserve code contrast under inactive selections, search matches, word highlights and debug-line backgrounds

## [1.2.7]
### Fixed

- remove inherited high-contrast outlines from child dropdown menus ([#1](https://github.com/arro000/MONOKAI_HC_EXTREME/issues/1))
- add explicit menu and menubar colors for both the dark and light themes

## [1.2.6]
### Changed

- fix "pre" element foreground color

## [1.2.5]
### Changed

- added keywords
  
## [1.2.4]
### Changed

- updated readme
- updated tags

## [1.2.3]
### Changed

- fix color brightness in light mode
- update icon and preview in marketplace

## [1.2.1]
### Changed

- fix deprecated background on light theme , contrast adjustement blue, red and green colors

## [1.2.0]
### Changed

- light color contrast adjustement on blue, green and violet colors

## [1.0.0]

- Initial release
