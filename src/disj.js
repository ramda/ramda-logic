export default function disj(f1, f2) {
  return x => f1(x).concat(f2(x));
}
