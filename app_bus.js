/**
    Модуль шины данных приложения

    Предназначен для того, чтобы модули приложения могли общаться между собой,
    используя механизм создания событий и подписки на них.
 */
(function(){

    /** Список событий и подписанных на них обработчиков */
    var topics = {};

    var API = {
        /**
         * Служебный метод.
         * При подключении модуля в основное приложение код
         * из этого метода будет выполнен автоматически.
         *
         * @return void
         */
        init: function(){

        },

        /**
         * Служебный метод.
         * При подключении модуля в основное приложение
         * в этот метод будет передан объект, содержащий
         * параметры инифциализации для модуля
         *
         * @return void
         */
        configure: function(){

        },

        /**
         * Подписка на глобальное событие.
         * Вызовите этот метод, чтобы подписать на глобальное событие
         * свой собственный обработчик. Например:
         *
         * app.get('bus').subscribe('my_event_name', function(data){});
         *
         * @param {string} topic - Название события, на которое осуществляется подписка
         * @param {callback} - Callback, который будет вызван в ответ на наступление события
         * */
        subscribe: function(topic, listener) {
            // Создание нового события
            if(!topics[topic]) topics[topic] = [];

            // Добавление подписчика на событие
            topics[topic].push(listener);
        },

        /**
         * Отписка от глобального события.
         * Вызовите этот метод, чтобы отписаться от глобального события
         * Например:
         *
         * app.get('bus').unsubscribe('my_event_name', function(data){});
         *
         * @param {string} topic - Название события, от которого осуществляется отписка
         * @param {callback} - Callback, который будет вызван в ответ на наступление события отписки
         * */
        unsubscribe: function(topic, callback){
            topics[topic] = topics[topic].filter(function(listener) { return listener !== callback; })
        },

        /**
         * Генерация глобального события.
         * Вызовите этот метод, чтобы отправить в шину данных собственное событие. Например:
         *
         * app.get('bus').emit('my_event_name', data);
         *
         * @param {string} topic - Название события, которое будет отправлено в шину данных
         * @param {Object} data - Объект, содержащий дополнительные данные, которые будут переданы получателю события
         * */
        emit: function(topic, data) {
            // return, если события не существует, или для него не найдены обработчики
            if(!topics[topic] || topics[topic].length < 1) return;

            // Рассылка события все обработчикам
            topics[topic].forEach(function(listener) {
                listener(data || {});
            });
        }
    };

    window.app_bus = API;

})();
