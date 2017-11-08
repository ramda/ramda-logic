import { expect } from 'chai';

import Stream from '../src/stream';
import conj from '../src/conj';
import fail from '../src/fail';
import succeed from '../src/succeed';


describe('conj', function() {
  function multi(x) { return Stream.fromArray([x, (x + 1), (x + 2)]); }
  function add1(x) { return Stream.fromArray([x + 1]); }
  
  const bothSucceed = conj(succeed, succeed);
  const firstSucceed = conj(succeed, fail);
  const secondSucceed = conj(fail, succeed);
  const neitherSucceed = conj(fail, fail);

  it('returns a stream', function() {
    expect(Stream.isStream(bothSucceed(999))).to.equal(true);
  });

  it('returns the output of f2 applied to all the results of f1.', function() {
    expect(bothSucceed(10).toArray()).to.eql([10]);
  });

  it('works with lists of more than one element', function() {
    expect(conj(multi, add1)(1).toArray()).to.eql([2, 3, 4]);
  });

  it('it returns empty if only the first goal succeeded', function() {
    expect(firstSucceed(10).toArray()).to.eql([]);
  });

  it('it returns empty if only the second goal succeeded', function() {
    expect(secondSucceed(10).toArray()).to.eql([]);
  });

  it('it returns empty if both goals failed', function() {
    expect(neitherSucceed(10).toArray()).to.eql([]);
  });

  it('holds for longer lists (1)', function() {
    expect(conj(multi, fail)(1).toArray()).to.eql([]);
  });
});
