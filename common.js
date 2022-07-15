//external links modal window. config.app.external_links_popup
var external_links_modal = $('#external_links_modal');
var external_links_modal_btn = external_links_modal.find('a.arcticmodal-close');
if(external_links_modal.length > 0){

	$('a').on('click',function(event){
		var url = $(event.target).prop('href', url).prop('hostname');
		var crnt = window.location.hostname;
		if(url !== crnt && url !==undefined && url !== ''){
			external_links_modal_btn.data('url',$(event.target).prop('href'));
			external_links_modal.arcticmodal();
			return false;
		}
	});

	external_links_modal_btn.on('click',function(item){
		window.location = external_links_modal_btn.data('url');
	});
}

(function ($) {
	$(function () {
		var csrfMeta = $('meta[name="csrf-token"]').attr('content');
		if(csrfMeta !== undefined){
			$.ajaxSetup({
				headers: {
					'X-CSRF-TOKEN': csrfMeta
				}
			});
		}

		$( document ).ajaxError(function( event, jqxhr, settings, thrownError ) {
			if(jqxhr.status === 419){
				$('#csrf_modal').arcticmodal();
			}
		});



		$('#csrf_modal').find('a.arcticmodal-close').on('click',function(item){
			location.reload();
		})
		/*
		 * При ресайзе проверяем, сменился ли режим отображения
		 */
		$(window).resize(function(){
			app.get('windowMode').changeWindowMode();
		});

		/**
		 * Табы на детальных мероприятий
		 */
		$('.b-tabs_content_event-education-event-details').on('click', 'li.b-tabs__item:not(.b-tabs__item_state_selected)', function() {
			$(this)
				.addClass('b-tabs__item_state_selected').siblings().removeClass('b-tabs__item_state_selected')
				.closest('.b-tabs_content_event-education-event-details').find('.b-tabs__content').removeClass('b-tabs__content_state_selected').eq($(this).index()).addClass('b-tabs__content_state_selected');
		});

		/**
		 * Скрыть/открыть список потомков на страницах решений, цбр и услуг
		 */
		$('.b-story_content_sidebar-and-grid-services').on('click', '.b-link_type_open', function (e,fromAnchor) {
			e.preventDefault();
			var list = $(this).prev('.b-list_content_characteristics');

			if(typeof fromAnchor === 'undefined'){
				fromAnchor = false;
			}
			if(fromAnchor === true && list.hasClass('b-list_viewtype_open')){
				return;
			}

			if (list.hasClass('b-list_viewtype_hidden')) {
				$(this).text(app.get('tools').trans('frontend.page_list-hide_all'));
			} else {
				$(this).text(app.get('tools').trans('frontend.page_list-show_all'));
			}

			list.toggleClass('b-list_viewtype_hidden b-list_viewtype_open');
		});


		/**
		 * Открывает список если перешли по якорю
		 */
		function LoadAnchor() {
			$item = window.location.hash;
			$item = $item.slice(1);
			if($item){
				target = 'a[name='+$item+']';
				$(target).next('div').find('.b-link_type_open:first').trigger('click',[true])

			}
		}
		LoadAnchor();
		/**
		 * если человек переходит по якорям
		 */
		window.onhashchange = LoadAnchor;
		/**
		 * раскрыть список у элемента, если по его якорю кликнули в боковом меню
		 */

		$('.b-list_content_sidebar-and-grid').on('click', '.b-list__item-text', function () {
			itemId = $(this).data('anchor');
			target = 'a[name=item'+itemId+']';
			$(target).next('div').find('.b-link_type_open:first').trigger('click',[true])
		});


		$('.b-select2').select2({
			minimumResultsForSearch: -1,
			theme: "vshape-theme",
			width: '100%'
		});

		$('.js-show-popup-mobile-callback').on('click', function () {

			var $this = $(this);

			$this.toggleClass('b-menu__item-text_state_selected');
			if($this.hasClass('b-menu__item-text_state_selected')) {
				app.get('popup').displayMobileCallback();
			} else {
				app.get('popup').closeAll();
			}

			return false;
		});

		//spoiler pure-content
                $('.b-section_content_spoiler-pure-content h3').click(function (e) {
                    $(this).closest('.b-section_content_spoiler-pure-content').toggleClass('b-section_state_selected');
                });

		//липкое меню desktop
		/*var headerH = $('.b-stripe_content_header').height();
		$(document).on('scroll', function() {
			var documentScroll = $(this).scrollTop();
			if(documentScroll > headerH){
				$('.b-stripe_content_floating-header').addClass('fixed');
			} else {
				$('.b-stripe_content_floating-header').removeClass('fixed');
			}
		});*/

		//скролл для мобильных popup modal-windows
		$('.resise-a').css({
			'height': $(window).outerHeight() - 102
		});
		$(window).on('resize', function(){
			$('.resise-a').css({
				'height': $(window).outerHeight() - 102
			});
		});

		$('.resise-b').css({
			'max-height': $(window).outerHeight() - 42
		});
		$(window).on('resize', function(){
			$('.resise-b').css({
				'max-height': $(window).outerHeight() - 42
			});
		});

		//выпадающие списки
		$('.b-pure-content select').select2({
			minimumResultsForSearch: -1,
			theme: "vshape-theme",
			width: '100%',
			placeholder: function(){
				$(this).data('placeholder');
			}
		});

		// Табы
		$('.b-tabs_content_login-320 .b-tabs__list').on('click', 'li:not(.b-tabs__item_state_selected)', function () {
			$(this)
				.addClass('b-tabs__item_state_selected').siblings().removeClass('b-tabs__item_state_selected')
				.closest('.b-tabs_content_login-320').find('.b-tabs__content').removeClass('b-tabs__content_state_selected').eq($(this).index()).addClass('b-tabs__content_state_selected');
		});

		$('.b-tabs_content_problem-solving').on('click', 'li:not(.b-tabs__item_state_selected)', function () {
			$(this)
				.addClass('b-tabs__item_state_selected').siblings().removeClass('b-tabs__item_state_selected')
				.closest('.b-tabs_content_problem-solving').find('.b-tabs__content').removeClass('b-tabs__content_state_selected').eq($(this).index()).addClass('b-tabs__content_state_selected');
		});

		$('.b-tabs_content_popular-store').on('click', 'li:not(.b-tabs__item_state_selected)', function () {
			$(this)
				.addClass('b-tabs__item_state_selected').siblings().removeClass('b-tabs__item_state_selected')
				.closest('.b-tabs_content_popular-store').find('.b-tabs__content').removeClass('b-tabs__content_state_selected').eq($(this).index()).addClass('b-tabs__content_state_selected');
		});

		$('.b-list_content_country .b-list__item-text').on('click', function () {
			$('.b-list_content_country .b-list__item').removeClass('b-list__item_state_selected');
			$(this).parents('.b-list__item').addClass('b-list__item_state_selected');
		});
		$('.b-list_content_city .b-list__item-text').on('click', function () {
			$('.b-list_content_city .b-list__item').removeClass('b-list__item_state_selected');
			$(this).parents('.b-list__item').addClass('b-list__item_state_selected');
		});

		$('.b-tabs_content_country .b-tabs__list').on('click', 'li:not(.b-tabs__item_state_selected)', function () {
			$(this)
				.addClass('b-tabs__item_state_selected').siblings().removeClass('b-tabs__item_state_selected')
				.closest('.b-tabs_content_country').find('.b-tabs__content').removeClass('b-tabs__content_state_selected').eq($(this).index()).addClass('b-tabs__content_state_selected');
		});

		$('.b-popup.b-popup_viewtype_standard').each(function(){
			if ($(this).data('autoload') == 1) {
				//Для попапа с формой нужно добавить класс на боди, иначе не работают селекты
				if($(this).hasClass('b-popup_content_resources-center')){ 
					popupWithFormConfig = $.extend({}, appConfig.popup.arcticmodal,{
						afterOpen: function(data, el) {
							$('body').addClass('b-modal_viewtype_open');
						},
						afterClose: function(data, el) {
							$('body').removeClass('b-modal_viewtype_open');
						},
					});
					$(this).arcticmodal(popupWithFormConfig);
				}else{
					$(this).arcticmodal(appConfig.popup.arcticmodal);
				}
			}
		});

		// Попапы

		$('.init-popup').on('click', function () {
			$('.b-popup').arcticmodal({
				overlay: {
					css: {
						backgroundColor: '#333333',
						opacity: .8
					}
				}
			});
			return false;
		});

		// Прокрутка к якорю

		$('.init_scroller').click(function () {
			$("html, body").animate({
				scrollTop: $($(this).data("href")).offset().top - 80 + "px"
			}, {
				duration: 500,
				easing: "swing"
			});
		});

		// Плейсхолдеры

		$('input, textarea').placeholder();

		// Навигация

		function showBordered() {
			var bo = $('body').scrollTop();
			if (bo > 90) {
				$('.b-stripe_content_header').addClass('fixed');
				if (bo > 160) {
					$('.b-stripe_content_header').addClass('showing');
				} else {
					$('.b-stripe_content_header').removeClass('showing');
				}
			} else {
				$('.b-stripe_content_header').removeClass('fixed');
				if (bo > 160) {
					$('.b-stripe_content_header').addClass('showing');
				} else {
					$('.b-stripe_content_header').removeClass('showing');
				}
			}
		}
		showBordered();
		$(window).scroll(function () {
			showBordered();
		});

		// Плавное выпадание главного меню
		$('.b-menu_content_section .b-menu__item').hover(
			function () {
				$('.b-stripe_content_dropdown-menu', this).stop().slideDown(200);
			},
			function () {
				$('.b-stripe_content_dropdown-menu', this).stop().slideUp(200);
			}
		);
                
	});
})(jQuery);