import { expect } from 'chai';

import lvar from '../src/lvar';
import smap from '../src/smap';
import eq from '../src/eq';
import Stream from '../src/stream';


describe('eq', function() {
  const vu = lvar.of('u');
  const vv = lvar.of('v');

  it('returns a goal function', function() {
    expect(eq(vu, vv)).to.be.a('function');
  });

  it('associates two logic variables if they unify in the given state', function() {
    expect(eq(vu, vv)(smap({})).toArray()).to.eql([{'u': vv}]);
  });

  it('associates a logic variable and a value if they unify in the state (1)', function() {
    expect(eq(vu, 'banana')(smap({})).toArray()).to.eql([{'u': 'banana'}]);
  });

  it('associates a logic variable and a value if they unify in the state (2)', function() {
    expect(eq('banana', vu)(smap({})).toArray()).to.eql([{'u': 'banana'}]);
  });

  it('may extend the map when the terms unify', function() {
    expect(eq(vu, 'banana')(smap({'z': 'squirrels'})).toArray()).to.eql([{'u': 'banana', 'z': 'squirrels'}]);
  });

  it('returns empty if the terms cannot be unified', function() {
    expect(eq(vu, 'banana')(smap({'u': 'mango'})).toArray()).to.eql([]);
  });

  it('can unify inside a list (1)', function() {
    const a = Stream.fromArray([lvar.of('x'), 2, 3]);
    const b = Stream.fromArray(['banana', 2, 3]);
    expect(eq(a, b)(smap({})).toArray()).to.eql([{x: 'banana'}]);
  });

  it('can unify inside a list (2)', function() {
    const a = Stream.fromArray([1, lvar.of('x'), 3]);
    const b = Stream.fromArray([1, 'banana', 3]);
    expect(eq(a, b)(smap({})).toArray()).to.eql([{x: 'banana'}]);
  });

  it('can unify inside a list (3)', function() {
    const a = Stream.fromArray([1, 2, lvar.of('x')]);
    const b = Stream.fromArray([1, 2, 'banana']);
    expect(eq(a, b)(smap({})).toArray()).to.eql([{x: 'banana'}]);
  });
  
  it('can unify two variables inside a list', function() {
    const a = Stream.fromArray([1, lvar.of('x'), 3, lvar.of('y'), 5]);
    const b = Stream.fromArray([1, 2, 3, 4, 5]);
    expect(eq(a, b)(smap({})).toArray()).to.eql([{x: 2, y: 4}]);
  });

  it('can fail to unify inside a list', function() {
    const a = Stream.fromArray([1, 2, lvar.of('x')]);
    const b = Stream.fromArray(['cherry', 'grape', 'banana']);
    expect(eq(a, b)(smap({})).toArray()).to.eql([]);
  });
});
