class Emitter {
  parser: Parser;
  tree = [];

  constructor(code: string) {
    this.parser = new Parser(code);
    this.tree.push(...this.parser.trace(Grammer));
  }
}