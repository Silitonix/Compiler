async function compile() {
  const args = Bun.argv.slice(2);
  
  const filename = args[0];

  if (
    args.includes('-h') ||
    args.includes('--help') ||
    !filename
  ) {
    Console.help();
  }

  const file = Bun.file(filename);
  const exist = await file.exists();
  if (!exist) {
    Console.error("FILE NOT FOUND : ", "I cant find your file !");
  }

  const code = await file.text();
  if (code.length == 0) {
    Console.error("NO CODE FOUND : ", "There is nothing to read");
  }

  const emmiter = new Emitter(code, filename);
}

compile();