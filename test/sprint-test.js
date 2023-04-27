const {deepStrictEqual} = require('assert');
const {describe, it} = require('node:test');
const {main, add, sub, jump} = require('../src/sprint.js');

describe('sprint operations', function(){
  it('Should return 0 on successful execution.', function(){
    deepStrictEqual(0, main());
  });
});
