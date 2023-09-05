const Grammer = {
  keyword: {},
  defineParameter: {},
  expression: {},
  reserve: {},
  arguments: {}
};

Grammer.keyword = {
  type: "name",
  "import": {
    branches: {
      type: "data",
      string: {
        return: async ({ data }) => {
          const file = Bun.file(data);

          if (!file.exists()) Console.error("FILE NOT FOUND : ", "Import error file not found");

          const code = await file.text();
          const parser = new Parser(code);
          const tree = parser.trace(Grammer);

          return tree;
        }
      }
    }
  },

  branches: {
    separator: {
      ".": {
        forward: {
          count: -1,
          important: true
        }
      },
      ":": {
        require: Grammer.defineParameter,
        work: "defineFunction",
        important: "none",
        open: {
          data: "{",

          require: Grammer,
          important: "require",
          whaitfor: {
            type: "close",
            data: "}"
          }
        }
      }
    },
    assingment: {
      work: "assingment",
      require: Grammer.expression,
      important: "require"
    },
    break: {
      work: "call",
      end: true
    },
    default: {
      require: Grammer.arguments,
      important: "none",
      end: true
    }
  }
};

Grammer.reserve = {
  follow: Grammer.keyword,
  invalid: {
    work: "defineFunction"
  }
};

Grammer.defineParameter = {
  keyword: {
    type: "type",
    branches: {
      keyword: {
        type: "name",
        branches: {
          separator: {
            ",": {
              "forward": {
                "count": -2,
                "important": true
              }
            }
          },
          assingment: {
            require: "expression",
            froward: {
              count: 0,
              imprtant: false,
              invalid: {
                type: ["assingment"]
              }
            }
          }
        }
      }
    }
  }
};

Grammer.arguments = {
  require: Grammer.expression,
  branches: {
    separator: {
      ",": {
        forward: {
          count: -1,
          important: true
        }
      }
    }
  }
};

Grammer.expression = {
  keyword: {
    follow: Grammer.keyword,
    invalid: {
      work: ["defineFunction"]
    }
  }
};