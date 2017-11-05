import Type from 'union-type';


// `tail` function must be return a Stream type, but no way to enforce that without evaluating it :-(
const Stream = Type({
  Empty: [],
  Cons:  [() => true, Function]
});

Stream.prototype = Object.freeze({
  chain: function(f) {
    return Stream.case({
      Empty: ()           => Stream.Empty,
      Cons:  (head, tail) => f(head).concat(tail().chain(f))
    }, this);
  },

  concat: function(s) {
    return Stream.case({
      Empty: ()           => s,
      Cons:  (head, tail) => Stream.Cons(head, () => tail().concat(s))
    }, this);
  },

  head: function() {
    return Stream.case({
      Empty: ()        => Stream.Empty,
      Cons:  (head, _) => head
    }, this);
  },

  isEmpty: function() {
    return Stream.case({
      Empty: () => true,
      Cons:  () => false
    }, this);
  },

  isStream: () => true,

  map: function(f) {
    return Stream.case({
      Empty: ()           => Stream.Empty,
      Cons:  (head, tail) => Stream.Cons(f(head), () => tail().map(f))
    }, this);
  },

  tail: function() {
    return Stream.case({
      Empty: ()        => Stream.Empty,
      Cons:  (_, tail) => tail()
    }, this);
  },

  toArray: function() {
    return Stream.case({
      Empty: ()           => [],
      Cons:  (head, tail) => [head].concat(tail().toArray())
    }, this);
  },

  toString: function() {
    return Stream.case({
      Empty: () => 'Empty',
      Cons: (head, tail) => `Cons(${head}, ${tail().toString()})`
    }, this);
  }
});

Stream.empty = () => Stream.Empty;

Stream.fromArray = xs => xs.reduceRight((acc, x) => Stream.Cons(x, () => acc), Stream.Empty);

Stream.isStream = s => s && s.isStream === Stream.prototype.isStream && s.isStream();

Stream.of = x => Stream.Cons(x, () => Stream.Empty);

export default Stream;