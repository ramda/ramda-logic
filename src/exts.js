import { merge } from 'ramda';
import smap from './smap';

// the ext-s operator extends the substitution
// with a new binding. 
// When extending the substitution,
// the first argument is always a variable, and the second is
// an arbitrary term. In Friedman et. al [4], ext-s performs a
// check for circularities in the substitution; here there is no
// such prohibition.
// (define (ext- s x v s) `((, x . , v) . , s))
export default function exts(x, v, s) {
  return smap(merge(s, {[x.name]: v}));
}
