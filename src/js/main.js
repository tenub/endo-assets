$(function() {
	var helper = new Helper()
		, order = true;

	/**
	 * Bind the sortTable function to heading columns with the sort class
	 */
	$('th.sort').on('click', function () {
		helper.sortTable($(this).parents('table')[0], $(this).index(), order);
		order = (order === true) ? false : true;
	});

	/**
	 * Prevent searching with input that is less than two characters in length
	 */
	$('#search').submit(function () {
		if ($.trim($('#search-btn').val()).length < 2) {
			return false;
		}
	});

	$('a.delete').on('click', function (e) {
		e.preventDefault();
		helper.deleteRecord(this);
	});
});