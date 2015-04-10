var R = require('ramda');
var lvar = require('./lvar');
var walk = require('./walk');

var isArrayLike = R.isArrayLike;
var head = R.head;
var tail = R.tail;
var prepend = R.prepend;

function _unify(u, v, s) {
  var u = walk(u, s);
  var v = walk(v, s);

  if (lvar.is(u) && lvar.is(v)) {
    return s;
  } 
  if (lvar.is(u)) {
    return extendS(u, v, s);
  } 
  if (lvar.is(v)) {
    return extendS(v, u, s);
  } 
  if (u && typeof u.equals === 'function' && u.equals(v)) {
    return s;
  }
  if (isArrayLike(u) && isArrayLike(v)) {
    var s = _unify(head(u), head(v), s);
    // TODO: rewrite this non-recursively:
    return s && _unify(tail(u), tail(v), s);
  }
  return false;
}

// unify :: LVar -> LVar -> ([Subs] -> Subs)
module.exports = function unify(u, v) {
  return function(subs) {
    var s = _unify(u, v, head(subs));
    return s ? prepend(s, tail(subs)) : [];
  };
};
