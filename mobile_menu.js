$(function(){

	var mobileBlockSelector = '.b-menu.b-menu_content_mobile',
		mobileIconLinkSelector = '.b-link_type_parent-mobile',
		mobileLiSelector = '.b-menu.b-menu_content_mobile li.b-menu__item';

	var mobileOpenClass = 'b-menu__item_type_open',
		mobileSelectedClass = 'b-link_state_selected';

	$(mobileBlockSelector).on('click', mobileIconLinkSelector, function (e) {
		e.preventDefault();

		// закрываем все
		if (!$(this).hasClass(mobileSelectedClass)) {
			$(mobileLiSelector).removeClass(mobileOpenClass)
				.find(mobileIconLinkSelector).removeClass(mobileSelectedClass);
		}

		// открываем нажатый
		$(this).toggleClass(mobileSelectedClass)
			.parent().toggleClass(mobileOpenClass);
	});
});