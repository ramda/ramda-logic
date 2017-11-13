import { expect } from 'chai';

import appendo from '../src/appendo';
import lvar from '../src/lvar';
import run from '../src/run';
import { of as stream, empty } from '../src/stream';


describe('appendo', () => {
  const vq = lvar.of('q');

  it('binds appending lists', () => {
    const xs = run(appendo(stream(1), stream(2), vq));
    const { h, t, l3p, q } = xs.head();

    // The logic variable `vq` binds the name `q` to a pair of logic variables:
    //    `q.head()` -> xs.head().h
    //    `q.tail()` -> xs.head().l3p
    // those two variables (`h` and `l3p`) are bound to 1 and `cons(2, empty)` resp.
    // so, indirectly via the returned bindings, `vq` is bound to the stream [1, 2]
    expect(h).to.eql(1);
    expect(t).to.eql(empty());
    expect(l3p.toString()).to.eql('Cons(2, Empty)');

    expect(lvar.equals(q.head(), lvar.of('h'))).to.be.true;
    expect(lvar.equals(q.tail(), lvar.of('l3p'))).to.be.true;

    // so you can look up the bindings like so:
    expect(xs.head()[q.head().name]).to.equal(1);
    expect(xs.head()[q.tail().name].toString()).to.eql('Cons(2, Empty)');
  });
});