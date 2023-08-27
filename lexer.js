class Lexer {
  cursor = 0;
  col = 0;
  row = 0;
  buffer;
  state = { start: 0, row: 0, col: 0, char: '' };

  get char () { return code[ this.cursor ]; }
  get end () { return !( this.cursor < code.length ); }
  get save () {
    state.start = this.cursor;
    state.char = this.char;
    state.row = this.row;
    state.col = this.col;
    return this.state;
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
    return false;
  }

  same ( value ) {
    if ( end ) return false;
    if ( typeof value == "string" ) return this.char == value;
    if ( typeof value == "object" ) return code.match( value );
    return false;
  }

  get ignore () {
    while ( this.same( Regex.ignore ) ) {
      if ( this.same( Regex.comment ) ) while ( !this.push );
      if ( this.same( Regex.momment ) ) do this.push; while ( !this.same( Regex.momment ) );
      if ( this.push ) return this.buffer = Token.break;
    }
    return false;
  }

  set token ( type ) {
    const start = this.state.start;
    const end = this.state.start;
    const col = this.state.col;
    const row = this.state.row;

    const data = code.substring( start, end );
    const len = data.length;

    this.buffer = new Token( type, data, col, row, len );
  }

  get keyword () {
    if ( !this.same( Regex.keystart ) ) return false;
    this.save;
    while ( this.same( Regex.keybody ) ) this.push;
    this.token = TokenT.keyword;
    return true;
  }

  get number () {
    if(!this.same(Regex.numstart)) return;
  }

  scan () {
    if ( this.ignore ) return this.buffer;
    if ( this.keyword ) return this.buffer;
    if ( this.keyword ) return this.buffer;
  }

  constructor () {
    console.log( this.state );
  }
}
