var tail = require('ramda').tail;
var lvar = require('./lvar');

// The walk operator searches for a variable's value in the substitution.
// When a non-variable term is walked, the term itself is returned.
// (define (walk u s)
//  (let ((pr (and (var? u) (assf (λ (v) (var=? u v)) s))))
//   (if pr (walk (cdr pr) s) u)))
module.exports = function walk(u, s) {
  var pr = (lvar.is(u) && find(function(v) { return u.equals(v); }, s));
  return pr ? walk(u, tail(s)) : s;
};
