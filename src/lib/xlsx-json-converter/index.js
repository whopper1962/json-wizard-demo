const formatChecker = require('../format-checker');
const JsonGenerator = require('./json-generator');

module.exports = function (xlsxObj) {
  const jsonGenerator = new JsonGenerator({...xlsxObj});
  const duplicates = jsonGenerator.checkDuplicates();
  if (duplicates.length > 0) throw {
    status: 428,
    body: duplicates
  };
  console.error('PASS!!');
};

// function checkFormat (xlsxObj) {
//   if (xlsxObj) {
//   } else {
//     formatChecker.checkJsonFormat(xlsxObj);
//   }
// }

function formatXlsxObj (xlsxObj) {
  // for (const row of xlsxObj) {
  //   console.error(row);
  // }
}

function generateJson () {}