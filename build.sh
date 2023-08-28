#!/bin/sh
IFS=','
code="const code = \`$([ $# -gt 0 ] && [ -f $1 ] && cat $1 || echo '¡')\`;";
args="const args = \`$*\`.split('$IFS');";

echo $code $args > build/compiler.js
cat console.js >> build/compiler.js
cat errors.js >> build/compiler.js
cat tokent.js >> build/compiler.js
cat token.js >> build/compiler.js
cat regex.js >> build/compiler.js
cat lexer.js >> build/compiler.js
cat parser.js >> build/compiler.js
cat emitter.js >> build/compiler.js