#!/bin/sh
IFS=','

code="const code = \`$([ $# -gt 0 ] && [ -f $1 ] && cat $1 || echo '¡')\`;";
args="const args = \`$*\`.split('$IFS');";

outputDirectory="build"
output="build/compiler.js"

mkdir -p $outputDirectory;

echo $code > $output
echo $args >> $output
cat console.js >> $output
cat errors.js >> $output
cat tokent.js >> $output
cat token.js >> $output
cat regex.js >> $output
cat lexer.js >> $output
cat parser.js >> $output
cat emitter.js >> $output

node $output