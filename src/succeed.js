import Stream from './stream';

export default function succeed(x) {
  return Stream.of(x);
}
