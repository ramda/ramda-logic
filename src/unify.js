var R = require('ramda');
var substitutions = require('./substitutions');

var head = R.head;
var tail = R.tail;
var prepend = R.prepend;

function _unify(u, v, s) {
  var u = walk(u s);
  var v = walk(v s);

  if (isLvar(u) && isLVar(v)) {
    return s;
  } 
  if (isLVar(u)) {
    return extendS(u, v, s);
  } 
  if (isLVar(v)) {
    return extendS(v, u, s);
  } 
  if (typeof u.equals === 'function' && u.equals(v)) {
    return s;
  }
  if (isArrayLike(u) && isArrayLike(v)) {
    var 
  }

          47         ((and (pair? u) (pair? v))
             48           (let ((s (unify (car u) (car v) s)))
                49             (and s (unify (cdr u) (cdr v) s))))
}

// unify :: LVar -> LVar -> ([Subs] -> Subs)
module.exports = function unify(u, v) {
  return function(subs) {
    var s = _unify(u, v, head(subs));
    return s ? prepend(s, tail(subs)) : substitutions.empty();
  };
};
