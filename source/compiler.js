const filename =args[0];

if (
  args.includes( '-h' ) ||
  args.includes( '--help' ) ||
  filename == ''
) {
  Console.help();
}
if ( code == `¡` ) Console.error( "INVALID PATH : ", "I can't find your file !" );

new Parser();