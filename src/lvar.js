// logic variables are modeled as vectors that hold the variable index
// (define (var c) (vector c))
LVar = function(name) {
  this.name = name;
};

LVar.prototype.isLvar = true;

// Variable equality is determined by coincidence of indices in vectors.
// (define (var=? x1 x2 ) (= (vector-ref x1 0) (vector-ref x2 0)))
LVar.prototype.equals = function(that) {
    return isLvar(that) && this.name === that.name;
};

function lvar(name) {
  return new LVar(name);
};

// (define (var? x) (vector? x))
lvar.is = function(x) {
  return x.isLVar;
};

module.exports = lvar;
