var merge = require('ramda').merge;

module.exports = function smap(bindings) {
  return merge({}, bindings);
};
