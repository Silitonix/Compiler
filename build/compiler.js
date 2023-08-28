const code = `¡`; const args = `adsfkjasd askdfjksadf`.split(' ');
class Colors {
  static black = 0;
  static red = 1;
  static green = 2;
  static yellow = 3;
  static blue = 4;
  static purple = 5;
  static cyan = 6;
  static white = 7;
}

class Console {
  static title ( source, color = Colors.black ) {
    console.log( '\x1b[1;%sm%s\x1b[0m', source, 30 + color );
  }
  static error ( title, msg ) {
    console.log( '\\n\x1b[1;31m%s\x1b[0m%s\\n', title, msg );
  }
}
class TokenT {
  static break = new TokenT( 'break' );
  static keyword = new TokenT( 'keyword' );
  static string = new TokenT( 'string' );
  static number = new TokenT( 'number' );

  constructor ( name ) {
    this.name = name;
  }
}
class Token {
  static break = new Token( TokenT.break );

  constructor ( type, data, col, row, len ) {
    this.type = type;
    this.data = data;
    this.col = col;
    this.row = row;
    this.len = len;
  }
}class Regex {
  static ignore = /[\s$#]/;
  static newline = /[\n\r]/;
  static comment = '$';
  static momment = '#';
  static keystart = /[\p{Letter}\p{Emoji}_]/u;
  static keybody = /[\p{Letter}\p{Emoji}_0-9]/u;
  static numstart = /[0-9.]/
}

class Lexer {
  cursor = 0;
  col = 0;
  row = 0;
  buffer;
  memory = { start: 0, row: 0, col: 0, char: '' };

  get char () { return code[ this.cursor ]; }
  get end () { return !( this.cursor < code.length ); }
  get save () {
    state.start = this.cursor;
    state.char = this.char;
    state.row = this.row;
    state.col = this.col;
    return this.memory;
  }


  get push () {
    if ( char.match( Regex.newline ) ) {
      this.col = 1;
      this.row++;
      this.cursor++;
      return true;
    }
    this.col++;
    this.cursor++;
  }

  same ( str ) {
    if ( end ) return false;
    if ( typeof str == "string" ) return code.substring( this.cursor, str.length ) == str;
    if ( typeof str == "object" ) return code.match( str );
  }

  get ignore () {
    while ( this.same( Regex.ignore ) ) {
      if ( this.same( Regex.comment ) ) while ( !this.push );
      if ( this.same( Regex.momment ) ) do this.push; while ( !this.same( Regex.momment ) );
      if ( this.push ) return this.buffer = Token.break;
    }
  }

  set tokenize ( type ) {
    const start = this.memory.start;
    const end = this.memory.start;
    const col = this.memory.col;
    const row = this.memory.row;

    const data = code.substring( start, end );
    const len = data.length;

    this.buffer = new Token( type, data, col, row, len );
    return true;
  }

  get keyword () {
    if ( !this.same( Regex.keystart ) ) return;
    this.save;
    do this.push; while ( this.same( Regex.keybody ) );
    return this.tokenize = TokenT.keyword;
  }

  get number () {
    if ( !this.same( Regex.numstart ) ) return;
    
  }

  get string () {
    if ( !this.same( Regex.keystart ) ) return;
    this.save;
    do this.push; while ( !this.same( this.memory.char ) );
    return this.tokenize = TokenT.string;
  }

  get operators () {

  }


  scan () {
    if ( this.ignore ) return this.buffer;
    if ( this.keyword ) return this.buffer;
    if ( this.number ) return this.buffer;
    if ( this.string ) return this.buffer;
    if ( this.operators ) return this.buffer;
  }

  constructor () {
    console.log( this.memory );
  }
}
class Parser {
  lexer;
  token;
  data;
  type;
  col;
  row;

  get push () {
    this.token = this.lexer.scan();
    this.data = this.token.data;
    this.col = this.token.col;
    this.col = this.token.col;

    return this.token;
  }

  get trace () {

  }

  constructor () {
    this.lexer = new this.lexer;
  }
}

