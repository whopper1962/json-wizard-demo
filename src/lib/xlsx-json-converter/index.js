const formatChecker = require('../format-checker');

module.exports = function (xlsxObj) {
  // checkFormat(xlsxObj);
  if (!formatChecker.checkXlsxFormat(xlsxObj)) throw new Error();
  formatXlsxObj(xlsxObj);
  // try {
  // } catch {
  // }
};

// function checkFormat (xlsxObj) {
//   if (xlsxObj) {
//   } else {
//     formatChecker.checkJsonFormat(xlsxObj);
//   }
// }

function formatXlsxObj (xlsxObj) {
  for (const row of xlsxObj) {
    console.error(row);
  }
}