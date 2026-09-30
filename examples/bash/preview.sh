#!/usr/bin/env bash
set -euo pipefail

name='Ada'
items=(one two three)
set -- "${1:-Ada}" "$@"

function greet() {
    local recipient="${1:-world}"
    printf 'Hello %s\n' "$recipient"
}
greet "$name"

printf '%s\n' "$@" "$1" "$?" "$$" "$#" "$*" "${items[@]}"

literal='$name $(printf ignored)'
message="Hello $name: $(printf '%s' ready)"
escaped=$'tab\tnewline\n'
legacy=`printf '%s' ready`

total=$((2 + 3 * 4))
(( total += 1 ))

if [[ -n "$name" && "$total" -ge 10 ]]; then
    grep -n --color=auto '^Ada' /dev/null |
        sort -u > /dev/null 2>&1 || true
fi

diff <(printf '%s\n' one) <(printf '%s\n' two) || true
read -r first <<< "$message"

cat <<EXPANDED
Hello $name; $(printf '%s' ready)
EXPANDED

cat <<'LITERAL'
Hello $name; $(printf '%s' ignored)
LITERAL

cat <<"ALSO_LITERAL"
$name $(printf ignored)
ALSO_LITERAL
