var R = require('ramda');
var merge = R.merge;

// logic variables are modeled as vectors that hold the variable index
// (define (var c) (vector c))

// Variable equality is determined by coincidence of indices in vectors.
// (define (var=? x1 x2 ) (= (vector-ref x1 0) (vector-ref x2 0)))
function equals(t1, t2) {
  return lvar.is(t2) && t1.name === t2.name;
}
function _equals(that) {
  return equals(this, that);
}
function toString() {
  return "LogicVariable('" + this.name + "')";
}

function lvar(name) {
  return Object.freeze({
    name: name,
    isLvar: true,
    equals: _equals,
    toString: toString
  });
}

// (define (var? x) (vector? x))
lvar.is = function(x) {
  return x != null && !!x.isLvar;
};

lvar.equals = equals;

module.exports = lvar;
