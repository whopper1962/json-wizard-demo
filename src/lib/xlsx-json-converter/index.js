const JsonGenerator = require('@/lib/xlsx-json-converter/json-generator');
const JsonTemplateGenerator = require('@/lib/json-template-generator');

module.exports = function (xlsxObj) {
  const jsonGenerator = new JsonGenerator({...xlsxObj});
  const duplicates = jsonGenerator.checkDuplicates();
  if (duplicates.length > 0) throw {
    status: 428,
    body: duplicates
  };
  jsonGenerator.generate();
  const jsonTemplateGenerator = new JsonTemplateGenerator(jsonGenerator.json);
  jsonTemplateGenerator.generate();
  const jsonTemplate = jsonTemplateGenerator.parsedJsonObjects;
  console.error(jsonTemplate);
};
