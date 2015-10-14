(function (exports) {
	function Helper () {
		/**
		 * Directly modify DOM elements to sort nth column of tbl ascending or descending determined by o
		 *
		 * @param {object} tbl - html table node containing data to sort
		 * @param {integer} n - which column to sort on
		 * @param {boolean} o - determines sort direction
		 */
		this.sortTable = function (th, n, o) {
			var i
				, l
				, store = []
				, tbody = $(th).parents('table')[0].tBodies[0]
				, classes = th.className
				, row
				, text
				, val
				;

			for (i = 0, l = tbody.rows.length; i < l; i++) {
				row = tbody.rows[i];
				text = (row.cells[n].textContent || row.cells[n].innerText).toLowerCase();
				val = this.parseValue(text, classes);

				store.push([val, row]);
			}

			if (o === true) {
				store.sort(function (a, b) {
					if (isNaN(a[0]) && isNaN(b[0])) {
						if (a[0] < b[0]) {
							return -1;
						}

						if (a[0] > b[0]) {
							return 1;
						}

						return 0;
					}

					return a[0] - b[0];
				});
			} else {
				store.sort(function (a, b) {
					if (isNaN(a[0]) && isNaN(b[0])) {
						if (a[0] < b[0]) {
							return 1;
						}

						if (a[0] > b[0]) {
							return -1;
						}

						return 0;
					}

					return b[0] - a[0];
				});
			}

			for (i = 0, l = store.length; i < l; i++) {
				tbody.appendChild(store[i][1]);
			}

			store = null;
		};

		/**
		 * Parse a value based on its type and return a sortable version of the original value
		 *
		 * @param {string} val - input value
		 * @param {string} type - type of input value
		 * @return {mixed} sortable value corresponding to the input value
		 */
		this.parseValue = function (val, classlist) {
			var perc
				, d
				, h
				, m
				;

			if (classlist.indexOf('sort-avg-rank') !== -1) {
				if (val === 'n/a') {
					val = 9999;
				}
			} else if (classlist.indexOf('sort-performance') !== -1) {
				perc = val.match(/\s+(\d{2,3}\.\d{2})%$/m);

				if (val.indexOf('usc') !== -1) {
					val = 100;
				} else if (!perc) {
					val = 0;
				} else {
					val = parseFloat(perc[1], 10);
				}
			} else if (classlist.indexOf('sort-when') !== -1) {
				// /^(?=\S)-(?:[1-9][0-9]*d)?(?:(?:^| )(?:1[0-9]?|[3-9]|2[0-3]?)h)?(?:(?:^| )(?:[1-5][0-9]?|[6-9])m)?$/
				if (/-?(?:\d+[dhm] ?){1,3}/.test(val)) {
					d = val.match(/\d+(?=d)/);
					h = val.match(/\d+(?=h)/);
					m = val.match(/\d+(?=m)/);

					if (m) {
						m = parseInt(m);
					}

					if (h) {
						m += parseInt(h) * 60;
					}

					if (d) {
						m += parseInt(d) * 1440;
					}

					val = m;
				} else {
					val = false;
				}
			} else {
				//val = val.replace(/\D/g, '');
			}

			return val;
		};

		/**
		 * Update the contents of a selector element on an interval with server information
		 *
		 * @param {string} selector - selector as string
		 * @param {integer} interval - interval in ms
		 */
		this.gsInfo = function (selector, interval) {
			setInterval(function () {
				$.get('http://dev.kz-endo.com/servers', function (data) {
					$(selector).html(data);
				});
			}, interval);
		};

		/**
		 * Confirm call to delete from records database
		 *
		 * @param {string} message
		 * @return {boolean} confirmation
		 */
		this.confirmDelete = function (message) {
			return window.confirm(message);
		};

		/**
		 * Attempt to delete a record from database
		 *
		 * @param {object} link
		 * @return {boolean} success
		 */
		this.deleteRecord = function (form) {
			if (this.confirmDelete('Really delete the record?')) {
				var formData = $(form).serialize()
					, deleteData = this.getParams(decodeURIComponent(formData))
					;

				$.post('/delete', formData, function (response) {
					if (response === false) {
						window.alert('Unable to delete record.');
					} else {
						window.location.reload();
					}
				});

				return true;
			}

			return false;
		};

		/**
		 * Parse hash parameters into json object form
		 *
		 * @param {string} uri
		 * @return {object} json
		 */
		this.getParams = function (uri) {
			var match
				, params = {}
				, re = /([^=]+)=([^&]*)&?/g
				;

			while ((match = re.exec(uri)) !== null) {
				if (match[1].indexOf('[]') !== -1) {
					if (params.hasOwnProperty(match[1])) {
						params[match[1]].push(match[2]);
					} else {
						params[match[1]] = [match[2]];
					}
				} else {
					params[match[1]] = match[2];
				}
			}

			return params;
		};
	}

	exports.Helper = Helper;
})(this);