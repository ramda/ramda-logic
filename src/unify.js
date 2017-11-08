import { equals } from 'ramda';
import exts from './exts';
import fail from './fail';
import lvar from './lvar';
import Stream from './stream';
import succeed from './succeed';
import walk from './walk';

const FAILURE = Object.freeze({});

function _unify(l, r, s) {
  // To unify two terms in a substitution, both are walked in that substitution.
  const u = walk(l, s);
  const v = walk(r, s);

  // If the two terms walk to the same variable, the substitution is returned unchanged.
  if (lvar.equals(u, v)) {
    return s;
  }

  // when one of the two terms walks to a variable, the substitution is extended,
  // binding the variable to which that term walks with the value to which the other 
  // term walks.
  if (lvar.isLvar(u)) {
    return exts(u, v, s);
  } 
  if (lvar.isLvar(v)) {
    return exts(v, u, s);
  }

  // If both terms walk to pairs, the cars and cdrs are unified recursively,
  // succeeding if unification succeeds in the one and then the other.
  if (Stream.isStream(u) && Stream.isStream(v)) {
    if (u.isEmpty() && v.isEmpty()) {
      return s;
    } else if (!u.isEmpty() && !v.isEmpty()) {
      const s1 = _unify(u.head(), v.head(), s);
      return s1 === FAILURE ? FAILURE : _unify(u.tail(), v.tail(), s1);
    } else {
      return FAILURE;
    }
  }
  
  // non-variable, non-pair terms unify if they are identical under `eqv?`
  if (equals(u, v)) {
    return s;
  }

  // unification fails otherwise.
  return FAILURE;
}


// `unify` takes two terms as arguments and returns a goal that
// succeeds if the two terms unify in the received state.
// If they unify, a substitution, possibly extended, is returned.
export default function unify(u, v) {
  return s => {
    const state = _unify(u, v, s);
    return state === FAILURE ? fail(state) : succeed(state);
  };
}

