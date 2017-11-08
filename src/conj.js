export default function conj(f1, f2) {
  return x => f1(x).chain(f2);
}

