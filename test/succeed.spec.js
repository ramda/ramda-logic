import { expect } from 'chai';
import { isStream } from '../src/stream';
import succeed from '../src/succeed';


describe('succeed', function() {
  it('wraps a number in a stream', function() {
    expect(isStream(succeed(1))).to.equal(true);
    expect(succeed(1).toArray()).to.eql([1]);
  });

  it('wraps an array in a stream', function() {
    expect(isStream(succeed([1]))).to.equal(true);
    expect(succeed([1]).toArray()).to.eql([[1]]);
  });

  it('wraps an object in a stream', function() {
    expect(isStream(succeed({}))).to.equal(true);
    expect(succeed({}).toArray()).to.eql([{}]);
  });

  it('wraps a string in a stream', function() {
    expect(isStream(succeed('abc'))).to.equal(true);
    expect(succeed('abc').toArray()).to.eql(['abc']);
  });

  it('wraps a boolean in a stream', function() {
    expect(isStream(succeed(true))).to.equal(true);
    expect(succeed(true).toArray()).to.eql([true]);
  });
});
