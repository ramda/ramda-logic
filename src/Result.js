// Result = Stream | Empty

function Result() {}

function Stream() {}
Stream.prototype = Object.create(Result.prototype);
Stream.prototype.constructor = Stream;

function Empty() {}
Empty.prototype = Object.create(Result.prototype);
Empty.prototype.constructor = Empty;
var _empty = new Empty();

Result.Stream = function(x) {
  return new Stream(x);
};
Result.Empty = function() {
  return _empty;
};

module.exports = Result;
