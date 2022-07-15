/**
 * Модуль, содержащий различные хелперы, которые должны быть доступны
 * в любом месте приложения.
 */
(function(){

    /**
     * Инициализация модуля
     */
    function init(){

    }

    /**
     * Начальная конфигурация модуля
     */
    function configure(){

    }

    /**
     * Метод проверяет, является ли переданный ему объект пустым
     * Например:
     *
     * {} === true
     * {'somekey': 'somevalue'} == false
     *
     * @param {object} obj - Любой JavaScript-объект
     */
    function objectIsEmpty(obj){
        for (var key in obj){
            if (obj.hasOwnProperty(key)){
                return false;
            }
        }

        return true;
    }

    /**
     * Метод проверяет, есть ли в переданном объекте ключ
     *
     * @param obj - любой JavaScript-объект
     * @param {string} propertyName - Ключ, налачие которого будет проверяться в объекте
     * @returns {boolean}
     */
    function objectHasProperty(obj, propertyName){
        if (objectIsEmpty(obj)){
            return false;
        }

        for (var key in obj){
            if (obj.hasOwnProperty(key) && key === propertyName){
                return true;
            }
        }

        return false;
    }

    function array_get (array, key) {
        var keys = key.split('.');
        for (var i = 0; i < keys.length; i++) {
            array = array[keys[i]];
        }
        return array;
    }

    /**
     * Возвращает перевод
     * 
     * @param string $name название перевода
     * @param object $params параметры строки перевода
     * @return string
     */
    function trans(name, params) {
        var template = null,
            trans = app.get('variables').get().trans;

        template = array_get(trans, name);

        if(template === null) return name;
        for (var keyParams in params) {
            var reg = new RegExp('\:'+keyParams,'gi');
            template = template.replace(reg, params[keyParams]);
        }
        return template;
    }

    /**
     * Методы, экспортируемые модулем для использования другими частями приложения
     */
    var API = {
        init: init,
        configure: configure,
        objectIsEmpty: objectIsEmpty,
        objectHasProperty: objectHasProperty,
        trans: trans
    };

    window.app_tools = API;

})();