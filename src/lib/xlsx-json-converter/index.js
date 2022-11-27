const JsonGenerator = require('@/lib/xlsx-json-converter/json-generator');

module.exports = function (xlsxObj) {
  const jsonGenerator = new JsonGenerator({...xlsxObj});
  const duplicates = jsonGenerator.checkDuplicates();
  if (duplicates.length > 0) throw {
    status: 428,
    body: duplicates
  };
  jsonGenerator.generate();
  return jsonGenerator.json;
};
