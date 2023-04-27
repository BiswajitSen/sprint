const assign = function(pc, memory) {
  const data = memory[pc + 1];
  const index = memory[pc + 2];
  memory[index] = data;

  return pc + 3;
};

const add = function(pc, memory) {
  const resIndex = memory[pc + 3];
  const addendIndex = memory[pc + 1];
  const augendIndex = memory[pc + 2];
  memory[resIndex] = memory[augendIndex] + memory[addendIndex];

  return pc + 4;
};

const sub = function(pc, memory) {
  const resIndex = memory[pc + 3];
  const minuendIndex = memory[pc + 1];
  const subtrahendIndex = memory[pc + 2];
  memory[resIndex] = memory[minuendIndex] - memory[subtrahendIndex];

  return pc + 4;
};

const jump = function(pc, memory) {
  return memory[pc + 1];
};

const jumpEqual = function(pc, memory) {
  const lhs = memory[pc + 1];
  const rhs = memory[pc + 2];

  if (memory[lhs] === memory[rhs]) {
    return memory[pc + 3];
  }

  return pc + 4;
};

const jumpLess = function(pc, memory) {
  const lhs = memory[pc + 1];
  const rhs = memory[pc + 2];

  if (memory[lhs] < memory[rhs]) {
    return memory[pc + 3];
  }

  return pc + 4;
};

const opCode = {
  '0': assign,
  '1': add,
  '2': sub,
  '3': jump,
  '4': jumpEqual,
  '5': jumpLess 
};

const execute = function(memory) {
  let pc = 0;

  while(true) {
    const currentOperation = memory[pc];
    if(currentOperation === 9) {
      return 0;
    }

    pc = opCode[currentOperation](pc, memory);
  }

};

const load = function(code, memory) {
  return code.map(function(token) {
    memory.push(token);
  });
};

const main = function() {
  const memory = [];
  const code = [
    0, 24, 100,
    0, 5, 101,
    0, 0, 102,
    0, 0, 103,
    5, 100, 103, 22,
    1, 101, 103, 103,
    3, 12,
    2, 103, 101, 103,
    2, 100, 103, 102,
    9 ];
  load(code, memory);
  execute(memory);
  console.log(memory);
  return 0;
};

main();

exports.main = main;
