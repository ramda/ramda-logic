import { of as stream } from './stream';

export default function succeed(x) {
  return stream(x);
}
