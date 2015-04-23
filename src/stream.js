
function isEmpty(x) {
  return x == null || x.length === 0;
}

function isFunction(x) {
  return typeof x === 'function';
}

function Stream(x, xs) {
  this.head = x;
  this.tail = xs;
}
Stream.prototype.concat = function(ys) {
  return new Stream(this.head, this.tail.concat(ys.tail));
};
Stream.prototype.map = function(f) {
  return new Stream(f(this.head), map(f, this.tail));
};
Stream.prototype.chain = function(g) {
  return new Stream(g(this.xs));
};
Stream.prototype.empty = function() {
  return _empty;
};
Stream.prototype.of = function(x) {
  return new Stream(x, _empty);
};
Stream.of = function(x) {
  return isFunction(x) ? new Immature(x, _empty) : Stream.prototype.of;
};

function Empty() {}
Empty.prototype = Object(Stream.prototype);
Empty.prototype.constructor = Stream;
var _empty = new Empty();

function Immature(fn) {
  this.xs = fn;
}
Immature.prototype = Object.create(Stream.prototype);
Immature.prototype.constructor = Immature;
Immature.prototype.concat = function(ys) {
  var s = this;
  return new Immature(function(ys) {
    return new Stream(s.xs().concat(ys.tail));
  });
};
Immature.prototype.chain = function(g) {
  return new Stream(g(this.xs()));
};

module.exports = function stream(x) {
  if (isEmpty(x)) {
    return _empty;
  }
  if (isFunction(x)) {
    return new Immature(x, _empty);
  }
  return new Stream(x, _empty);
};
