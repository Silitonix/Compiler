class T {
  static break = new T( 'break' );
  static keyword = new T( 'keyword' );
  static string = new T( 'string' );
  static number = new T( 'number' );
  static character = new T( 'character' );
  static reserve = new T( 'reserve' );
  static register = new T( 'register' );
  static assignment = new T( 'assignment' );
  static arithmetic = new T( 'arithmetic' );
  static comparison = new T( 'comparison' );
  static separator = new T( 'separator' );
  static bitwise = new T( 'bitwise' );
  static bitwise = new T( 'end' );

  constructor ( name ) {
    this.name = name;
  }
}
