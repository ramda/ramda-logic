import { equals } from 'ramda';
import Type from 'union-type';
import exts from './exts';
import lvar from './lvar';
import { isStream } from './stream';
import walk from './walk';

export const Unified = Type({
  OK: [Object],
  FAIL: []
});

const OK = Unified.OK;
const FAIL = Unified.FAIL;



export default function unify(l, r, s) {
  // To unify two terms in a substitution, both are walked in that substitution.
  const u = walk(l, s);
  const v = walk(r, s);

  // If the two terms walk to the same variable, the substitution is returned unchanged.
  if (lvar.equals(u, v)) {
    return OK(s);
  }

  // when one of the two terms walks to a variable, the substitution is extended,
  // binding the variable to which that term walks with the value to which the other 
  // term walks.
  if (lvar.isLvar(u)) {
    return OK(exts(u, v, s));
  } 
  if (lvar.isLvar(v)) {
    return OK(exts(v, u, s));
  }

  // If both terms walk to pairs, the cars and cdrs are unified recursively,
  // succeeding if unification succeeds in the one and then the other.
  if (isStream(u) && isStream(v)) {
    if (u.isEmpty() && v.isEmpty()) {
      return OK(s);
    } else if (!u.isEmpty() && !v.isEmpty()) {
      const s1 = unify(u.head(), v.head(), s);
      return Unified.case({
        FAIL: () => FAIL,
        OK: subs => unify(u.tail(), v.tail(), subs)
      }, s1);
    }
    return FAIL;    
  }
  
  // non-variable, non-pair terms unify if they are identical under `eqv?`
  if (equals(u, v)) {
    return OK(s);
  }

  // unification fails otherwise.
  return FAIL;
}
