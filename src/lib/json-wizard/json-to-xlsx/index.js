module.exports = function (json) {
  try {
    readElementsRecursively(json);
    let csvContent = "data:text/csv;charset=utf-8,";
    jsonObj.forEach(function(rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });
    const encodedUri = encodeURI(csvContent);
    return encodedUri;
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
