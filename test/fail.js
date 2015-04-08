var expect = require('chai').expect;
var fail = require('../src/fail');

describe('fail', function() {
  it('always returns an empty list', function() {
    expect(fail()).to.eql([]);
    expect(fail(1)).to.eql([]);
    expect(fail(true)).to.eql([]);
    expect(fail(-Infinity)).to.eql([]);
    expect(fail({})).to.eql([]);
    expect(fail([1])).to.eql([]);
    expect(fail([])).to.eql([]);
  });
});
