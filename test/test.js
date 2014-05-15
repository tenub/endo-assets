var assert = require('assert'),
	Helper = require('../src/js/helper.js').Helper;
describe('helper', function() {
	describe('#parseValue', function() {
		it('should return number of minutes for a properly formatted string', function() {
			assert.equal(1501, (new Helper()).parseValue('-1d 1h 1m', 'when'));
			assert.equal(1500, (new Helper()).parseValue('-1d1h', 'when'));
			assert.equal(1, (new Helper()).parseValue('-1m', 'when'));
			assert.equal(false, (new Helper()).parseValue('-1m 1d', 'when'));
			assert.equal(false, (new Helper()).parseValue('-60m', 'when'));
			assert.equal(false, (new Helper()).parseValue('-24h', 'when'));
		});
	});
});