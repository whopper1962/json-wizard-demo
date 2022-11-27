const formatChecker = require('../format-checker');

module.exports = function (file) {
  // checkFormat(file);
  formatChecker.checkXlsxFormat(file);
  // try {
  // } catch {
  // }
};

function checkFormat (file) {
  if (file) {
  } else {
    formatChecker.checkJsonFormat(file);
  }
}