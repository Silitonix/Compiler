import { Regex } from "./regex";

export class Lexer
{
  code: string;
  cursor = 0;
  col = 1;
  row = 1;

  get next(): boolean
  {
    this.cursor++;
    if (this.is(Regex.newline)) {
      this.row++;
      this.col = 1;
      return true;
    }
    this.col++;
    return false;
  }

  get char(): string { return this.code[ this.cursor ]; }
  get end(): boolean { return this.char == undefined; }

  is(pattern: RegStr)
  {
    if (typeof pattern == "string") {
      const substring = this.code.substring(this.cursor, this.cursor + pattern.length);
      return substring == pattern;
    }

    this.char.match(pattern);
  }

  constructor (code: string)
  {
  }
}