var expect = require('chai').expect;
var _ = require('highland');

var conj = require('../src/conj');
var disj = require('../src/disj');
var fail = require('../src/fail');
var succeed = require('../src/succeed');


describe('disj', function() {
  var bothSucceed = disj(succeed, succeed);
  var firstSucceed = disj(succeed, fail);
  var secondSucceed = disj(fail, succeed);
  var neitherSucceed = disj(fail, fail);

  it('returns a stream of f1 and all the results of f2 when both succeed.', function(done) {
    bothSucceed(10).toArray(function(xs) {
      expect(xs).to.eql([10, 10]);
      done();
    });
  });

  it('returns a stream of f1 and all the results of f2 when only the first succeeds.', function(done) {
    firstSucceed(10).toArray(function(xs) {
      expect(xs).to.eql([10]);
      done();
    });
  });

  it('returns a stream of f1 and all the results of f2 when only the second succeeds.', function(done) {
    secondSucceed(10).toArray(function(xs) {
      expect(xs).to.eql([10]);
      done();
    });
  });

  it('it returns empty if neither goal suceeded', function(done) {
    neitherSucceed(10).toArray(function(xs) {
      expect(xs).to.eql([]);
      done();
    });
  });

  it('can compose larger goals', function(done) {
    disj(
      disj(fail, succeed),
        conj(
          disj(function(x) { return succeed(x + 1); }, function(x) { return succeed(x + 10); }),
          disj(succeed, succeed)
        ))(100).toArray(function(xs) {
          expect(xs).to.eql([100, 101,101, 110, 110]);
          done();
        });
  });
});
