let dataSegment = [];

const fetch = function(memLocation) {
  return dataSegment[memLocation];
};

const initialize = function(value, memLocation) {
  dataSegment[memLocation] = value;
};

const map = {
  '0' : 'assign',
  '1' : 'add',
  '2' : 'sub'
};

const operations = {
  assign: function(value, index) {
    initialize(value, index);
  },

  add: function add(lhsCell, rhsCell, resultCell) {
    const value = fetch(lhsCell) + fetch(rhsCell);
    initialize(value, resultCell);
  },

  sub: function sub(lhsCell, rhsCell, resultCell) {
    const value = fetch(lhsCell) - fetch(rhsCell);
    initialize(value, resultCell);
  }

};

const parse = function(text) {
  return text.map(function(character){ 
    return +character;
  });
};

const initializeCells = function(code) {
  dataSegment = [...code]
};

const generateCode = function(text) {
  const code = text.split('\n');
  return code.map(function(element){
    return parse(element.split(' '));
  });
};

const execute = function(code) {
  code.reduce(function(dataSegment, currentLine){
    const [instruction, ...argument] = currentLine;
    operations[map[instruction]](...argument);

    return dataSegment;
  }, dataSegment);
};

const main = function() {
  const inputText = '0 1 50\n0 2 51\n1 50 51 52';
  const code = generateCode(inputText);

  initializeCells(code);
  console.log(dataSegment)
  execute(code);
  console.log(dataSegment);
};

main();
