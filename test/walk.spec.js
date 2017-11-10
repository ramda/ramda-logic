import { expect } from 'chai';
import lvar from '../src/lvar';
import smap from '../src/smap';
import walk from '../src/walk';

describe('walk', function() {
  const s = smap({0: lvar.of(1), 1: 'banana'});
  it('returns a non-logic-variable argument', function() {
    expect(walk('mango', s)).to.eql('mango');
  });

  it('returns the binding for a logic variable', function() {
    expect(walk(lvar.of(1), s)).to.eql('banana');
    expect(walk(lvar.of(0), s)).to.eql('banana');
  });

  it('returns a logic variable if it is not in the s-map', function() {
    const walked = walk(lvar.of('x'), smap({}));
    expect(lvar.isLvar(walked)).to.equal(true);
    expect(lvar.equals(walked, lvar.of('x'))).to.equal(true);
  });

  it('recursively looks up a value through logic variables', function() {
    const s = smap({'x': lvar.of('y'), 'y': lvar.of('z'), 'z': lvar.of('a'), 'a': 'VALUE'});
    expect(walk(lvar.of('a'), s)).to.equal('VALUE');
    expect(walk(lvar.of('z'), s)).to.equal('VALUE');
    expect(walk(lvar.of('y'), s)).to.equal('VALUE');
    expect(walk(lvar.of('x'), s)).to.equal('VALUE');
  });
});
