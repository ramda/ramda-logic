var expect = require('chai').expect;
var lvar = require('../src/lvar');
var smap = require('../src/smap');
var walk = require('../src/walk');

describe('walk', function() {
  var s = smap({0: lvar(1), 1: 'banana'});
  it('returns a non-logic-variable argument', function() {
    expect(walk('mango', s)).to.eql('mango');
  });

  it('returns the binding for a logic variable', function() {
    expect(walk(lvar(1), s)).to.eql('banana');
    expect(walk(lvar(0), s)).to.eql('banana');
  });

  it('returns a logic variable if it is not in the s-map', function() {
    var walked = walk(lvar('x'), smap({}));
    expect(lvar.is(walked)).to.equal(true);
    expect(walked.equals(lvar('x'))).to.equal(true);
  });
});
