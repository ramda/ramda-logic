var h = require('highland');
var stream = require('./stream');


module.exports = function succeed(x) {
  return h([x]);
};
