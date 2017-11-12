import eq from './eq';
import { cons } from './stream';

// (conso a b l) is a goal that succeeds if in the current state
// of the world, (cons a b) is the same as l.
// That may, at first, sound like the meaning of cons. However, the
// declarative formulation is more powerful, because a, b, or l might
// be logic variables.
// By running the goal which includes logic variables we are
// essentially asking the question what the state of the world should
// be so that (cons a b) could be the same as l.

// Terminology: (conso vx vy '(1 2 3)) is a goal (or, to be more precise,
// an expression that evaluates to a goal). By itself, 'conso'
// is a parameterized goal (or, abstraction over a goal):
// conso === (lambda (x y z) (conso x y z))
// We will call such an abstraction 'relation'.
export default function conso(a, b, ls) {
  return eq(cons(a, b), ls);
}