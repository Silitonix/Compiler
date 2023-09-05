class Parser {
  filename: string;
  lexer: Lexer;
  token: Token;
  data: numstr;
  type: TokenType;
  selector: string;
  row: number;
  col: number;
  root;
  get path(): string {
    return `${this.filename}:${this.row}:${this.col}`;
  }

  get push() {
    this.token = this.lexer.scan();

    this.data = this.token.data;
    this.col = this.token.col;
    this.row = this.token.row;
    this.type = this.token.type;
    this.selector = `$${TokenType[this.type]}`;
    return this.token;
  }

  goup(node) {
    this.push;

    this.root = node[`${this.selector}`];

    if (!this.root) {
      Console.error("SYNTAX ERROR : ", this.path);
    }

    let data = this.root[`_${this.data}`];

    if (data) this.root = data;

  }

  trace(node: object) {

    this.goup(node);

    const inputs = {}

    while (true) {
      if (this.root.name) inputs[`${this.root.name}`] = this.data;
      if (this.root.return) return this.root.return(inputs);
      if (this.root.branch) this.goup(this.root.branch);
    }
  }

  grow(Grammer) {
    const output = [];

    output.push(this.trace(Grammer))

    return output;
  }

  constructor(code: string, filename: string) {
    this.filename = filename;
    this.lexer = new Lexer(code, filename);
  }
}

