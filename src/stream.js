import Type from 'union-type';


// `tail` function must be return a Stream type, but no way to enforce that without evaluating it :-(
const Stream = Type({
  Empty: [],
  Cons:  [() => true, Function]
});

Stream.prototype.chain = function(f) {
  return Stream.case({
    Empty: empty,
    Cons:  (head, tail) => f(head).concat(tail().chain(f))
  }, this);
};

Stream.prototype.concat = function(s) {
  return Stream.case({
    Empty: ()           => s,
    Cons:  (head, tail) => Stream.Cons(head, () => tail().concat(s))
  }, this);
};

Stream.prototype.drop = function(n) {
  return Stream.case({
    Empty: empty,
    Cons: (head, tail) => n < 1   ? Stream.Cons(head, tail) :
      n === 1 ? tail()
        : tail().drop(n - 1)
  }, this);
};

Stream.prototype.filter = function(p) {
  return Stream.case({
    Empty: empty,
    Cons: (head, tail) => p(head) ? Stream.Cons(head, () => tail().filter(p))
      : tail().filter(p)
  }, this);
};

Stream.prototype.head = function() {
  return Stream.case({
    Empty: empty,
    Cons:  (head, _) => head          // eslint-disable-line no-unused-vars
  }, this);
};

Stream.prototype.isEmpty = function() {
  return Stream.case({
    Empty: () => true,
    Cons:  () => false
  }, this);
};

Stream.prototype.isStream = () => true;

Stream.prototype.map = function(f) {
  return Stream.case({
    Empty: empty,
    Cons:  (head, tail) => Stream.Cons(f(head), () => tail().map(f))
  }, this);
};

Stream.prototype.tail = function() {
  return Stream.case({
    Empty: empty,
    Cons:  (_, tail) => tail()
  }, this);
};

Stream.prototype.take = function(n) {
  return Stream.case({
    Empty: empty,
    Cons: (head, tail) => n < 1 ? Stream.Empty
      : Stream.Cons(head, () => tail().take(n - 1))
  }, this);
};
Stream.prototype.toArray = function() {
  return Stream.case({
    Empty: ()           => [],
    Cons:  (head, tail) => [head].concat(tail().toArray())
  }, this);
};

Stream.prototype.toString = function() {
  return Stream.case({
    Empty: () => 'Empty',
    Cons: (head, tail) => `Cons(${head}, ${tail().toString()})`
  }, this);
};

export const empty = () => Stream.Empty;

export const fromArray = xs => xs.reduceRight((acc, x) => Stream.Cons(x, () => acc), Stream.Empty);

export const isStream = s => s && s.isStream === Stream.prototype.isStream && s.isStream(); // force to Bool

export const of = x => Stream.Cons(x, empty);

export const cons = (a, b) => Stream.Cons(a, () => b);

export default Stream;