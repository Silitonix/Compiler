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
    this.root = node[`${this.selector}`];

    if (!this.root) {
      console.log(this.token);
      Console.error("SYNTAX ERROR : ", this.path);
    }

    let data = this.root[`_${this.data}`];

    if (data) this.root = data;

  }

  async trace(node: object) {
    do this.push; while (this.type == TokenType.break)
    this.goup(node)
    const inputs = {}

    while (true) {
      if (this.root.name) inputs[`${this.root.name}`] = this.data;
      if (this.root.return) {
        const product = await this.root.return(inputs);
        return product;
      }
      if (this.root.branch) {
        this.push;
        this.goup(this.root.branch);
        continue;
      }
      Console.error("SYNTAX ERROR : ", this.path);
    }

  }

  async grow(Grammer) {
    const output = [];

    while (this.type != TokenType.end) {
      const product = await this.trace(Grammer);
      output.push(product)
    }

    return output;
  }

  constructor(code: string, filename: string) {
    this.filename = filename;
    this.lexer = new Lexer(code, filename);
  }
}

