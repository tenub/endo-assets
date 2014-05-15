var assert = require('assert'),
	Helper = require('../src/js/helper.js').Helper;
describe('helper', function() {
	describe('#parseValue', function() {
		it('should return number of minutes for a properly formatted string', function() {
			var h = new Helper();
			assert.equal(1501,	h.parseValue('-1d 1h 1m',	'when'));
			assert.equal(1500,	h.parseValue('-1d1h',		'when'));
			assert.equal(1,		h.parseValue('-1m',			'when'));
			assert.equal(false,	h.parseValue('-1m 1d',		'when'));
			assert.equal(false,	h.parseValue('-60m',		'when'));
			assert.equal(false,	h.parseValue('-24h',		'when'));
		});
	});
});