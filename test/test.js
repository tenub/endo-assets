var assert = require('assert'),
	//should = require('chai').should(),
	Helper = require('../src/js/helper.js').Helper;
describe('helper', function() {
	var h = new Helper();
	describe('#parseValue', function() {
		it('should return number of minutes for a properly formatted string', function() {
			assert.equal(1501, h.parseValue('-1d 1h 1m', 'when'));
			assert.equal(1441, h.parseValue('1d 1m', 'when'));
			assert.equal(1, h.parseValue('-1m', 'when'));
			assert.equal(false, h.parseValue('100', 'when'));
		});
	});
	/*describe('#gsInfo', function() {
		it('should set an interval to return an html string into a DOM element', function() {
			return h.gsInfo('test', 1000).should.be.fulfilled;
		});
	});*/
});