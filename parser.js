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
    this.col = this.token.col;

    return this.token;
  }

  get trace () {

  }

  constructor () {
    this.lexer = new this.lexer;
  }
}
