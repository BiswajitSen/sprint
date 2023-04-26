const style = require('./utils/style.js');
const utils = require('./utils/test-utils.js');

const bold = style.bold;
const underline = style.underline;
const redfg = style.redfg;
const greenfg = style.greenfg;
const yellowfg = style.yellowfg;
const grayOut = style.grayOut;

const areEqual = utils.areEqual;

let totalTests = 0;
let testPassed = 0;

const updateTestLog = function(result) {
  totalTests++;

  if(result) {
    testPassed++;
  }
};

const getTotalPassed = function() {
  return testPassed;
};

const getTotalTests = function() {
  return totalTests;
};

const renderTitle = function(title) {
  console.log(bold(underline(redfg('\n' + title))));
};

const displayTestSummary = function() {
  let message = '';
  message += yellowfg('No of test case passed: ');
  message += getTotalPassed();
  message += '/ ' + greenfg(getTotalTests());

  console.log(message);
};

const generateLog = function(message, result, testData) {
  let log = message + ' ';
  const symbol = result ? '✅' : '❌';
  if(!result) {
    log += message + '\n';
    log += greenfg('\texpected: ' + testData.expected);
    log += redfg('\tactual: ' + testData.actual);
  }
  return symbol + ' ' + log;
};

const displayAssertionResult = function(message, result, testData) {
  const testLog = generateLog(message, result, testData);
  console.log(testLog);
};

const updateAndDisplayLog = function(message, result, testData) {
  updateTestLog(result);
  displayAssertionResult(message, result, testData);
};

const assert = function(testData, message) {
  const result = areEqual(testData.expected, testData.actual);
  updateAndDisplayLog(message, result, testData);
};

exports.renderTitle = renderTitle;
exports.displayTestSummary = displayTestSummary;
exports.assert = assert;
