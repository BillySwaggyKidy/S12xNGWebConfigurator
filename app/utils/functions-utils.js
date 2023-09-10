// this function purpose is to filter a element depending of a list of filters
export const multiplesFilterCallback = (element, filterList) => {
  // first we retrieved a list of the first filter from the search bar and only the filter that have been added and that contain some value on there input
  const validFilterList = filterList.filter((filter,index)=>((index == 0 || (filter.added && (filter.value != "")))));
  // then we check if the specified element check every filter of the list 
  return validFilterList.every((filter)=>filter.condition(element[filter.ref], filter.value));
};

// this function select any number of properties from a JavaScript object specified by the keyList array parameter, it return a copy
// is it a custom implementation of the lodash library's pick function in vanilla js
export const pick = (obj, keyList) => {
  return keyList.reduce(function(result, prop) {
    result[prop] = obj[prop];
    return result;
  }, {});
};

// this function omit any number of properties from a JavaScript object specified by the keyList array parameter, it return a copy
// is it a custom implementation of the lodash library's omit function in vanilla js
export const omit = (obj, keyList) => {
  const result = { ...obj };
  keyList.forEach(function(prop) {
    delete result[prop];
  });
  return result;
};

// this function can update any deep nested property from an object, it modify the obj
// the propPath must be a string and can contain array index
export const updateObjProp = (obj, propPath, value) => {
  const [head, ...rest] = propPath.split('.');

  !rest.length ? obj[head] = value : updateObjProp(obj[head], rest.join('.'), value);
};

// this function check if two objects has the same set of keys
export const compareKeys = (a, b) => {
  var aKeys = Object.keys(a).sort();
  var bKeys = Object.keys(b).sort();
  return JSON.stringify(aKeys) === JSON.stringify(bKeys);
}