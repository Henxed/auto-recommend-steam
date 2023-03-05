// ==UserScript==
// @name            Steam Recommended Auto-Skip
// @namespace       https://github.com/Henxed/auto-recommend-steam
// @version         0.2
// @downloadURL     https://github.com/Henxed/auto-recommend-steam/raw/master/autorecommend-EN.user.js
// @updateURL       https://github.com/Henxed/auto-recommend-steam/raw/master/autorecommend-EN.user.js
// @description     Go here https://store.steampowered.com/explore and click "Cheat your queue"
// @author          Henxed
// @include         https://store.steampowered.com/explore
// @include         https://store.steampowered.com/explore/
// @run-at          document-start|document-end
// @grant           unsafeWindow
// @unwrap
// ==/UserScript==
(function() {
    var DiscoveryQueueModal,
        GenerateQueue = function(queueNumber){

        var queueNumberMax = parseInt(document.getElementById("queue-number").value);
        if (queueNumberMax <= 0) {
          alert("Enter a correct value");
          return;
        }

        if (DiscoveryQueueModal){
            DiscoveryQueueModal.Dismiss();
        }

        DiscoveryQueueModal = ShowBlockingWaitDialog('Creating list...', 'Viewing recommended #' + ++queueNumber);

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

                            DiscoveryQueueModal = ShowBlockingWaitDialog('Analyzing your queue...', 'Request ' + ++done + ' of ' + data.queue.length);

                        });

                    request.fail(function(){

                            errorShown = true;

                            setTimeout(() => GenerateQueue(queueNumber - 1), 1000);

                            DiscoveryQueueModal.Dismiss();

                            DiscoveryQueueModal = ShowConfirmDialog('Error', 'Failed to clear your queue  #' + ++done + '. Retrying in a second.', 'Try again');

                        });

                    requests.push(request);
                }

                jQuery.when.apply(jQuery, requests).done(function(){

                        DiscoveryQueueModal.Dismiss();

                        if (queueNumber < queueNumberMax){
                           GenerateQueue(queueNumber);
                        } else {
                            DiscoveryQueueModal = ShowConfirmDialog('Done', 'Your queue has been viewed ' + queueNumber + ' times', 'Reload page').done(function() {

                                ShowBlockingWaitDialog('Перезагрузка страницы');

                                window.location.reload();

                            });
                        }
                    });

            }).fail(function(){

                setTimeout(() => GenerateQueue(queueNumber - 1), 1000);

                DiscoveryQueueModal.Dismiss();

                DiscoveryQueueModal = ShowBlockingWaitDialog('Error', 'Failed to clear your queue #' + queueNumber + '. Retrying in a second.');

            });

    };

    var buttonContainer = document.createElement('div');
    buttonContainer.className = 'discovery_queue_customize_ctn';
   buttonContainer.innerHTML = '<div class="btnv6_blue_hoverfade btn_medium" id="js-cheat-queue"><span>Trick your list</span></div> of recommended games in quantity: <span class="input gray_bevel"><input type="number" id="queue-number" min="1" step="1" value="1" /></span> very quickly';

    var container = document.querySelector('.discovery_queue_customize_ctn');
    container.parentNode.insertBefore(buttonContainer, container);

    var button = document.getElementById('js-cheat-queue');
    button.addEventListener('click', function(){
            GenerateQueue(0);
    }, false);
})();
