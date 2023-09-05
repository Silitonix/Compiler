enum Colors {
  black,
  red,
  green,
  yellow,
  blue,
  purple,
  cyan,
  white,
}

class Console {
  static title(source: string, color = Colors.white) {
    console.log(`\n\x1b[1;${color + 30}m${source}\x1b[0m`);
  }
  static print(source: string, color = Colors.black) {
    console.log(`\x1b[0;${color + 30}m${source}\x1b[0m`);
  }

  static error(title: string, msg: string): never {
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