module.exports = function eqHelper(a, b, options) {
  return a === b ? options.fn(this) : options.inverse(this);
};