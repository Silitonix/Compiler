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
  static title(source, color = Colors.white) {
    console.log(`\n\x1b[1;${color + 30}m${source}\x1b[0m`);
  }
  static print(source, color = Colors.black) {
    console.log(`\x1b[0;${color + 30}m${source}\x1b[0m`);
  }

  static error(title, msg): never {
    console.log('\n\x1b[1;31m%s\x1b[0m%s\n', title, msg);
    process.exit(1);
  }

  static help(): never {
    Console.title("Silitonix compiler");
    Console.print("this help show if dont use any argmment or has help flag");

    Console.title("FLAGS\t: ", Colors.purple);
    Console.print("help\t: -h\t--help");

    process.exit();
  }
}