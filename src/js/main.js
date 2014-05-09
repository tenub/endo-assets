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
		var index = $(this).index();
		sortTable($(this).parents('table'), index, order);
		order = (order === true ? false : true);
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
 *	Directly modify DOM elements to sort nth column on id's value ascending or descending determined by o
 *
 *	@param	string	id
 *	@param	integer	n
 *	@param	boolean	o
 */
function sortTable(id, n, o) {
	var tbl = id.children('tbody');
	var store = [];
	$.each(tbl.children('tr'), function(k,v) {
		var row = $(this);
		var sortnr;
		if ($(this).children('td').eq(n).hasClass('performance')) {
			sortnr = row.children('.performance').find('span').text().substr(1);
		} else {
			sortnr = row.children('td').eq(n).text().toLowerCase();
		}
		store.push([sortnr, row]);
	});
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
	tbl.html('');
	console.log(store);
	for (i=0, len=store.length; i<len; i++) {
		tbl.append(store[i][1]);
	}
	store = null;
}