/*
* Объект app представляет собой базовый инстанс фронтенд-приложения.
*
* В него подключаются различные модули, и таким
* образом фронтенд-приложение получает новый функционал.
*
*/
window.app = (function(){


    // Список всех зарегистрированных модулей приложения
    var instances = {};

    // Метод регистрирует модуль в приложении
    function register(name, instance, setupConfig) {
        instances[name] = instance;
        try {

            /*
             * Перед регистрацией в приложении модуль можно сконфигурировать,
             * передав в него объект, содержащий JSON-структуру с параметрами.
             *
             * Для этого модуль должен реализовывать функцию configure()
             */
            this.get(name).configure(setupConfig);

            /*
             * При регистрации любого модуля основное приложение пытается
             * выполнить определенный в модуле метод init()
             */
            this.get(name).init();

        } catch (exception){}

    }

    /*
     * Чтобы получить доступ к API любого из зарегистрированных модулей,
     * нужно обратиться к модулю через этот метод.  В ответ он вернет
     * объект публичного API модуля.
     */
    function get(name){
        return instances[name];
    }

    /*
     * У приложения есть глобальный файл конфигурации appConfig, в котором хранятся
     * все первоначальные параметры, необходимые для работы JavaScript во фронтенд-части.
     */
    function readConfig(){

        if(typeof window.appConfig === 'undefined'){
            window.appConfig = {};
        }

        app.register(
            'tools',
            app_tools
        );

        app.register(
            'variables',
            app_variables,
            app.get('tools').objectHasProperty(window.appConfig, 'variables') ? window.appConfig.variables : null
        );

        app.register(
            'bus',
            app_bus,
            app.get('tools').objectHasProperty(window.appConfig, 'bus') ? window.appConfig.bus: null
        );

        app.register(
            'popup',
            app_popup,
            app.get('tools').objectHasProperty(window.appConfig, 'popup') ? window.appConfig.popup: null
        );

        app.register(
            'preloader',
            app_preloader,
            app.get('tools').objectHasProperty(window.appConfig, 'preloader') ? window.appConfig.preloader: null
        );
		
		app.register(
            'windowMode',
            app_window_mode,
            app.get('tools').objectHasProperty(window.appConfig, 'windowMode') ? window.appConfig.windowMode: null
        );

    }

    /*
    * Базовое API приложения
    */
    return {
        register: register,
        get: get,
        readConfig: readConfig,
    };

}());

// Прочитаем конфиг и зарегистрируем модули.
$(function(){
    app.readConfig(window.appConfig);
});
