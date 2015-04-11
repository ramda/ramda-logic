var tail = require('ramda').tail;
var lvar = require('./lvar');

// The walk operator searches for a variable's value in the substitution.
// When a non-variable term is walked, the term itself is returned.
// (define (walk u s)
//  (let ((pr (and (var? u) (assp (λ (v) (var=? u v)) s))))
//   (if pr (walk (cdr pr) s) u)))
module.exports = function walk(lv, s) {
  return !lvar.is(lv) || s[lv.name] == null ? lv : walk(s[lv.name], s);
};
