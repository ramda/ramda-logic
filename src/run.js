//var runN = require('./runN');

//module.exports = runN(Infinity);
var smap = require('./smap');

module.exports = function run(goal) {
  return goal(smap({}));
};
