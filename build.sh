#!/bin/sh

# Store and change the IFS variable
DefaultIFS=$IFS
IFS=','

# Read code from a file and if not exist, set code to empty
code="const code = \`$([ $# -gt 0 ] && [ -f $1 ] && cat $1 || echo '¡')\`;";

# List all arguments and convert them to an array
args="const args = \`$*\`.split('$IFS');";

# Define file and directory paths
outputDirectory="build"
sourceDirectory="src"
outputScript="$outputDirectory/compiler.js"

# Create build directory if not exist
mkdir -p $outputDirectory;

# Write code to output file
echo $code > $outputScript
echo $args >> $outputScript

# Concatenating the script to the output file
cat "$sourceDirectory/console.js" >> $outputScript
cat "$sourceDirectory/errors.js" >> $outputScript
cat "$sourceDirectory/tokent.js" >> $outputScript
cat "$sourceDirectory/token.js" >> $outputScript
cat "$sourceDirectory/regex.js" >> $outputScript
cat "$sourceDirectory/lexer.js" >> $outputScript
cat "$sourceDirectory/parser.js" >> $outputScript
cat "$sourceDirectory/emitter.js" >> $outputScript

# Run the node js with output
node $outputScript

# Restore default value of IFS
IFS=$DefaultIFS