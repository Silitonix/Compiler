class Token {
  static break = new Token( T.break );

  constructor ( type, data, col, row, len ) {
    this.type = type;
    this.data = data;
    this.col = col;
    this.row = row;
    this.len = len;
  }
}