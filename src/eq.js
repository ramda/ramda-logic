import fail from './fail';
import succeed from './succeed';
import unify, { Unified } from './unify';

// `eq` takes two terms as arguments and returns a goal that
// succeeds if the two terms unify in the received state.
// If they unify, a substitution, possibly extended, is returned.
export default function eq(u, v) {
  return s => {
    return Unified.case({
      FAIL: fail,
      OK:   succeed
    }, unify(u, v, s));
  };
}