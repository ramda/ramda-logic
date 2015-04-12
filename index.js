(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['conj', 'disj', 'fresh', 'unify'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory(
      require('./src/conj'), 
      require('./src/disj'), 
      require('./src/fresh'), 
      require('./src/unify')
    );
  } else {
    // Browser globals (root is window)
    root.returnExports = factory(
      root.conj, 
      root.disj, 
      root.fresh, 
      root.unify
    );
  }
}(this, function (conj, disj, fresh, unify) {
  return {
    conj: conj,
    disj: disj,
    fresh: fresh,
    unify: unify
  };
}));
