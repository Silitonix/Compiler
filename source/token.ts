class Token {
  static break = new Token(TokenType.break, "", 0, 0, 0);
  type: TokenType;
  data: numstr;
  col: number;
  row: number;
  len: number;

  constructor(
    type: TokenType,
    data: numstr,
    col: number,
    row: number,
    len: number
  ) {
    this.type = type;
    this.data = data;
    this.col = col;
    this.row = row;
    this.len = len;
  }
}