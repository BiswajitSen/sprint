const assign = function({pc, memory, halt}) {
  const [data, cell] = memory.slice(pc + 1, pc + 3);
  memory[cell] = data;

  return {memory, halt, pc: pc + 3};
};

const add = function({pc, memory, halt}) {
  const [addendCell, augendCell, resCell] = memory.slice(pc + 1, pc + 4); 
  memory[resCell] = memory[augendCell] + memory[addendCell];

  return {memory, halt, pc: pc + 4};
};

const sub = function({pc, memory, halt}) {
  const [minuendCell, subtrahendCell, resCell] = memory.slice(pc + 1, pc + 4);
  memory[resCell] = memory[minuendCell] - memory[subtrahendCell];

  return {memory, halt, pc: pc + 4};
};

const jump = function({pc, memory, halt}) {
  const jumpLocation = memory[pc + 1];
  return {memory, halt, pc: jumpLocation};
};

const jumpEqual = function({pc, memory, halt}) {
  const [lhs, rhs] = memory.slice(pc + 1, pc + 3);
  let jumpLocation = pc + 4;

  if(memory[lhs] === memory[rhs]) {
    jumpLocation = memory[pc + 3];
  }

  return {memory, halt, pc: jumpLocation};
};

const jumpLess = function({pc, memory, halt}) {
  const [lhs, rhs] = memory.slice(pc + 1, pc + 3);
  let jumpLocation = pc + 4;

  if(memory[lhs] < memory[rhs]) {
    jumpLocation = memory[pc + 3];
  }

  return {memory, halt, pc: jumpLocation};
};

const halt = function({pc, memory}) {
  return {memory, halt: true, pc: pc + 1};
};

const opCode = {
  '0': assign,
  '1': add,
  '2': sub,
  '3': jump,
  '4': jumpEqual,
  '5': jumpLess,
  '9': halt
};

const generateTokens = function(code) {
  const symbols = code.split(" ");

  return symbols.map(function(symbol) {
    if(symbol.includes(':')) {
      const fields = symbol.split(':');

      return {value: fields[1], label: fields[0]};
    }

    return {value: symbol};
  });
};

const generateSymbolTable = function(tokens) {
  const label = 'label';
  return tokens.reduce(function(symbolTable, token, index) {
    if(label in token) {
      symbolTable[token.label] = index;
      return symbolTable;
    }

    return symbolTable;
  }, {});
};

const generateCode = function(tokens, symbolTable) {
  return tokens.reduce(function(executableCode, token) {
    return [...executableCode, (token.value in symbolTable) ? symbolTable[token.value] : +token.value];
  }, []);
};

const load = function(code) {
  const tokens = generateTokens(code);
  const symbolTable = generateSymbolTable(tokens);
  const executableCode = generateCode(tokens, symbolTable);
  return executableCode;
};

const execute = function(state) {
  while(!state.halt) {
    const {memory, pc} = state;
    const lookUp = memory[pc];
    const execute = opCode[lookUp];

    state = execute(state);
  }

  return state;
};

const display = function(state) {
  console.log(state.join(' | '));
};

const initializeState = function(code) {
  const memory = load(code);
  const pc = 0;
  const halt = false;
  return {memory, pc, halt};
}; 

const main = function() {
  const code = "3 main main:0 45 14 0 55 15 1 100 101 16 9";
  const state = initializeState(code);
  const newState = execute(state);

  display(newState.memory);
};

exports.execute = execute;
