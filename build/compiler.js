const code = `bios.write "!"
bios.boot`;
const args = `./examples/program.sx`.split(' ');
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
  static break = new T( 'break' );
  static keyword = new T( 'keyword' );
  static string = new T( 'string' );
  static number = new T( 'number' );
  static character = new T( 'character' );
  static reserve = new T( 'reserve' );
  static register = new T( 'register' );
  static assignment = new T( 'assignment' );
  static arithmetic = new T( 'arithmetic' );
  static comparison = new T( 'comparison' );
  static separator = new T( 'separator' );
  static bitwise = new T( 'bitwise' );
  static bitwise = new T( 'end' );

  constructor ( name ) {
    this.name = name;
  }
}
class Token {
  static break = new Token( T.break );

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
  static hexbody = /0-9a-fA-F/;
  static binbody = /0-1/;
  static numbody = /0-9/;
  static strstart = /[\'\"]/;
  static numsubone = '.';
}

class Lexer {
  cursor = 0;
  col = 1;
  row = 1;
  buffer;
  data;
  memory = { start: 0, row: 0, col: 0, char: '' };

  get char () { return code[ this.cursor ]; }
  get end () {
    const check = !( this.cursor < code.length );
    if ( check ) {
      this.tokenize = T.end;
    }
    return check;
  }
  get save () {
    this.memory.start = this.cursor;
    this.memory.char = this.char;
    this.memory.row = this.row;
    this.memory.col = this.col;
    return this.memory;
  }
  get path () {
    return `${ filename }:${ this.row }:${ this.col }`;
  }

  get push () {
    if ( this.same( Regex.newline ) ) {
      this.col = 1;
      this.row++;
      this.cursor++;
      return true;
    }
    this.col++;
    this.cursor++;
  }

  same ( str, offset = 0 ) {
    if ( this.end ) return false;
    if ( typeof str == "string" ) {
      return code.substring(
        this.cursor + offset,
        this.cursor + offset + str.length
      ) == str;
    }
    if ( typeof str == "object" ) {
      return code[ this.cursor + offset ].match( str );
    }
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
    const end = this.cursor;
    const col = this.memory.col;
    const row = this.memory.row;
    let data = code.substring( start, end );
    const len = data.length;

    if ( type === T.number ) {
      data = Number( data );
      if ( data == NaN ) Console.error( "INVALID NUMBER : ", this.path );
    }

    this.data = data;
    this.buffer = new Token( type, data, col, row, len );
    return true;
  }

  get keyword () {
    const res = [
      'if', 'else', 'loop', 'each', 'square', 'cube',
      'as', 'or', 'and', 'not', 'is', 'call',
      'bios.video', 'bios.keyboard'
    ];

    const reg = [
      'al', 'ah', 'ax', 'eax', 'rax',
      'cl', 'ch', 'cx', 'ecx', 'rcx',
      'dl', 'dh', 'dx', 'edx', 'rdx',
      'bl', 'bh', 'bx', 'ebx', 'rbx',
      'spl', 'sp', 'esp', 'rsp',
      'bpl', 'bp', 'ebp', 'rbp',
      'sil', 'si', 'esi', 'rsi',
      'dil', 'di', 'edi', 'rdi',
      'ss', 'cs', 'ds', 'es', 'fs', 'gs'
    ];

    if ( !this.same( Regex.keystart ) ) return;
    this.save;
    do this.push; while ( this.same( Regex.keybody ) );
    this.tokenize = T.keyword;

    if ( reg.includes( this.data ) ) this.buffer.type = T.register;
    if ( res.includes( this.data ) ) this.buffer.type = T.reserve;

    return true;
  }

  get number () {
    if ( !this.same( Regex.numstart ) ) return;

    if ( this.same( Regex.hexstart ) ) {
      this.push;
      do this.push; while ( this.same( Regex.hexbody ) );
      return this.tokenize = T.number;
    }

    if ( this.same( Regex.binstart ) ) {
      this.push;
      do this.push; while ( this.same( Regex.binbody ) );
      return this.tokenize = T.number;
    }

    if ( this.same( Regex.numsubone ) && !this.same( Regex.numbody, 1 ) ) {
      return;
    }

    this.push; while ( this.same( Regex.numbody ) );
    if ( this.same( Regex.numsubone ) ) {
      this.push; while ( this.same( Regex.numbody ) );
    }

    this.tokenize = T.number;
    return true;
  }

  get string () {

    if ( !this.same( Regex.strstart ) ) return;
    const strcharcter = this.char;
    this.push;
    this.save;
    do this.push; while ( !this.same( strcharcter ) );
    this.tokenize = T.string;
    if ( this.data.length == 1 ) this.buffer.type = T.character;
    this.push;
    return true;
  }

  get operators () {
    const operators = {
      '&': T.bitwise,
      '|': T.bitwise,
      '~': T.bitwise,
      '^': T.bitwise,

      '-': T.arithmetic,
      '+': T.arithmetic,
      '*': T.arithmetic,
      '/': T.arithmetic,
      '%': T.arithmetic,
      '--': T.arithmetic,
      '++': T.arithmetic,
      '//': T.arithmetic,
      '**': T.arithmetic,
      '*%': T.arithmetic,
      '/%': T.arithmetic,
      '-%': T.arithmetic,
      '+%': T.arithmetic,
      '>>': T.arithmetic,
      '<<': T.arithmetic,

      '&=': T.assignment,
      '|=': T.assignment,
      '~=': T.assignment,
      '^=': T.assignment,

      '=': T.assignment,
      '-=': T.assignment,
      '+=': T.assignment,
      '*=': T.assignment,
      '/=': T.assignment,
      '%=': T.assignment,
      '--=': T.assignment,
      '++=': T.assignment,
      '//=': T.assignment,
      '**=': T.assignment,
      '*%=': T.assignment,
      '/%=': T.assignment,
      '-%=': T.assignment,
      '+%=': T.assignment,
      '>>=': T.assignment,
      '<<=': T.assignment,

      '<': T.comparison,
      '>': T.comparison,
      '==': T.comparison,
      '<=': T.comparison,
      '>=': T.comparison,
      '!': T.comparison,
      '!=': T.comparison,

      ',': T.separator,
      '.': T.separator,
      ':': T.separator,
    };

    for ( const operator in operators ) {
      if ( !this.same( operator ) ) continue;
      this.save;
      for ( let i = 0; i < operator.length; i++ ) this.push;
      console.log( operators[ '.' ] );
      this.tokenize = operators[ `${ operator }` ];
      return true;
    }
  }


  scan () {
    if ( this.end ) return this.buffer;
    if ( this.ignore ) return this.buffer;
    if ( this.keyword ) return this.buffer;
    if ( this.number ) return this.buffer;
    if ( this.string ) return this.buffer;
    if ( this.operators ) return this.buffer;

    Console.error( "INVALID CHARACTER : ", this.path );
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

const filename =args[0];
if (
  args.includes( '-h' ) ||
  args.includes( '--help' ) ||
  filename == ''
) {
  Console.help();
}
if ( code == `¡` ) Console.error( "INVALID PATH : ", "I can't find your file !" );

const lexer = new Lexer();

let token = lexer.scan();

while(token.type !== T.end){
  console.log(token);
  token = lexer.scan();
}