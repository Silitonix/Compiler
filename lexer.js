class lexer {
  cursor = 0;
  col = 0;
  row = 0;
  buffer;

  get char () { return code[ this.cursor ]; }
  get end () { return !( this.cursor < code.length ); }


  get push () {
    if ( char.match( regex.newline ) ) {
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
    while ( this.same( regex.ignore ) ) {
      if ( this.same( regex.comment ) ) while ( !this.push );
      if ( this.same( regex.momment ) ) do this.push; while ( this.same( regex.momment ) );
      if ( this.push ) return true;
    }
    return false;
  }

  read () {
    if ( this.ignore ) return this.buffer;
  }

  constructor () {
  }
}
