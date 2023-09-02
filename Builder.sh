#!/bin/sh

outdir="build"
outfile="$outdir/compiler"
srcdir="source"



mkdir -p $outdir

# CONCATENATING THE SCRIPT TO THE OUTPUT FILE
cat "$srcdir/grammer.ts" > "$outfile.ts"
cat "$srcdir/console.ts" >> "$outfile.ts"
cat "$srcdir/errors.ts" >> "$outfile.ts"
cat "$srcdir/type.ts" >> "$outfile.ts"
cat "$srcdir/token.ts" >> "$outfile.ts"
cat "$srcdir/regex.ts" >> "$outfile.ts"
cat "$srcdir/lexer.ts" >> "$outfile.ts"
cat "$srcdir/parser.ts" >> "$outfile.ts"
cat "$srcdir/emitter.ts" >> "$outfile.ts"
cat "$srcdir/compiler.ts" >> "$outfile.ts"

echo "\nBuilding program\n"
# CREATE EXECUTABLE
bun build "./$outfile.ts" --compile --minify --outfile $outfile

# REMOVE SCRTIPT FILE
rm "./$outfile.ts"

echo "\nRunning program\n"
exec "./$outfile"