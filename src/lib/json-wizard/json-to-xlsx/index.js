module.exports = function (json) {
  try {
    readElementsRecursively(json);
    return jsonObj;
  } catch (error) {
    throw new Error(error);
  }
};

let jsonObj = [];

function readElementsRecursively (json = [], keys = []) {
  for (const element in json) {
    if (typeof json[element] === 'object') {
      keys.push(element);
      readElementsRecursively(json[element], keys);
    } else {
      const currentKeysNValue = [...keys, element, json[element]];
      jsonObj.push(currentKeysNValue.reverse());
    }
    if (element === Object.keys(json)[Object.keys(json).length - 1]) {
      keys.pop();
    }
  }
}
