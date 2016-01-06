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

	/**
	 * Confirm record deletion before submitting to the server
	 */
	$('form.delete').on('submit', function (e) {
		e.preventDefault();
		helper.deleteRecord(this);
	});

	/**
	 * Custom form submission
	 */
	$('.form-manage').submit(function (e) {
		e.preventDefault();

		var userArray = [];
		var $form = $(this);

		$(this).find('.manage-user').each(function () {
			var $user = $(this);

			userArray.push({
				userId: $user.find('input[name="userId"]').val(),
				userName: $user.find('input[name="userName"]').val(),
				userEmail: $user.find('input[name="userEmail"]').val(),
				userRole: $user.find('select[name="userRole"] option:selected').val()
			});
		});

		$.ajax({
			url: this.action,
			type: 'post',
			data: {
				users: userArray
			},
			success: function (data) {
				$form.find('.form-manage-save').prop('disabled', true);
			},
			error: function (request, status, error) {
				alert(request);
			}
		});
	});

	/**
	 * Enable submit button if an input change is detected
	 */
	$('.form-manage input').on('input', function (e) {
		$('.form-manage-save').prop('disabled', false);
	});

	$('.form-manage select').on('change', function (e) {
		$('.form-manage-save').prop('disabled', false);
	});

	/**
	 * Functionality for role addition and removal
	 */
	$('.form-manage-role-add, .form-manage-role-remove').on('click', 'button', function (e) {
		var $parent = $(this).parent();
		var $user = $parent.parents('.manage-user');
		var $selected = $parent.find('select option:selected');
		var $userRoles = $user.find('.user-roles');
		var $removeSelect = $user.find('.form-manage-role-remove select');
		var $removeAdd = $user.find('.form-manage-role-add select');

		// do not process disabled options that are selected
		if (!$selected.length || $selected.prop('disabled')) {
			return false;
		}

		// case for adding a role
		if ($parent.hasClass('form-manage-role-add')) {
			// if item to be added is not in role list, add it and sort list alphabetically
			if (!$.grep($userRoles.find('li'), function (el) {
				return $selected.val().length && $(el).data('roleId') == $selected.val();
			}).length) {
				$userRoles.append('<li data-role-id="' + $selected.val() + '">' + $selected.text() + '</li>');
				$parent.find('option[value="' + $selected.val() + '"]').remove();
				$removeSelect.append('<option value="' + $selected.val() + '">' + $selected.text() + '</option>');
				helper.sortChildElements($removeSelect).appendTo($removeSelect);
				helper.sortChildElements($userRoles).appendTo($userRoles);
				$parent.find('select').trigger('change');
			}
		// case for removing a role
		} else if ($parent.hasClass('form-manage-role-remove')) {
			// if item to be added is in role list, remove it
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

	/**
	 * Mass toggle functionality
	 */
	$('.toggle-cb').on('click', function (e) {
		$(this).parents('table').find('input[type="checkbox"][name="' + this.id + '"]').prop('checked', this.checked);
	});
});