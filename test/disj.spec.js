import { expect } from 'chai';
import conj from '../src/conj';
import disj from '../src/disj';
import fail from '../src/fail';
import succeed from '../src/succeed';


describe('disj', function() {
  const bothSucceed = disj(succeed, succeed);
  const firstSucceed = disj(succeed, fail);
  const secondSucceed = disj(fail, succeed);
  const neitherSucceed = disj(fail, fail);

  it('returns a stream of f1 and all the results of f2 when both succeed.', function() {
    expect(bothSucceed(10).toArray()).to.eql([10, 10]);
  });

  it('returns a stream of f1 and all the results of f2 when only the first succeeds.', function() {
    expect(firstSucceed(10).toArray()).to.eql([10]);
  });

  it('returns a stream of f1 and all the results of f2 when only the second succeeds.', function() {
    expect(secondSucceed(10).toArray()).to.eql([10]);
  });

  it('it returns empty if neither goal suceeded', function() {
    expect(neitherSucceed(10).toArray()).to.eql([]);
  });

  it('can compose larger goals', function() {
    expect(disj(
      disj(fail, succeed),
      conj(
        disj(function(x) { return succeed(x + 1); }, function(x) { return succeed(x + 10); }),
        disj(succeed, succeed)
      ))(100).toArray()).to.eql([100, 101,101, 110, 110]);
  });
});
