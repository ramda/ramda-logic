var expect = require('chai').expect;
var succeed = require('../src/succeed');

describe('succeed', function() {
  it('returns its argument wrapped up', function() {
    expect(succeed(1)).to.eql([1]);
    expect(succeed([1])).to.eql([[1]]);
    expect(succeed({})).to.eql([{}]);
    expect(succeed('abc')).to.eql(['abc']);
    expect(succeed(true)).to.eql([true]);
    expect(succeed([true, false])).to.eql([[true, false]]);
  });
});
