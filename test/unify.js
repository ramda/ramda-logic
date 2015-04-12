var expect = require('chai').expect;
var fail = require('../src/fail');
var lvar = require('../src/lvar');
var smap = require('../src/smap');
var succeed = require('../src/succeed');
var unify = require('../src/unify');

describe('unify', function() {
  var vu = lvar('u');
  var vv = lvar('v');
  var vw = lvar('w');
  var vx = lvar('x');

  it('returns a goal function', function() {
    expect(unify(vu, vv)).to.be.a('function');
  });

  it('associates two logic variables if they unify in the given state', function() {
    expect(unify(vu, vv)(smap({}))).to.eql(succeed({'u': vv}));
  });

  it('associates a logic variable and a value if they unify in the given state', function() {
    expect(unify(vu, 'banana')(smap({}))).to.eql(succeed({'u': 'banana'}));
    expect(unify('banana', vu)(smap({}))).to.eql(succeed({'u': 'banana'}));
  });

  it('may extend the map when the terms unify', function() {
    expect(unify(vu, 'banana')(smap({'z': 'squirrels'})))
      .to.eql(succeed({'u': 'banana', 'z': 'squirrels'}));
  });

  it('returns empty if the terms cannot be unified', function() {
    expect(unify(vu, "banana")(smap({'u': 'mango'}))).to.eql(fail());
  });

  xit('can unify inside a list', function() {
    expect(unify([lvar('x'), 2, 3], ['banana', 2, 3])(smap({}))).to.eql(succeed({x: 'banana'}));
  });
});
