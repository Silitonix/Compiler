class Emitter {
  parser: Parser;
  tree = [];
  async reader(){
    const context = await this.parser.grow(Grammer)
    this.tree.push(...context);
  }
  constructor(code: string,filename:string) {
    this.parser = new Parser(code,filename);
    this.reader();
  }
}