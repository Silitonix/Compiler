const Grammer = {
  $keyword: {
    name: "data",
    branch: {
      $separator: {
        ".": {
          goto: ["$keyword"]
        }
      }
    },
    _import: {
      start: {
        index: 0,
        fail: ["$keyword"]
      },
      branch: {
        $string: {
          name: "filename",
          return: async function ({ filename }) {
            // read file and make new parser
            filename += ".sx";
            const file = Bun.file(filename);
            const exist = await file.exists();
            if (exist) {
              const code = await file.text();
              const parser = new Parser(code, filename);
              return parser.grow(Grammer);
            }
            Console.error("IMPORT ERROR : ", "File not found");
          }
        }
      }
    }
  }
};

class Sentence {

}