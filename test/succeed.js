var expect = require('chai').expect;
var _ = require('highland');

var succeed = require('../src/succeed');


describe('succeed', function() {
  it('wraps a number in a stream', function(done) {
    expect(_.isStream(succeed(1))).to.equal(true);
    succeed(1).toArray(function(xs) {
      expect(xs).to.eql([1]);
      done();
    });
  });

  it('wraps an array in a stream', function(done) {
    expect(_.isStream(succeed([1]))).to.equal(true);
    succeed([1]).toArray(function(xs) {
      expect(xs).to.eql([[1]]);
      done();
    });
  });

  it('wraps an object in a stream', function(done) {
    expect(_.isStream(succeed({}))).to.equal(true);
    succeed({}).toArray(function(xs) {
      expect(xs).to.eql([{}]);
      done();
    });
  });

  it('wraps a string in a stream', function(done) {
    expect(_.isStream(succeed('abc'))).to.equal(true);
    succeed('abc').toArray(function(xs) {
      expect(xs).to.eql(['abc']);
      done();
    });
  });

  it('wraps a boolean in a stream', function(done) {
    expect(_.isStream(succeed(true))).to.equal(true);
    succeed(true).toArray(function(xs) {
      expect(xs).to.eql([true]);
      done();
    });
  });
});
