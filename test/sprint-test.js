const testing = require('../lib/test.js')
const source = require('../src/sprint.js')
const displayTestSummary = testing.displayTestSummary;
const assert = testing.assert;
const title = testing.renderTitle;

const test = function(){
  title('Testing test framework');

  assert({expected: 1, actual: source.main()}, '1 === 1 Should pass');
  assert({expected: 0, actual: source.main()}, '2 === 0 Should fail');
  displayTestSummary();
};

test();

