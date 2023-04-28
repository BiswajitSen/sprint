const {deepStrictEqual} = require('assert');
const {describe, it} = require('node:test');
const {execute} = require('../src/sprint.js');

describe('sprint operations', function(){
  it('Should add 2 and 3 and store 5 in specified memory.', function(){
    deepStrictEqual(
      {
        memory: [
          3, 2,
          0, 45, 13,
          0, 55, 14,
          1, 13, 14, 15,
          9,
          45, 55, 100],
        pc: 13,
        halt: true
      },
      execute(
        {
          memory: [
            3,  2,
            0,  45,  13,
            0, 55, 14,
            1, 13, 14, 15,
            9
          ],
          pc: 0,
          halt: false
        }

      ));
  });

});

