#!/bin/sh
IFS=','

echo \
" const args = '$*'.split('$IFS');\
\n const code = \`$( [ $# -gt 0 ] && [ -f $1 ] && cat $1)\`
\n $(cat errors.js | sed "s/ _/ errors/g") \
\n $(cat console.js | sed "s/ _/ console/g") \
\n $(cat tokent.js | sed "s/ _/ tokent_/g") \
\n $(cat token.js | sed "s/ _/ token_/g") \
\n $(cat lexer.js | sed "s/ _/ lexer_/g") \
\n $(cat parser.js | sed "s/ _/ parser_/g") \
\n $(cat emitter.js | sed "s/ _/ emitter_/g") \
\n $(cat compiler.js | sed "s/ _/ compiler_/g") \
" | node

IFS=' '