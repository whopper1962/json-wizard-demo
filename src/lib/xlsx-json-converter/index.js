const formatChecker = require('../format-checker');

module.exports = function (file) {
  checkFormat(file);
  // try {
  // } catch {
  // }
};

function checkFormat (file) {
  if (file) {
    formatChecker.checkJsonFormat(file);
  } else {
    formatChecker.checkXlsxFormat(file);
  }
}