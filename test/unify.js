const expect = require('chai').expect;
const _ = require('highland');

const lvar = require('../src/lvar');
const smap = require('../src/smap');
const unify = require('../src/unify');


describe('unify', function() {
  const vu = lvar('u');
  const vv = lvar('v');

  it('returns a goal function', function() {
    expect(unify(vu, vv)).to.be.a('function');
  });

  it('associates two logic variables if they unify in the given state', function(done) {
    unify(vu, vv)(smap({})).toArray(function(xs) {
      expect(xs).to.eql([{'u': vv}]);
      done();
    });
  });

  it('associates a logic variable and a value if they unify in the state (1)', function(done) {
    unify(vu, 'banana')(smap({})).toArray(function(xs) {
      expect(xs).to.eql([{'u': 'banana'}]);
      done();
    });
  });

  it('associates a logic variable and a value if they unify in the state (2)', function(done) {
    unify('banana', vu)(smap({})).toArray(function(xs) {
      expect(xs).to.eql([{'u': 'banana'}]);
      done();
    });
  });

  it('may extend the map when the terms unify', function(done) {
    unify(vu, 'banana')(smap({'z': 'squirrels'})).toArray(function(xs) {
      expect(xs).to.eql([{'u': 'banana', 'z': 'squirrels'}]);
      done();
    });
  });

  it('returns empty if the terms cannot be unified', function(done) {
    unify(vu, 'banana')(smap({'u': 'mango'})).toArray(function(xs) {
      expect(xs).to.eql([]);
      done();
    });
  });

  it('can unify inside a list (1)', function(done) {
    unify([lvar('x'), 2, 3], ['banana', 2, 3])(smap({})).toArray(function(xs) {
      expect(xs).to.eql([{x: 'banana'}]);
      done();
    });
  });

  it('can unify inside a list (2)', function(done) {
    unify([1, lvar('x'), 3], [1, 'banana', 3])(smap({})).toArray(function(xs) {
      expect(xs).to.eql([{x: 'banana'}]);
      done();
    });
  });

  it('can unify inside a list (3)', function(done) {
    unify([1, 2, lvar('x')], [1, 2, 'banana'])(smap({})).toArray(function(xs) {
      expect(xs).to.eql([{x: 'banana'}]);
      done();
    });
  });
  
  it('can unify two variables inside a list', function(done) {
    unify([1, lvar('x'), 3, lvar('y'), 5], [1, 2, 3, 4, 5])(smap({})).toArray(function(xs) {
      expect(xs).to.eql([{x: 2, y: 4}]);
      done();
    });
  });

  it('can fail to unify inside a list', function(done) {
    unify([1, 2, lvar('x')], ['cherry', 'grape', 'banana'])(smap({})).toArray(function(xs) {
      expect(xs).to.eql([]);
      done();
    });
  });
});
