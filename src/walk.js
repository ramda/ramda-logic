import lvar from './lvar';

// The walk operator searches for a variable's value in the substitution.
// When a non-variable term is walked, the term itself is returned.
// (define (walk u s)
//  (let ((pr (and (var? u) (assp (λ (v) (var=? u v)) s))))
//   (if pr (walk (cdr pr) s) u)))
export default function walk(term, s) {
  return lvar.isLvar(term) && term.name in s ?
    walk(s[term.name], s) :
    term;
}
