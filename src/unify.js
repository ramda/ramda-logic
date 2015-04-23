var R = require('ramda');
var exts = require('./exts');
var fail = require('./fail');
var lvar = require('./lvar');
var succeed = require('./succeed');
var walk = require('./walk');

var eqDeep = R.eqDeep;
var head = R.head;
var isArrayLike = R.isArrayLike;
var tail = R.tail;

function _unify(l, r, s) {
  // To unify two terms in a substitution, both are walked in that substitution.
  var u = walk(l, s);
  var v = walk(r, s);

  // If the two terms walk to the same variable, the substitution is returned unchanged.
  if (lvar.is(u) && u.equals(v)) {
    return s;
  } 
  // when one of the two terms walks to a variable, the substitution is extended,
  // binding the variable to which that term walks with the value to which the other 
  // term walks.
  if (lvar.is(u)) {
    return exts(u, v, s);
  } 
  if (lvar.is(v)) {
    return exts(v, u, s);
  }

  // If both terms walk to pairs, the cars and cdrs are unified recursively,
  // succeeding if unification succeeds in the one and then the other.
  if (isArrayLike(u) && isArrayLike(v)) {
    var s1;
    if (u.length > 0 && v.length > 0) {
      s1 = _unify(head(u), head(v), s);
      return s1 ? _unify(tail(u), tail(v), s1) : s1;
    }
  }
  
  // non-variable, non-pair terms unify if they are identical under `eqv?`
  if (eqDeep(u, v)) {
    return s;
  }
  // unification fails otherwise.
  return null;
}


// `unify` takes two terms as arguments and returns a goal that
// succeeds if the two terms unify in the received state.
// If they unify, a substitution, possibly extended, is returned.
module.exports = function unify(u, v) {
  return function _unify_goal(s) {
    var state = _unify(u, v, s);
    return state === null ? fail(state) : succeed(state); 
  };
};
