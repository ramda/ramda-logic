var R = require('ramda');
var lvar = require('./lvar');

var rx = /^_\.(\d+)/;
var prefix = '_.';
var maxK = R.pipe(
    R.filter(R.match(rx)), 
    R.map(R.split('.')), 
    R.map(R.nth(1)),
    R.map(parseInt),
    R.max);

function getNext(s) {
  var next = maxK(R.keys(s));
  return next === -Infinity ? prefix + '0' : prefix + (next + 1);
}

// The call/fresh goal constructor creates a fresh (new) logic variable.
// call/fresh's sole argument is a unary function whose binding variable is
// a fresh logic variable and whose body is an expression over which the
// fresh variable's binding is being scoped and which evaluates to a goal.
// (define (call/fresh f )
//   (λg (s/c)
//     (let ((c (cdr s/c)))
//       ((f (var c)) `( ,(car s/c) . ,(+ c 1))))))
module.exports = function fresh(goalFn) {
  return function(s) {
    var nextVar = getNext(s);
    var goal = goalFn(lvar(getNext(s)));
    return goal(s);
  };
};
