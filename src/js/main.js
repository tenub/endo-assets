$(document).ready(function() {

	var helper = new Helper();

	/**
	 *	Add sort icon to all headings with the sort class
	 */
	$('<span/>').addClass('fa fa-sort').appendTo($('th.sort'));

	/**
	 *	Bind the sortTable function to heading columns with the sort class
	 */
	var order = true;
	$('th.sort').on('click', function() {
		helper.sortTable($(this).parents('table')[0], $(this).index(), order);
		order = (order === true) ? false : true;
	});

	/**
	 *	Prevent searching with input that is less than two characters in length
	 */
	$('form').submit(function() {
		if ($.trim($('#search').val()).length < 2) {
			return false;
		}
	});

	$('a[href^="delete/"]').on('click', function() {
		return helper.confirmDelete('Really delete the record?');
	});

});