class Parser {
  filename:string;
  lexer: Lexer;
  token: Token;
  data: numstr;
  type: string;
  col: number;
  row: number;

  get push() {
    this.token = this.lexer.scan();
    this.data = this.token.data;
    this.col = this.token.col;
    this.row = this.token.row;
    this.type = TokenType[this.token.type];
    return this.token;
  }

  trace(node: object) {
    this.push;
    console.log(this.type);
    if (node[`${this.type}`]) {
      const word = node[`${this.type}`];
    }
    return [];
  }

  constructor(code: string,filename:string) {
    this.filename = filename;
    this.lexer = new Lexer(code,filename);
  }
}

