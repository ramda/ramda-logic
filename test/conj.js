var expect = require('chai').expect;
var conj = require('../src/conj');
var succeed = require('../src/succeed');
var fail = require('../src/fail');

describe('conj', function() {
  function multi(x) { return [x, (x + 1), (x + 2)]; }
  function add1(x) { return [x + 1]; }
  var bothSucceed = conj(succeed, succeed);
  var firstSucceed = conj(succeed, fail);
  var secondSucceed = conj(fail, succeed);
  var neitherSucceed = conj(fail, fail);

  it('returns the output of f2 applied to all the results of f1.', function() {
    expect(bothSucceed(10)).to.eql([10]);
    expect(conj(multi, add1)(1)).to.eql([2, 3, 4]);
  });

  it('it returns empty if either goal failed', function() {
    expect(firstSucceed(10)).to.eql([]);
    expect(secondSucceed(10)).to.eql([]);
    expect(neitherSucceed(10)).to.eql([]);
    expect(conj(multi, fail)(1)).to.eql([]);
    expect(conj(fail, add1)(1)).to.eql([]);
  });
});
