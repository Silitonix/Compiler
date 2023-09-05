class Parser {
  lexer: Lexer;
  token: Token;
  data: numstr;
  type: TokenType;
  col: number;
  row: number;

  get push() {
    this.token = this.lexer.scan();
    this.data = this.token.data;
    this.col = this.token.col;
    this.row = this.token.row;

    return this.token;
  }

  trace(node: object) {
    this.push;

    return [];
  }

  constructor(code: string) {
    this.lexer = new Lexer(code);
  }
}

