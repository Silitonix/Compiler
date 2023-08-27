class Regex {
  static ignore = /[\s$#]/;
  static newline = /[\n\r]/;
  static comment = '$';
  static momment = '#';
  static keystart = /[\p{Letter}\p{Emoji}_]/u;
  static keybody = /[\p{Letter}\p{Emoji}_0-9]/u;
  static numstart = /[0-9.]/
}

