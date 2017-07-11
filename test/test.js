/*
 * test.js
 * Unit test with mocha.
 *
 */
require('mocha-sinon');
var expects = require('expect.js');

describe('Basic test example.', function() {
  beforeEach(function() {
    this.sinon.stub(console, 'log');
  });

  describe('simple test examples', function() {
    it('will support expect.js', function() {
      expects(1).to.be(1);
      expects(NaN).not.to.equal(NaN);
      expects(1).not.to.be(true);
      expects('1').to.not.be(1);
    });

    it('expects a failure', function() {
      //Sexpects(true).to.be(false);
    });

    it('expects more tests in future.');
  });
});
