var Portfolio = require('../portfolio');
var assert = require ('chai').assert;

describe('Portfolio', function(){

  it("has an empty array for shares to be added", function(){
    var portfolio = new Portfolio()
    assert.deepEqual([], portfolio.shares)
  }),




})