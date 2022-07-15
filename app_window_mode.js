var app_window_mode = (function () {

	function getWindowMode() {
		var result = 'narrow';

		if (window.matchMedia('(min-width: 768px)').matches) {
			result = 'wide';
		}
		return result;
	}

	var windowMode = getWindowMode();

	function changeWindowMode() {
		var newWindowMode = getWindowMode();

		if (newWindowMode !== windowMode) {
			windowMode = newWindowMode;

			$(document).trigger("changeWindowMode", windowMode);
		}
	}

	return {
		getWindowMode: getWindowMode,
		changeWindowMode: changeWindowMode
	};
})();
