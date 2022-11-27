module.exports = class JsonTemplate {
  constructor (json) {
    this.json = json;
    this.parsedJsonObjects = [];
  }
  generate () {
    this.parseJsonRecursively(this.json);
    this.checkRootDataType();
  }
  parseJsonRecursively (json, recursiveCount = 0, parents = [], cachedParents = []) {
    for (const elem in json) {
      if (this.isFirstElemInObj(json, elem)) {
        recursiveCount++;
      }
      if (typeof json[elem] === 'object') {
        cachedParents.push(json[elem]);
        parents.push(elem);
        this.parsedJsonObjects.push({
          value: `"${elem}": {`,
          depth: recursiveCount
        });
        this.parseJsonRecursively(json[elem], recursiveCount, parents, cachedParents);
      } else {
        this.parsedJsonObjects.push({
          value: `"${elem}": "${json[elem]}"${this.isLastElemInObj(json, elem) ? '' : ','}`,
          depth: recursiveCount
        });
      }
      if (this.isLastElemInObj(json, elem) && json !== this.json) {
        recursiveCount--;
        parents.pop();
        cachedParents.pop();
        const isLastObj = this.isLastCurlyBracket(json, cachedParents);
        const curlyBracket = `}${isLastObj ? '' : ','}`
        this.parsedJsonObjects.push({
          value: curlyBracket,
          depth: recursiveCount
        });
      }
    }
  }
  checkRootDataType () {
    this.parsedJsonObjects.unshift({
      value: '{',
      depth: 0
    });
    this.parsedJsonObjects.push({
      value: '}',
      depth: 0
    });
  }
  keyWithParents (parents, key) {
    if (key) parents.push(key);
    return parents.join('.');
  }
  isLastCurlyBracket (json, parents) {
    const latestParent = parents.length > 0 ? parents.pop() : this.json;
    const lastObj = latestParent[Object.keys(latestParent)[Object.keys(latestParent).length - 1]];
    return json === lastObj;
  }
  isLastElemInObj (obj, elem) {
    const lastElem = Object.keys(obj).pop();
    return lastElem === elem;
  }
  isFirstElemInObj (obj, elem) {
    const firstElem = Object.keys(obj).shift();
    return firstElem === elem;
  }
}