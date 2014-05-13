$(document).ready(function() {

	/**
	 *	Add sort icon to all headings with the sort class
	 */
	$('<span/>').addClass('fa fa-sort').prependTo($('th.sort'));

	/**
	 *	Bind the sortTable function to heading columns with the sort class
	 */
	var order = true;
	$('th.sort').on('click', function() {
		sortTable($(this).parents('table')[0], $(this).index(), order);
		order = (order === true) ? false : true;
	});

	/**
	 *	Prevent searching with input that is less than two characters in length
	 */
	$('form').submit(function() {
		if ($.trim($('#search').val()).length < 2)
			return false;
	});

});

/**
 *	Directly modify DOM elements to sort nth column of tbl ascending or descending determined by o
 *
 *	@param		{object}	tbl		html table node containing data to sort
 *	@param		{integer}	n		which column to sort on
 *	@param		{boolean}	o		determines sort direction
 */
function sortTable(tbl, n, o) {

	var i, l, store = [], tbody = tbl.tBodies[0];

	for (i=0, l=tbody.rows.length; i<l; i++) {

		var row = tbody.rows[i],
			text = $.trim(row.cells[n].textContent || row.cells[n].innerText).toLowerCase(),
			val = parseValue(text, row.cells[n].className);

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
	
}

/**
 *	Parse a value based on its type and return a sortable version of the original value
 *
 *	@param		{string}	val		input value
 *	@param		{string}	type	type of input value
 *	@returns	{mixed}		sortable value corresponding to the input value
 */
function parseValue(val, type) {

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
			break;

		default:
			break;

	}

	return val;

}