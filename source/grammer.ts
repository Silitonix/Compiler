const Grammer = {
  $keyword: {
    name: "data",
    branch: {
      $break: {
        return: ({}) =>
        {

        }
      },
      $separator: {
        ".": {
          push: true,
          goto: [ "$keyword" ]
        }
      },
      $keyword: {
        name: "parameter",
        branch: {
          $separator: {
            ",": {
              push: true,
              goto: [ "$keyword", "branch" ],
            }
          }
        }
      }
    },
    _import: {
      start: {
        index: 0,
        goto: [ "$keyword" ]
      },
      branch: {
        $string: {
          name: "filename",
          return: async ({ filename }) =>
          {
            filename[0] += ".sx";
            const file = Bun.file(filename[0]);
            const exist = await file.exists();
            if (exist) {
              const code = await file.text();
              const parser = new Parser(code, filename[0]);
              return parser.grow(Grammer);
            }
            Console.error("IMPORT ERROR : ", "File not found");
          }
        }
      }
    }
  },
  $register: {
    goto: [ "$keyword" ]
  }
};

class Sentence
{

  name: string;
  parameters: numstr[];
  childs: Sentence[];

  constructor (name: string, parameters: numstr[], childs: Sentence[])
  {
    this.name = name;
    this.parameters = parameters;
    this.childs = childs;
  }
}