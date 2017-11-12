import { expect } from 'chai';

import choice from '../src/choice';
import conj from '../src/conj';
import fail from '../src/fail';
import lvar from '../src/lvar';
import run from '../src/run';
import { fromArray } from '../src/stream';
import succeed from '../src/succeed';

describe('choice', () => {

  const s123 = fromArray([1, 2, 3]);

  it('succeeds if it finds an element in a list', () => {
    const s = run(choice(2, s123));
    expect(s.head()).to.eql(succeed({}).head());
  });

  it('succeeds if it doesn\'t find an element in a list', () => {
    const f = run(choice(10, s123));
    expect(f).to.eql(fail());
  });

  it('may have multiple bindings if a logic variable can be repeatedly bound', () => {
    const vx = lvar.of('x');
    const xs = run(choice(vx, s123));

    // there are three possible bindings for `vx`: 1, 2, or 3
    expect(xs.head()).to.eql(succeed({x: 1}).head());
    expect(xs.drop(1).head()).to.eql(succeed({x: 2}).head());
    expect(xs.drop(2).head()).to.eql(succeed({x: 3}).head());
  });

  describe('finding common list elements', () => {
    const s123 = fromArray([1, 2, 3]);
    const s345 = fromArray([3, 4, 5]);
    const s3417 = fromArray([3, 4, 1, 7]);
    const s1347 = fromArray([13, 4, 7]);

    const commonEl = lv => (l1, l2) => conj(
      choice(lv, l1),
      choice(lv, l2)
    );

    it('succeeds if it can find a common element in two lists', () => {
      const common = commonEl(lvar.of('x'));
      const xs = run(common(s123, s345));

      expect(xs.head()).to.eql(succeed({x: 3}).head());
      expect(xs.toArray()).to.eql([{x: 3}]);
    });

    it('may succeed with more than one binding', () => {
      const common = commonEl(lvar.of('x'));
      const xs = run(common(s345, s3417));

      expect(xs.head()).to.eql(succeed({x: 3}).head());
      expect(xs.tail().head()).to.eql(succeed({x: 4}).head());
      expect(xs.toArray()).to.eql([{x: 3}, {x: 4}]);
    });

    it('fails if it finds no common elements', () => {
      const common = commonEl(lvar.of('x'));
      const xs = run(common(s123, s1347));
      expect(xs).to.eql(fail());
    });

  });
});