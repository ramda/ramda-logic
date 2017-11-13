import conj from './conj';
import conso from './conso';
import disj from './disj';
import eq from './eq';
import lvar from './lvar';
import { empty } from './stream';

export default function appendo(l1, l2, l3) {
  const h =  lvar.of('h');
  const t = lvar.of('t');
  const l3p = lvar.of('l3p');

  return disj(
    conj(eq(l1, empty()), eq(l2, l3)),
    conj(
      conso(h, t, l1),
      s => conj(
        conso(h, l3p, l3),
        ss => appendo(t, l2, l3p)(ss)
      )(s)
    )
  );
}