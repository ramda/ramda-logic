var lvar = require('./lvar');

// The walk operator searches for a variable's value in the substitution.
// When a non-variable term is walked, the term itself is returned.
// (define (walk u s)
//  (let ((pr (and (var? u) (assp (λ (v) (var=? u v)) s))))
//   (if pr (walk (cdr pr) s) u)))
module.exports = function walk(u, s) {
  return (lvar.is(u) && find(function(v) { return u.equals(v); }, s)) ? s : walk(u, tail(s));
};
