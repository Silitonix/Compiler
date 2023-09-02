const args = Bun.argv.slice(2);
const filename = args[0];

if (
  args.includes( '-h' ) ||
  args.includes( '--help' ) ||
  !filename
) {
  Console.help();
}

const codefile = Bun.file(filename);

async function compile () {
  if(codefile.size == 0) Console.error("NO CODE FOUND : ", "There is nothing to read");
  const code = await codefile.text();
  const emmiter = new Emitter(code);
}

compile();