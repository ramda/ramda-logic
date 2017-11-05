import { merge } from 'ramda';

export default function smap(bindings) {
  return merge({}, bindings);
}
