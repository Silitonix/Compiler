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
    if ( typeof str == "object" ) return code.match( str );
    if ( typeof str == "string" ) return code.substring( this.cursor, str.length ) == str;
  }

  get ignore () {
    while ( this.same( Regex.ignore ) ) {
      if ( this.same( Regex.comment ) ) while ( !this.push );
      if ( this.same( Regex.momment ) ) do this.push; while ( !this.same( Regex.momment ) );
      if ( this.push ) return this.buffer = Token.break;
    }
  }

  set token ( type ) {
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
    return this.token = TokenT.keyword;
  }

  get number () {
    if ( !this.same( Regex.numstart ) ) return;
  }

  get string () {
    if ( !this.same( Regex.keystart ) ) return;
    this.save;
    do this.push; while ( !this.same( this.memory.char ) );
    return this.token = TokenT.string;
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
