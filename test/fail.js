var expect = require('chai').expect;
var _ = require('highland');

var fail = require('../src/fail');

describe('fail', function() {
  it('returns an empty stream for no args', function(done) {
    expect(_.isStream(fail())).to.equal(true);
    fail().toArray(function(xs) {
      expect(xs).to.eql([]);
      done();
    });
  });

  it('returns an empty stream for number args', function(done) {
    expect(_.isStream(fail(1))).to.equal(true);
    fail(1).toArray(function(xs) {
      expect(xs).to.eql([]);
      done();
    });
  });

  it('returns an empty stream for bool args', function(done) {
    expect(_.isStream(fail(true))).to.equal(true);
    fail(true).toArray(function(xs) {
      expect(xs).to.eql([]);
      done();
    });
  });

  it('returns an empty stream for object args', function(done) {
    expect(_.isStream(fail({}))).to.equal(true);
    fail({}).toArray(function(xs) {
      expect(xs).to.eql([]);
      done();
    });
  });

  it('returns an empty stream for empty array args', function(done) {
    expect(_.isStream(fail([]))).to.equal(true);
    fail([]).toArray(function(xs) {
      expect(xs).to.eql([]);
      done();
    });
  });

  it('returns an empty stream for populated array args', function(done) {
    expect(_.isStream(fail([1]))).to.equal(true);
    fail([1]).toArray(function(xs) {
      expect(xs).to.eql([]);
      done();
    });
  });
});
