const JsonGenerator = require('@/lib/xlsx-json-converter/json-generator');

module.exports = function (xlsxObj) {
  const jsonGenerator = new JsonGenerator({...xlsxObj});
  const duplicates = jsonGenerator.checkDuplicates();
  console.error('===PASSED!!====');
  if (duplicates.length > 0) throw {
    status: 428,
    body: duplicates
  };
  jsonGenerator.generate();
  console.error(jsonGenerator.nullKeys);
  if (jsonGenerator.nullKeys.length > 0) {
    throw {
      status: 429,
      body: jsonGenerator.nullKeys
    };
  }
  return jsonGenerator.json;
  // try {
  // } catch (err) {
  //   throw new Error(err);
  // }
};
