// logic variables are modeled as vectors that hold the variable index
// (define (var c) (vector c))

// Variable equality is determined by coincidence of indices in vectors.
// (define (var=? x1 x2 ) (= (vector-ref x1 0) (vector-ref x2 0)))

const of = name => Object.freeze({ name: name, isLvar: true });
const equals = (t1, t2) => t1.isLvar && t2.isLvar && t1.name === t2.name;
const isLvar = v => v.isLvar === true;
const toString = v => `LVar(${v.name})`;

export default { of, equals, isLvar, toString };
