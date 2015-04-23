(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['conj', 'disj', 'fail', 'fresh', 'succeed', 'unify'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory(
      require('./src/conj'), 
      require('./src/disj'), 
      require('./src/fail'), 
      require('./src/fresh'), 
      require('./src/succeed'), 
      require('./src/unify')
    );
  } else {
    // Browser globals (root is window)
    root.returnExports = factory(
      root.conj, 
      root.disj, 
      root.fail, 
      root.fresh, 
      root.succeed, 
      root.unify
    );
  }
}(this, function (conj, disj, fail, fresh, succeed, unify) {
  return {
    conj: conj,
    disj: disj,
    fail: fail,
    fresh: fresh,
    succeed: succeed,
    unify: unify
  };
}));
