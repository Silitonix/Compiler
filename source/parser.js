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
    this.push;

  }

  constructor () {
    this.lexer = new this.lexer;
  }
}

