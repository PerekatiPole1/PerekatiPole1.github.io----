/**
 * Модуль, содержащий хелперы, для управления popup-окнами frontend-приложения
 */
(function(){

	var allPopups = '.b-modal-windows .b-popup';
	var displayClass = 'b-popup_state_show';

	var closeSelectorForTopPopups = '.b-icon_content_close-modal-top-popups';
	var closeSelectorForAuthPopups = '.b-icon_content_close-modal';

	var popups = {
		'country': {
			selector: '.b-popup_content_country',
			open: {selector: '.flag-location-js', scrollTop: true},
			close: {selector: closeSelectorForTopPopups}
		},

		'city': {
			selector: '.b-popup_content_city',
			open: {selector: '.b-menu__item-popup-handle_init-by_click', scrollTop: true},
			close: {selector: closeSelectorForTopPopups}
		},

		'language': {
			selector: '.b-popup_content_language',
			open: {selector: '.b-menu__item-popup-handle_init_language-by_click', scrollTop: true},
			close: {selector: closeSelectorForTopPopups}
		},

		'search': {
			selector: '.b-popup_content_search-1200',
			open: {selector: '.b-i_content_goto-search', focusOn: {selector: '#search_field'}},
			close: {selector: '.b-icon_content_close-modal-search'}
		},

		'searchMobile': {
			selector: '.b-popup_content_search-320',
			customIconClass: 'b-menu__item-text_state_selected',
			open: {
				selector: '.js-show-popup-mobile-search',
				focusOn: {selector: '#mobile-search_field'},
				func: customOpenSearchMobile
			},
			close: {
				selector: '.b-icon_content_close-modal-search',
				func: function(selector) {
					$(popups.searchMobile.open.selector).removeClass(popups.searchMobile.customIconClass);
					closeDefaultFunc(selector);
				}
			}
		},

		'mainMenuMobile': {
			selector: '.b-popup_content_main-menu-320',
			customIconClass: 'b-nav-icon_state_opened',
			open: {
				selector: '.b-nav-icon_type_hamburger',
				func: customOpenMainMenuMobile
			},
			close: {
				func: function(selector) {
					$(popups.mainMenuMobile.open.selector).removeClass(popups.mainMenuMobile.customIconClass);
					closeDefaultFunc(selector);
				}
			}
		},
		
		'userMenuMobile': {
			selector: '#userMenuMobileWrap',
			customIconClass: 'b-nav-icon_state_opened',
			open: {
				selector: '#userMenuMobileIcon',
				func: customOpenUserMenuMobile
			},
			close: {
				func: function(selector) {
					$(popups.userMenuMobile.open.selector).removeClass(popups.userMenuMobile.customIconClass);
					closeDefaultFunc(selector);
				}
			}
		},

		'registration': {
			selector: '.b-popup_content_registration-1200',
			open: {selector: '#registration-link-js'},
			close: {selector: closeSelectorForAuthPopups}
		},

		'login': {
			selector: '.b-popup_content_login-1200',
			open: {selector: '#login-link-js'},
			close: {selector: closeSelectorForAuthPopups}
		},

		'mobileAuth': {
			selector: '.b-popup_content_login-320',
			open: {selector: '#mobile-widget-link-js'},
			close: {selector: closeSelectorForAuthPopups}
		},
	};

	/**
	 * Инициализация модуля
	 */
	function init(){
		$(document).ready(function(){
			for (var key in popups) {
				var popup = popups[key],
					$popup = $(popup.selector),
					closeFunc = closeDefaultFunc;

				if (popup.close.hasOwnProperty('func') && typeof popup.close.func === "function") {
					closeFunc = popup.close.func;
				}

				if (popup.close.selector !== undefined) {
					$popup.on('click', popup.close.selector, closeFunc.bind(this, popup.selector));
				}

				if (popup.open.selector !== undefined) {
					$(popup.open.selector).on('click', function(popup, e){
						e.preventDefault();

						var openFunc = openDefaultFunc;

						if (popup.open.hasOwnProperty('func') && typeof popup.open.func === "function") {
							openFunc = popup.open.func;
						}

						openFunc.call(e.currentTarget, popup.selector);

						if (popup.open.scrollTop) {
							$(document).scrollTop(0);
						}

						if (popup.open.focusOn) {
							$(popup.open.focusOn.selector).focus();
						}
					}.bind(this, popup));
				}
			}
		}.bind(this));

	}

	/**
	 * Начальная конфигурация модуля
	 */
	function configure(){

	}

	/**
	 * Метод отображает на фронтенде указанной popup-окно,
	 * перед этим закрывает все остальные открытые на странице popup-окна
	 *
	 * @param {string} $selector
	 */
	function openDefaultFunc(selector) {
		closeAll();
		$(selector).addClass(displayClass);
	}

	/**
	 * Метод закрывает конкретное popup-окно.
	 *
	 * @param {string} $selector
	 */
	function closeDefaultFunc(selector) {
		$(selector).removeClass(displayClass);
	}

	/**
	 * Метод закрывает все Popup-окна на странице.
	 */
	function closeAll(){
		for (var key in popups) {
			var popup = popups[key],
				closeFunc = closeDefaultFunc;

			if (popup.close.hasOwnProperty('func') && typeof popup.close.func === "function") {
				closeFunc = popup.close.func;
			}

			closeFunc.call(this, popup.selector);
		}
	}

	function customOpenSearchMobile(selector) {
		var $this = $(this);

		if($this.hasClass(popups.searchMobile.customIconClass)) {
			closeDefaultFunc.call(this, selector);
		} else {
			openDefaultFunc.call(this, selector);
		}

		$this.toggleClass(popups.searchMobile.customIconClass);
	}

	function customOpenMainMenuMobile(selector) {
		var $this = $(this);

		if($this.hasClass(popups.mainMenuMobile.customIconClass)) {
			closeDefaultFunc.call(this, selector);
			$('body').css({
				'overflow': 'auto', 
				'position': '',
				'top': '',
				'left': '',
				'right': '',
			});
		} else {
			openDefaultFunc.call(this, selector);
			$('body').css({
				'overflow': 'hidden',
				'position': 'fixed',
				'top': '0',
				'left': '0',
				'right': '0',
			});
		}

		$this.toggleClass(popups.mainMenuMobile.customIconClass);
	}
	
	function customOpenUserMenuMobile(selector) {
		var $this = $(this);

		if ($this.hasClass(popups.userMenuMobile.customIconClass)) {
			closeDefaultFunc.call(this, selector);
			$('body').css({
				'overflow': 'auto', 
				'position': '',
				'top': '',
				'left': '',
				'right': '',
			});
		} else {
			openDefaultFunc.call(this, selector);
			$('body').css({
				'overflow': 'hidden',
				'position': 'fixed',
				'top': '0',
				'left': '0',
				'right': '0',
			});
		}

		$this.toggleClass(popups.userMenuMobile.customIconClass);
	}

	/**
	 * Методы, экспортируемые модулем для использования другими частями приложения
	 */
	var API = {
		init: init,
		configure: configure,
		closeAll: closeAll,
	};

	window.app_popup = API;

})();