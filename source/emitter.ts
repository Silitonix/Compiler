class Emitter {
  parser: Parser;
  tree = [];

  constructor(code: string,filename:string) {
    this.parser = new Parser(code,filename);
    this.tree.push(...this.parser.grow(Grammer));
  }
}