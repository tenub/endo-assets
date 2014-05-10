$(document).ready(function() {

	/**
	 *	Add sort icon to all headings with the sort class
	 */
	$('<span/>').addClass('fa fa-sort').appendTo($('th.sort'));

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
 *	@param	object	tbl
 *	@param	integer	n
 *	@param	boolean	o
 */
function sortTable(tbl, n, o) {

	var i, l, store = [], tbody = tbl.tBodies[0];

	for (i=0, l=tbody.rows.length; i<l; i++) {

		var row = tbody.rows[i],
			text = $.trim(row.cells[n].textContent || row.cells[n].innerText).toLowerCase(),
			sortnr = parseValue(text, row.cells[n].className);

		store.push([sortnr, row]);

	}

	if (o === true) {

		store.sort(function(a,b) {

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

		store.sort(function(a,b) {

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
 *	@param	string	val
 *	@param	string	type
 *	@return	mixed	val
 */
function parseValue(val, type) {

	switch (type) {

		case 'performance':
			val = parseFloat(val.replace(/[^\d\-]/g, ''), 10);
			break;

		case 'when':
			var m = 0, dhm = val.match(/(?:(\d)+d )?(?:(\d+)h )?(\d+)m/);
			if (typeof(dhm[1]) !== 'undefined')
				m += dhm[1] * 1440;
			if (typeof(dhm[2]) !== 'undefined')
				m += dhm[2] * 60;
			if (typeof(dhm[3]) !== 'undefined')
				m += dhm[3];
			val = m;
			break;

		default:
			break;

	}

	return val;

}