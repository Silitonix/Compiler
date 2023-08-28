const code = `¡`;
const args = ``.split(' ');
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
  static title ( source, color = Colors.white ) {
    console.log( `\n\x1b[1;${color+30}m${source}\x1b[0m` );
  }
  static print ( source, color = Colors.black ) {
    console.log( `\x1b[0;${color+30}m${source}\x1b[0m` );
  }
  static error ( title, msg ) {
    console.log( '\n\x1b[1;31m%s\x1b[0m%s\n', title, msg );
    process.exit();
  }
  static help(){
    Console.title("Silitonix compiler");
    Console.print("this help show if dont use any argmment or has help flag");

    Console.title("FLAGS\t: ",Colors.purple);
    Console.print("help\t: -h\t--help");

    process.exit();
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
  static hexstart = "0x"
  static binstart = "0b"
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
    const len = data.length;

    let data = code.substring( start, end );

    if ( type == TokenT.number ) data = Number( data );
    if ( data == NaN ) Console.error( "INVALID NUMBER : ", "Number can't be parsed" );

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
    if ( this.same( Regex.hexstart ) || this.same( Regex.binstart ) ) {
      this.push;
      do this.push; while ( this.same( Regex.hexbody ) );
      this.tokenize = TokenT.number;
    }

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
    this.row = this.token.row;

    return this.token;
  }

  get trace () {

  }

  constructor () {
    this.lexer = new this.lexer;
  }
}

if (
  args.includes( '-h' ) ||
  args.includes( '--help' ) ||
  args[0] === ''
) {
  Console.help();
}
if ( code == `¡` ) Console.error( "INVALID PATH : ", "I can't find your file !" );