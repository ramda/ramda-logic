import { expect } from 'chai';
import Stream from '../src/stream';
import fail from '../src/fail';

describe('fail', function() {
  it('returns an empty stream for no args', function() {
    expect(Stream.isStream(fail())).to.equal(true);
    expect(fail()).to.eql(Stream.Empty);
  });

  it('returns an empty stream for number args', function() {
    expect(Stream.isStream(fail(1))).to.equal(true);
    expect(fail(1)).to.eql(Stream.Empty);
  });

  it('returns an empty stream for bool args', function() {
    expect(Stream.isStream(fail(true))).to.equal(true);
    expect(fail(true)).to.eql(Stream.Empty);
  });

  it('returns an empty stream for object args', function() {
    expect(Stream.isStream(fail({}))).to.equal(true);
    expect(fail({})).to.eql(Stream.Empty);
  });

  it('returns an empty stream for empty array args', function() {
    expect(Stream.isStream(fail([]))).to.equal(true);
    expect(fail([])).to.eql(Stream.Empty);
  });

  it('returns an empty stream for populated array args', function() {
    expect(Stream.isStream(fail([1]))).to.equal(true);
    expect(fail([1])).to.eql(Stream.Empty);
  });
});
