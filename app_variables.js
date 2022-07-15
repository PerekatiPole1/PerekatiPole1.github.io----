/**
 * Заготовка для модуля управления конфигами фронтенд-приложения.
 *
 * Массив ключей и значений, которые будут доступны в любом месте приложения.
 * Предназначен для доступа к параметрам из файлов конфигов на бакенде, переводам и пр.
 * */

(function(){

    var config = {};

    /**
     * Инициализация модуля
     */
    function configure(initConfig){
        config = initConfig;
    }

    /**
     * Инициализация модуля
     */
    function init(){
        config = JSON.parse($('#js-front-config').text());
    }

    /**
     * Очистка конфига
     */
    function clear(){
        config = {};
    }

    /**
     * Получение конфига
     * @returns {object}
     */
    function get(){
        return config;
    }

    var API = {
        configure: configure,
        init: init,
        clear: clear,
        get: get,
    };

    window.app_variables = API;

})();