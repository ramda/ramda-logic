import { apply, compose, pipe, filter, map, split, nth, match, keys } from 'ramda';
import lvar from './lvar';

const rx = /^_\.(\d+)/;
const prefix = '_.';
const maxK = pipe(
  filter(match(rx)),
  map(compose(parseInt, nth(1), split('.'))),
  apply(Math.max)
);

const getNext = s => {
  const next = maxK(keys(s));
  return next === -Infinity ? prefix + '0' : prefix + (next + 1);
};

// The call/fresh goal constructor creates a fresh (new) logic variable.
// call/fresh's sole argument is a unary function whose binding variable is
// a fresh logic variable and whose body is an expression over which the
// fresh variable's binding is being scoped and which evaluates to a goal.
// (define (call/fresh f )
//   (λg (s/c)
//     (let ((c (cdr s/c)))
//       ((f (var c)) `( ,(car s/c) . ,(+ c 1))))))
export default function fresh(goalFn) {
  return s => {
    const goal = goalFn(lvar.of(getNext(s)));
    return goal(s);
  };
}
