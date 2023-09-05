class Regex {
  static ignore = /[\s$#]/;
  static newline = /[\n\r]/;
  static comment = '#';
  static momment = '$';
  static keystart = /[\p{Letter}\p{Emoji}_]/u;
  static keybody = /[\p{Letter}\p{Emoji}_0-9]/u;
  static numstart = /[0-9.]/
  static hexstart = "0x"
  static binstart = "0b"
  static hexbody = /[0-9a-fA-F]/;
  static binbody = /[0-1]/;
  static numbody = /[0-9]/;
  static strstart = /[\'\"]/;
  static numsubone = '.';
}

