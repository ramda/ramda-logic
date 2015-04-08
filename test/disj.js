var expect = require('chai').expect;
var disj = require('../src/disj');
var succeed = require('../src/succeed');
var fail = require('../src/fail');

describe('disj', function() {
  var bothSucceed = disj(succeed, succeed);
  var firstSucceed = disj(succeed, fail);
  var secondSucceed = disj(fail, succeed);
  var neitherSucceed = disj(fail, fail);

  it('returns all the results of f1 and all the results of f2.', function() {
    expect(bothSucceed(10)).to.eql([10, 10]);
    expect(firstSucceed(10)).to.eql([10]);
    expect(secondSucceed(10)).to.eql([10]);
  });

  it('it returns empty if neither goal suceeded', function() {
    expect(neitherSucceed(10)).to.eql([]);
  });


});
