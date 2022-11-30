module.exports = class JsonGenerator {
  constructor({ parentKeys, valueIndex, contents }) {
    this.parents = parentKeys;
    this.valueIndex = valueIndex;
    this.contents = contents;
    this.orderedKeys = [];
    this.nullKeys = [];
    this.json = {};
    for (const row of this.contents) {
      const valueArr = [];
      for (const keyIndex of this.parents) {
        valueArr.push(row[keyIndex]);
      }
      this.orderedKeys.push(valueArr);
    }
  }

  generate() {
    for (const [index, keys] of this.orderedKeys.entries()) {
      let masterObj = this.json;
      for (const [keyIndex, currentKey] of keys.entries()) {
        if (keyIndex === keys.length - 1) {
          if (currentKey === null) {
            this.nullKeys.push(index);
          }
          if (isKeyExists(masterObj, currentKey)) throw new Error('Key duplicated!');
          masterObj[currentKey] = this.contents[index][this.valueIndex];
        } else {
          if (currentKey === null) continue;
          if (!isKeyExists(masterObj, currentKey)) {
            masterObj[currentKey] = {};
          }
          masterObj = masterObj[currentKey];
        }
      }
    }
  }

  checkDuplicates() {
    let duplicates = [];
    const frequency = this.orderedKeys.reduce(function (
      seen,
      currentItem
    ) {
      if (currentItem in seen) {
        seen[currentItem] = seen[currentItem] + 1;
      } else {
        seen[currentItem] = 1;
      }
      return seen;
    }, {});

    for (const key in frequency) {
      if (frequency[key] > 1) {
        duplicates.push(
          key.split(",").map(function (currentItem) {
            return currentItem;
          })
        );
      }
    }

    if (duplicates.length > 0) {
      const duplicatesindex = [];
      for (const duplicate of duplicates) {
        for (const [index, keys] of this.orderedKeys.entries()) {
          if (JSON.stringify(keys) !== JSON.stringify(duplicate)) continue;
          duplicatesindex.push(index);
        }
      }
      return duplicatesindex;
    } else {
      return [];
    }
  }
};

function isKeyExists(object, key) {
  if (object[key] === undefined) return false;
  return true;
}
