class Emitter{
  parser:Parser;

  constructor(code:string){
    this.parser = new Parser(code);
  }
}