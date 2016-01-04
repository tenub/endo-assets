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
		var $fieldset = $(this).parents('fieldset')
			, $table = $fieldset.find('table')
			, sortType = $fieldset.find('.sort-type').val()
			, sortOrder = $fieldset.find('.sort-order').val() === 'sort-desc'
			, $th = $table.find('.' + sortType)
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
		$(this).parents('fieldset').find('input[type="checkbox"][name="' + this.id + '"]').prop('checked', this.checked);
	});

	$('.form-manage input, .form-manage select').on('change', function (e) {
		$('.form-manage-save').prop('disabled', false);
	});

	$('.form-manage-save').on('click', function (e) {
		$(this).prop('disabled', true);
	});

	$('.form-manage-role-add, .form-manage-role-remove').on('click', 'button', function (e) {
		var $parent = $(this).parent();
		var $user = $parent.parents('.manage-user');
		var $selected = $parent.find('select option:selected');
		var $userRoles = $user.find('.user-roles');

		e.preventDefault();

		if ($parent.hasClass('form-manage-role-add')) {
			if (!$.grep($userRoles.find('li'), function (el) {
				return $selected.val().length && $(el).data('roleId') == $selected.val();
			}).length) {
				$userRoles.append('<li data-role-id="' + $selected.val() + '">' + $selected.text() + '</li>');
				$parent.find('option[value="' + $selected.val() + '"]').remove();
				$user.find('.form-manage-role-remove select').append('<option value="' + $selected.val() + '">' + $selected.text() + '</option>');
				$parent.find('select').trigger('change');
			}
		} else if ($parent.hasClass('form-manage-role-remove')) {
			if ($.grep($userRoles.find('li'), function (el) {
				return $selected.val().length && $(el).data('roleId') == $selected.val();
			}).length) {
				$userRoles.find('li[data-role-id="' + $selected.val() + '"]').remove();
				$parent.find('option[value="' + $selected.val() + '"]').remove();
				$user.find('.form-manage-role-add select').append('<option value="' + $selected.val() + '">' + $selected.text() + '</option>');
				$parent.find('select').trigger('change');
			}
		}
	});
});