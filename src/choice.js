import eq from './eq';
import fail from './fail';
import disj from './disj';

// We can build more complex goals using lambda-abstractions and previously
// defined combinators, conj and disj.
// For example, we can define the function `choice' such that
// (choice t1 a-list) is a goal that succeeds if t1 is an element of a-list.
export default function choice(v, strm) {
  return strm.isEmpty()
    ? fail
    : disj(eq(v, strm.head()), choice(v, strm.tail()));
}