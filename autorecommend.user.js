// ==UserScript==
// @name            Автопрокрутка рекомендуемых
// @namespace       https://github.com/Henxed/auto-recommend-steam
// @version         0.1.1
// @downloadURL     https://raw.githubusercontent.com/Henxed/auto-recommend-steam/master/auto-recommendations.js
// @updateURL       https://raw.githubusercontent.com/Henxed/auto-recommend-steam/master/auto-recommendations.js
// @description     Переходи сюды https://store.steampowered.com/explore и нажимаем "Обмануть очередь"
// @author          Перевел и доработал Henxed
// @match           https://store.steampowered.com/explore
// @run-at          document-start|document-end
// @grant           unsafeWindow
// @unwrap
// ==/UserScript==
(function() {
    var DiscoveryQueueModal, GenerateQueue = function(queueNumber){

        if (DiscoveryQueueModal){
            DiscoveryQueueModal.Dismiss();
        }

        DiscoveryQueueModal = ShowBlockingWaitDialog('Создание списка...', 'Просмотр рекомендуемых #' + ++queueNumber);

        jQuery.post('https://store.steampowered.com/explore/generatenewdiscoveryqueue', {
            sessionid: g_sessionID,
            queuetype: 0
        }).done(function(data){

                var requests = [],
                    done = 0,
                    errorShown;

                for (var i = 0; i < data.queue.length; i++){

                    var request = jQuery.post('https://store.steampowered.com/app/10', {
                        appid_to_clear_from_queue: data.queue[i],
                        sessionid: g_sessionID
                    });



                    request.done(function(){

                            if (errorShown){
                                return;
                            }

                            DiscoveryQueueModal.Dismiss();

                            DiscoveryQueueModal = ShowBlockingWaitDialog('Изучение вашего списка...', 'Запрос ' + ++done + ' из ' + data.queue.length);

                        });



                    request.fail(function(){

                            errorShown = true;

                            setTimeout(() => GenerateQueue(queueNumber - 1), 1000);

                            DiscoveryQueueModal.Dismiss();

                            DiscoveryQueueModal = ShowConfirmDialog('Ошибка', 'Не удалось очистить ваш список  #' + ++done + '. Повторяю попытку через секунду.', 'Попробовать еще раз');

                        });

                    requests.push(request);
                }



                jQuery.when.apply(jQuery, requests).done(function(){

                        DiscoveryQueueModal.Dismiss();

                        if (queueNumber < 3){
                           GenerateQueue(queueNumber);
                        } else {
                            DiscoveryQueueModal = ShowConfirmDialog('Готово', 'ваш список просмотренн ' + queueNumber + ' раза', 'Перезагрузить страницу').done(function() {

                                ShowBlockingWaitDialog('Перезагрузка страницы');

                                window.location.reload();

                            });
                        }
                    });

            }).fail(function(){

                setTimeout(() => GenerateQueue(queueNumber - 1), 1000);

                DiscoveryQueueModal.Dismiss();

                DiscoveryQueueModal = ShowBlockingWaitDialog('Ошибка', 'Не удалось очистить ваш список #' + queueNumber + '. Повторяю попытку через секунду.');

            });

    };



    var buttonContainer = document.createElement('div');

    buttonContainer.className = 'discovery_queue_customize_ctn';

    buttonContainer.innerHTML = '<div class="btnv6_blue_hoverfade btn_medium" id="js-cheat-queue"><span>Обмануть ваш список</span></div><span>Система сама просмотрет быстро 3 раза рекомендуемые.</span>';



    var container = document.querySelector('.discovery_queue_customize_ctn');

    container.parentNode.insertBefore(buttonContainer, container);



    var button = document.getElementById('js-cheat-queue');

    button.addEventListener('click', function(){
            GenerateQueue(0);

        }, false);
})();
