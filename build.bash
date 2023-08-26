#!/bin/sh

echo \
 " const args = '$@'.split()\
 $(cat errors.js | sed "s/ _/ errors/g") \
 $(cat lexer.js | sed "s/ _/ lexer_/g") \
 $(cat parser.js | sed "s/ _/ parser_/g") \
 $(cat emitter.js | sed "s/ _/ emitter_/g") \
 $(cat compiler.js | sed "s/ _/ compiler_/g") \
 " \
| node