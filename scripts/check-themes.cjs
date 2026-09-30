const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { parse, parseTree, printParseErrorCode } = require('jsonc-parser');

const root = path.resolve(__dirname, '..');

function readJson(file) {
    const text = fs.readFileSync(file, 'utf8');
    const errors = [];
    const value = parse(text, errors, { allowTrailingComma: true });
    assert.equal(errors.length, 0, `${file}: ${errors.map(error => printParseErrorCode(error.error)).join(', ')}`);

    function checkKeys(node) {
        if (node.type === 'object') {
            const keys = node.children.map(property => property.children[0].value);
            assert.equal(new Set(keys).size, keys.length, `${file}: duplicate JSON keys`);
        }
        for (const child of node.children || []) checkKeys(child);
    }
    checkKeys(parseTree(text));
    return value;
}

function luminance(color) {
    return [1, 3, 5]
        .map(offset => parseInt(color.slice(offset, offset + 2), 16) / 255)
        .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
        .reduce((total, value, index) => total + value * [0.2126, 0.7152, 0.0722][index], 0);
}

function contrast(first, second) {
    const [low, high] = [luminance(first), luminance(second)].sort((a, b) => a - b);
    return (high + 0.05) / (low + 0.05);
}

function composite(color, background) {
    const alpha = color.length === 9 ? parseInt(color.slice(7), 16) / 255 : 1;
    return '#' + [1, 3, 5].map(offset => {
        const foreground = parseInt(color.slice(offset, offset + 2), 16);
        const base = parseInt(background.slice(offset, offset + 2), 16);
        return Math.round(foreground * alpha + base * (1 - alpha)).toString(16).padStart(2, '0');
    }).join('');
}

function checkColor(color, label, alpha = false) {
    assert((alpha ? /^#[\da-f]{6}([\da-f]{2})?$/i : /^#[\da-f]{6}$/i).test(color), `${label}: invalid color ${color}`);
}

const manifest = readJson(path.join(root, 'package.json'));
const lock = readJson(path.join(root, 'package-lock.json'));
assert.equal(lock.version, manifest.version, 'package-lock.json version differs from package.json');
assert.equal(lock.packages[''].version, manifest.version, 'Lockfile root package version differs from package.json');
const tagIndex = process.argv.indexOf('--tag');
if (tagIndex !== -1) {
    const tag = process.argv[tagIndex + 1];
    assert.equal(tag, `v${manifest.version}`, `Release tag must match package.json: expected v${manifest.version}, received ${tag}`);
    assert(/^v\d+\.\d+\.\d+$/.test(tag), `Invalid release tag: ${tag}`);
}

assert.equal(manifest.contributes.themes.length, 2, 'Expected dark and light themes');
const themes = manifest.contributes.themes.map(contribution => {
    const theme = readJson(path.resolve(root, contribution.path));
    const light = contribution.uiTheme === 'hc-light';
    assert.equal(contribution.uiTheme, light ? 'hc-light' : 'hc-black');
    assert.equal(theme.type, light ? 'light' : 'dark');
    assert.equal(theme.semanticHighlighting, true, `${contribution.label}: semantic highlighting disabled`);

    for (const [key, color] of Object.entries(theme.colors)) checkColor(color, key, true);
    for (const rule of theme.tokenColors) {
        const scopes = Array.isArray(rule.scope) ? rule.scope : [rule.scope];
        assert(scopes.length > 0 && scopes.every(scope => typeof scope === 'string' && scope.length > 0), 'Invalid TextMate scope');
        if (rule.settings.foreground) {
            checkColor(rule.settings.foreground, rule.name || rule.scope, true);
            if (light) {
                const color = composite(rule.settings.foreground, theme.colors['editor.background']);
                assert(contrast(color, theme.colors['editor.background']) >= 4.5, `${rule.name || rule.scope}: insufficient light contrast`);
            }
        }
    }

    const semanticColors = [];
    for (const [selector, value] of Object.entries(theme.semanticTokenColors)) {
        assert(/^(\*|[\w]+)(\.[\w]+)*(:[\w]+)?$/.test(selector), `Invalid semantic selector: ${selector}`);
        const style = typeof value === 'string' ? { foreground: value } : value;
        for (const key of Object.keys(style)) {
            assert(['foreground', 'fontStyle', 'bold', 'italic', 'underline', 'strikethrough'].includes(key), `${selector}: unsupported style ${key}`);
        }
        if (style.fontStyle !== undefined) assert(/^(\s*(italic|bold|underline|strikethrough))*\s*$/.test(style.fontStyle), `${selector}: invalid font style`);
        for (const key of ['bold', 'italic', 'underline', 'strikethrough']) {
            if (style[key] !== undefined) assert.equal(typeof style[key], 'boolean', `${selector}: ${key} must be boolean`);
        }
        if (style.foreground) {
            checkColor(style.foreground, selector);
            semanticColors.push(style.foreground);
            if (light) assert(contrast(style.foreground, theme.colors['editor.background']) >= 7, `${selector}: semantic light contrast below 7:1`);
        }
    }

    for (const key of [
        'editor.lineHighlightBackground', 'editor.inactiveSelectionBackground',
        'editor.wordHighlightBackground', 'editor.wordHighlightStrongBackground',
        'editor.findMatchBackground', 'editor.findMatchHighlightBackground',
        'editor.stackFrameHighlightBackground', 'editor.focusedStackFrameHighlightBackground',
    ]) {
        const background = composite(theme.colors[key], theme.colors['editor.background']);
        const minimum = Math.min(...semanticColors.map(color => contrast(color, background)));
        assert(minimum >= 4.5, `${contribution.label}: ${key} reduces code contrast to ${minimum.toFixed(2)}:1`);
    }

    if (!light) {
        for (const [selector, color] of Object.entries({ keyword: '#F9377D', type: '#66D9EF', function: '#A6E22E', parameter: '#F0F3F6', number: '#AE81FF', string: '#E6DB74' })) {
            const style = theme.semanticTokenColors[selector];
            assert.equal(typeof style === 'string' ? style : style.foreground, color, `${selector}: Monokai syntax palette changed`);
        }
    }
    console.log(`${contribution.label}: JSON, scopes, semantic styles and contrast OK`);
    return theme;
});

assert.deepEqual(Object.keys(themes[0].semanticTokenColors).sort(), Object.keys(themes[1].semanticTokenColors).sort(), 'Semantic coverage differs between variants');
console.log(`Extension ${manifest.version}${tagIndex !== -1 ? ` / ${process.argv[tagIndex + 1]}` : ''}: checks passed`);
