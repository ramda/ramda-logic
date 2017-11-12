import { expect } from 'chai';
import fresh from '../src/fresh';
import smap from '../src/smap';
import eq from '../src/eq';

describe('fresh', function() {
  function q5(q) { return eq(q, 5); }

  it('returns a new goal function', function() {
    expect(fresh(q5)).to.be.a('function');
  });

  it('creates a new logic variable in the returned state', function() {
    console.log(fresh(q5)(smap({})).toString()); // eslint-disable-line no-console
    expect(fresh(q5)(smap({})).toArray()).to.eql([{'_.0': 5}]);
  });
});
