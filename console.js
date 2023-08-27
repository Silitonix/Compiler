class Colors {
  static black = 0;
  static red = 1;
  static green = 2;
  static yellow = 3;
  static blue = 4;
  static purple = 5;
  static cyan = 6;
  static white = 7;
}

class Console {
  static title ( source, color = Colors.black ) {
    console.log( '\x1b[1;%sm%s\x1b[0m', source, 30 + color );
  }
}