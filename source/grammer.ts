const Grammer = {
  $keyword: {}
};

Grammer.$keyword = {
  "import": {
    branch: {
      $string: {
        store: true,
        name: "path",
        return: async function ({ path: filename }) {
          const file = Bun.file(filename);
          const exist = await file.exists();
          if (exist) {
            const code = await file.text();
            const parser = new Parser(code, filename);
            return parser.trace(Grammer);
          }
          Console.error("IMPORT ERROR : ", "File not found");
        }
      }
    }
  }
};