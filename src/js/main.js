$(function() {
	var helper = new Helper();

	$('.servers a').on('click', function (e) {
		if ($(this).attr('href') === '#') {
			e.preventDefault();
		}
	});

	/**
	 * Bind the sortTable function to heading columns with the sort class
	 */
	$('th.sort').on('click', function () {
		helper.sortTable(this, $(this).index(), !$(this).hasClass('sort-desc'));
		$(this).toggleClass('sort-desc').siblings('.sort-desc').removeClass('sort-desc');
	});

	$('.mobile-sort select').on('change', function () {
		var $tbl = $(this).parents('form').next('table')
			, sortType = $(this).parents('form').find('.sort-type').val()
			, sortOrder = $(this).parents('form').find('.sort-order').val() === 'sort-desc'
			, $th = $tbl.find('.' + sortType)
			;

		if ($th.length) {
			helper.sortTable($th[0], $('th.' + sortType).index(), !sortOrder);
			if (!sortOrder) {
				$th.toggleClass('sort-desc').siblings('.sort-desc').removeClass('sort-desc');
			}
		}
	});

	/**
	 * Prevent searching with input that is less than two characters in length
	 */
	$('#search').submit(function () {
		if ($.trim($('#search-btn').val()).length < 2) {
			return false;
		}
	});

	$('form.delete').on('submit', function (e) {
		e.preventDefault();
		helper.deleteRecord(this);
	});

	$('.toggle-cb').on('click', function (e) {
		$(this).parents('form').find('input[type="checkbox"][name="' + this.id + '"]').prop('checked', this.checked);
	});
});