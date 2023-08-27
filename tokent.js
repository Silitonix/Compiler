class TokenT {
  static break = new TokenT( 'break' );
  static keyword = new TokenT( 'keyword' );

  constructor ( name ) {
    this.name = name;
  }
}