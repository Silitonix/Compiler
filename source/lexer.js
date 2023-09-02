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

      '{': T.open,
      '(': T.open,
      '[': T.open,
      ']': T.close,
      ')': T.close,
      '}': T.close,
    };

    for ( const operator in operators ) {
      if ( !this.same( operator ) ) continue;
      this.save;
      for ( let i = 0; i < operator.length; i++ ) this.push;
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
