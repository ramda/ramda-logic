var expect = require('chai').expect;
var _ = require('highland');

var conj = require('../src/conj');
var fail = require('../src/fail');
var succeed = require('../src/succeed');


describe('conj', function() {
  function multi(x) { return _([x, (x + 1), (x + 2)]); }
  function add1(x) { return _([x + 1]); }
  var bothSucceed = conj(succeed, succeed);
  var firstSucceed = conj(succeed, fail);
  var secondSucceed = conj(fail, succeed);
  var neitherSucceed = conj(fail, fail);

  it('returns a stream', function() {
    expect(_.isStream(bothSucceed(999))).to.equal(true);
  });

  it('returns the output of f2 applied to all the results of f1.', function(done) {
    bothSucceed(10).toArray(function(xs) {
      expect(xs).to.eql([10]);
      done();
    });
  });

  it('works with lists of more than one element', function(done) {
    conj(multi, add1)(1).toArray(function(xs) {
      expect(xs).to.eql([2, 3, 4]);
      done();
    });
  });

  it('it returns empty if only the first goal succeeded', function(done) {
    firstSucceed(10).toArray(function(xs) {
      expect(xs).to.eql([]);
      done();
    });
  });

  it('it returns empty if only the second goal succeeded', function(done) {
    secondSucceed(10).toArray(function(xs) {
      expect(xs).to.eql([]);
      done();
    });
  });

  it('it returns empty if both goals failed', function(done) {
    neitherSucceed(10).toArray(function(xs) {
      expect(xs).to.eql([]);
      done();
    });
  });

  it('holds for longer lists (1)', function(done) {
    conj(multi, fail)(1).toArray(function(xs) {
      expect(xs).to.eql([]);
      done();
    });
  });
});
