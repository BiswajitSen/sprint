const textStyle = function(styleCode, text) {
  return "\033[" + styleCode + "m" + text + "\033[0m";
};

const bold = function(text) {
  return textStyle(2, text);
};

const underline = function(text) {
  return textStyle(4, text);
};

const redfg = function(text) {
  return textStyle(32, text);
};

const greenfg = function(text) {
  return textStyle(33, text);
};

const yellowfg = function(text) {
  return textStyle(34, text);
};

const grayOut = function(text) {
  return textStyle(38, text);
};

exports.bold = bold;
exports.underline = underline;
exports.redfg = redfg;
exports.greenfg = greenfg;
exports.yellowfg = yellowfg;
exports.grayOut = grayOut;
