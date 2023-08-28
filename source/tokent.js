class TokenT {
  static break = new TokenT( 'break' );
  static keyword = new TokenT( 'keyword' );
  static string = new TokenT( 'string' );
  static number = new TokenT( 'number' );

  constructor ( name ) {
    this.name = name;
  }
}
