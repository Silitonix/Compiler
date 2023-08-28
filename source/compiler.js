if (
  args.includes( '-h' ) ||
  args.includes( '--help' ) ||
  args[0] === ''
) {
  Console.help();
}
if ( code == `¡` ) Console.error( "INVALID PATH : ", "I can't find your file !" );