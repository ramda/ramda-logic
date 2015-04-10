function _Empty() {}

var _empty = new _Empty();

var substitutions = {
  empty: function() { return _empty; }
};

module.exports = substitutions;
