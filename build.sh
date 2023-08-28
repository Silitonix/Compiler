#!/bin/sh

# STORE AND CHANGE THE IFS VARIABLE
DefaultIFS=$IFS
IFS=','

# READ CODE FROM A FILE AND IF NOT EXIST, SET CODE TO EMPTY
code="const code = \`$([ $# -gt 0 ] && [ -f $1 ] && cat $1 || echo '¡')\`;";

# LIST ALL ARGUMENTS AND CONVERT THEM TO AN ARRAY
args="const args = \`$*\`.split('$IFS');";

# DEFINE FILE AND DIRECTORY PATHS
outputDirectory="build"
sourceDirectory="source"
outputScript="$outputDirectory/compiler.js"

# CREATE BUILD DIRECTORY IF NOT EXIST
mkdir -p $outputDirectory;

# WRITE CODE TO OUTPUT FILE
echo $code > $outputScript
echo $args >> $outputScript

# CONCATENATING THE SCRIPT TO THE OUTPUT FILE
cat "$sourceDirectory/console.js" >> $outputScript
cat "$sourceDirectory/errors.js" >> $outputScript
cat "$sourceDirectory/tokent.js" >> $outputScript
cat "$sourceDirectory/token.js" >> $outputScript
cat "$sourceDirectory/regex.js" >> $outputScript
cat "$sourceDirectory/lexer.js" >> $outputScript
cat "$sourceDirectory/parser.js" >> $outputScript
cat "$sourceDirectory/emitter.js" >> $outputScript

# RUN THE NODE JS WITH OUTPUT
node $outputScript

# RESTORE DEFAULT VALUE OF IFS
IFS=$DefaultIFS