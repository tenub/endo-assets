(function(exports) {

	'use strict';

	function Helper(opts) {

		this.opts = opts || {};

		/**
		 *	Directly modify DOM elements to sort nth column of tbl ascending or descending determined by o
		 *
		 *	@param		{object}	tbl		html table node containing data to sort
		 *	@param		{integer}	n		which column to sort on
		 *	@param		{boolean}	o		determines sort direction
		 */
		this.sortTable = function(tbl, n, o) {

			var i, l, store = [], tbody = tbl.tBodies[0];

			for (i=0, l=tbody.rows.length; i<l; i++) {

				var row = tbody.rows[i],
					text = (row.cells[n].textContent || row.cells[n].innerText).toLowerCase(),
					val = this.parseValue(text, row.cells[n].className);

				store.push([val, row]);

			}

			if (o === true) {

				store.sort(function(a, b) {

					if (isNaN(a[0]) && isNaN(b[0])) {

						if (a[0] < b[0])
							return -1;

						if (a[0] > b[0])
							return 1;

						return 0;

					} else {

						return a[0] - b[0];

					}

				});

			} else {

				store.sort(function(a, b) {

					if (isNaN(a[0]) && isNaN(b[0])) {

						if (a[0] < b[0])
							return 1;

						if (a[0] > b[0])
							return -1;

						return 0;

					} else {

						return b[0] - a[0];

					}

				});

			}

			for (i=0, l=store.length; i<l; i++)
				tbody.appendChild(store[i][1]);

			store = null;
			
		};

		/**
		 *	Parse a value based on its type and return a sortable version of the original value
		 *
		 *	@param		{string}	val		input value
		 *	@param		{string}	type	type of input value
		 *	@returns	{mixed}		sortable value corresponding to the input value
		 */
		this.parseValue = function(val, type) {

			switch (type) {

				case 'avg-rank':

					if (val === 'n/a')
						val = 9999;

					break;

				case 'performance':

					var perc = val.match(/\s+(\d{2,3}\.\d{2})%$/);

					if (val.indexOf('usc') !== -1)
						val = 100;
					else if (!perc)
						val = 0;
					else
						val = parseFloat(perc[1], 10);

					break;

				case 'when':

					var f = /(?=.)^-(?:(?:[1-9][0-9]*)d\s?)?(?:(?:[1-9]|1[0-9]|2[0-3])h\s?)?(?:(?:[1-9]|[1-5][0-9])m)?$/.test(val);

					if (f) {

						var d = val.match(/\d+(?=d)/),
							h = val.match(/\d+(?=h)/),
							m = val.match(/\d+(?=m)/);

						if (m)
							m = parseInt(m, 10);
						if (h)
							m += parseInt(h, 10) * 60;
						if (d)
							m += parseInt(d, 10) * 1440;

						val = m;

					} else {

						val = false;

					}

					break;

				default:

					break;

			}

			return val;

		};
	
	}

	exports.Helper = Helper;

})(this);