class lexer {
  cursor = 0;
  col = 0;
  row = 0;
  buffer;

  get char () { return code[ this.cursor ]; }
  same ( value ) {
    console.log( typeof value );
  }

  push ( count = 1 ) {
    for ( let i = 0; i < count; i++ ) {
      if ( char.match( regex.newline ) ) {
        this.col = 1;
        this.row++;
        this.cursor++;
        return true;
      }
      this.col++;
      this.cursor++;
    }
  }

  constructor () {
  }
}
