const areArraysEqual = function(array1, array2) {
  if(array1.length !== array2.length) {
    return false;
  }

  return array1.every(function(element, index) {
    return areEqual(element, array2[index]);
  });
};

const areObjectsEqual = function(object1, object2) {
  if(Object.keys(object1).length !== Object.keys(object2).length) {
    return false;
  }

  for(const key in object1) {
    if(!areEqual(object1[key], object2[key])) {
      return false;
    }
  }
  return true;
};

const isObject = function(a) {
  return !Array.isArray(a) && typeof a === 'object';
};

const areEqual = function(a, b) {
  if(a === b) {
    return true;
  }

  if([a, b].every(Array.isArray)) {
    return areArraysEqual(a, b);
  }

  if([a, b].every(isObject)) {
    return areObjectsEqual(a, b);
  }
};

exports.areEqual = areEqual;
