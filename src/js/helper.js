(function(exports) {

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

					var perc = val.match(/\s+(\d{2,3}\.\d{2})%$/m);

					if (val.indexOf('usc') !== -1)
						val = 100;
					else if (!perc)
						val = 0;
					else
						val = parseFloat(perc[1], 10);

					break;

				case 'when':

					// /^(?=\S)-(?:[1-9][0-9]*d)?(?:(?:^| )(?:1[0-9]?|[3-9]|2[0-3]?)h)?(?:(?:^| )(?:[1-5][0-9]?|[6-9])m)?$/
					var f = /-?(?:\d+[dhm] ?){1,3}/.test(val);

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

					val = val.replace(/\D/g, '');

					break;

			}

			return val;

		};

		/**
		 *	Update the contents of a selector element on an interval with server information
		 *
		 *	@param		{string}	selector		selector as string
		 *	@param		{integer}	interval		interval in ms
		 */
		this.gsInfo = function(selector, interval) {

			setInterval(function() {

				$.get('http://dev.kz-endo.com/servers', function(data) {

					$(selector).html(data);

				});

			}, interval);

		};

		/**
		 *	Confirm call to delete from records database
		 *
		 *	@param		{string}	message
		 *	@return		{boolean}	confirmation
		 */
		this.confirmDelete = function(message) {

			return window.confirm(message);

		};

	}

	exports.Helper = Helper;

})(this);