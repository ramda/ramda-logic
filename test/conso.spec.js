import { expect } from 'chai';

import conso from '../src/conso';
import lvar from '../src/lvar';
import run from '../src/run';
import { fromArray } from '../src/stream';

describe('conso', () => {

  it('can unify a head and tail a logic variable representing a list', () => {
    const xs = run(conso(1, fromArray([2, 3]), lvar.of('x')));
    const xBinding = xs.head().x; // success stream, first value bound to `x`

    expect(xBinding.toArray()).to.eql([1, 2, 3]);
  });


  it('can unify head and tail logic variables with a list', () => {
    const xs = run(conso(lvar.of('head'), lvar.of('tail'), fromArray([1, 2, 3])));
    const headBinding = xs.head().head; // first value bound to `head`
    const tailBinding = xs.head().tail; // first value bound to `tail`

    expect(headBinding).to.eql(1);
    expect(tailBinding.toArray()).to.eql([2, 3]);

    // That looks now like 'cons' in reverse. The answer means that
    // if we replace `lvar.of('head')` with 1 and `lvar.of('tail')` with (2 3), then
    // (cons vx vy) will be the same as '(1 2 3)
  });

});