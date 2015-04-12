var expect = require('chai').expect;
var exts = require('../src/exts');
var lvar = require('../src/lvar');
var smap = require('../src/smap');

describe('exts', function() {
  it('adds a binding for a logic variable to a value', function() {
    expect(exts(lvar('x'), 'X', smap({}))).to.eql({x: 'X'});
  });

  it('adds a binding for a logic variable to a logic variable', function() {
    var vy = lvar('y');
    expect(exts(lvar('x'), vy, smap({}))).to.eql({x: vy});
  });

  it('may expand the input s-map', function() {
    var s = smap({'a': 10});
    expect(exts(lvar('x'), 'X', s)).to.eql({a: 10, x: 'X'});
  });

  it('does not mutate the input s-map', function() {
    var s = smap({'a': 10});
    var out = exts(lvar('x'), 'X', s);
    expect(out).to.eql({a: 10, x: 'X'});
    expect(s).to.eql({a: 10});
  });
});
