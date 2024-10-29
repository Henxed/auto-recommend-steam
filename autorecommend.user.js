// ==UserScript==
// @name            Steam автопрокрутка списка рекомендуемых игр (Multi-languages) | Steam Recommended Auto-Skip (Multi-languages)
// @namespace       https://github.com/Henxed/auto-recommend-steam
// @version         0.3.1
// @downloadURL     https://github.com/Henxed/auto-recommend-steam/raw/master/autorecommend.user.js
// @updateURL       https://github.com/Henxed/auto-recommend-steam/raw/master/autorecommend.user.js
// @description     Переходи сюды https://store.steampowered.com/explore и нажимаем "Обмануть ваш список"
// @author          Henxed
// @include         https://store.steampowered.com/explore
// @include         https://store.steampowered.com/explore/
// @run-at          document-start|document-end
// @grant           unsafeWindow
// @unwrap
// ==/UserScript==
(function() {
    const languages = {
      RU: {
          createList: 'Создание списка...',
          viewRecommended: 'Просмотр рекомендуемых #',
          enterCorrectValue: 'Введите корректное значение',
          studyingYourList: 'Изучаю ваш список...',
          request: 'Запрос ',
          error: 'Ошибка',
          failedToClear: 'Не удалось очистить ваш список  #',
          retryingInSecond: 'Повторите попытку через некоторое время.',
          retry: 'Попробовать еще раз',
          done: 'Готово',
          cheat: 'Обмануть',
          cheat_desc: 'ваш список рекомендуемых игр в количестве:',
          yourListViewed: 'Ваш список просмотрен ',
          times: ' раз(а)',
          reloadPage: 'Перезагрузить страницу'
      },
      EN: {
          createList: 'Creating list...',
          viewRecommended: 'Viewing recommended #',
          enterCorrectValue: 'Please enter a valid value',
          studyingYourList: 'Studying your list...',
          request: 'Request ',
          error: 'Error',
          failedToClear: 'Failed to clear your list #',
          retryingInSecond: 'Please try again later.',
          retry: 'Retry',
          done: 'Done',
          cheat: 'Cheat',
          cheat_desc: 'your recommended games list by:',
          yourListViewed: 'Your list has been viewed ',
          times: ' times',
          reloadPage: 'Reload the page'
      },
      KZ: {
          createList: 'Тізімді жасау...',
          viewRecommended: 'Ұсынылғандарды қарау #',
          enterCorrectValue: 'Дұрыс мәнді енгізіңіз',
          studyingYourList: 'Тізімді зерттеу...',
          request: 'Сұрау ',
          error: 'Қате',
          failedToClear: 'Тізімді өшіру мүмкін болмады #',
          retryingInSecond: 'Кейінірек қайталап көріңіз.',
          retry: 'Қайталау',
          done: 'Аяқталды',
          cheat: 'Алдау',
          cheat_desc: 'сіздің ұсынылған ойындар тізімін:',
          yourListViewed: 'Сіздің тізіміңіз ',
          times: ' рет қаралды',
          reloadPage: 'Бетті қайта жүктеу'
      },
      ES: {
          createList: 'Creando lista...',
          viewRecommended: 'Viendo recomendados #',
          enterCorrectValue: 'Ingrese un valor válido',
          studyingYourList: 'Estudiando tu lista...',
          request: 'Solicitud ',
          error: 'Error',
          failedToClear: 'No se pudo borrar tu lista #',
          retryingInSecond: 'Inténtalo de nuevo más tarde.',
          retry: 'Reintentar',
          done: 'Hecho',
          cheat: 'Engañar',
          cheat_desc: 'tu lista de juegos recomendados por:',
          yourListViewed: 'Tu lista ha sido vista ',
          times: ' veces',
          reloadPage: 'Recargar la página'
      },
      CN: {
          createList: '创建列表...',
          viewRecommended: '查看推荐 #',
          enterCorrectValue: '请输入有效值',
          studyingYourList: '研究您的列表...',
          request: '请求 ',
          error: '错误',
          failedToClear: '无法清除您的列表 #',
          retryingInSecond: '请稍后再试。',
          retry: '重试',
          done: '完成',
          cheat: '作弊',
          cheat_desc: '你的推荐游戏列表通过:',
          yourListViewed: '您的列表已被查看 ',
          times: ' 次',
          reloadPage: '重新加载页面'
      },
      JP: {
          createList: 'リストを作成中...',
          viewRecommended: 'おすすめを表示 #',
          enterCorrectValue: '有効な値を入力してください',
          studyingYourList: 'リストを調査中...',
          request: 'リクエスト ',
          error: 'エラー',
          failedToClear: 'リストをクリアできませんでした #',
          retryingInSecond: '後でもう一度やり直してください。',
          retry: '再試行',
          done: '完了',
          cheat: 'チート',
          cheat_desc: 'あなたのおすすめゲームリストを:',
          yourListViewed: 'リストが ',
          times: ' 回表示されました',
          reloadPage: 'ページを再読み込み'
      },
      AR: {
          createList: 'إنشاء قائمة...',
          viewRecommended: 'عرض التوصيات #',
          enterCorrectValue: 'يرجى إدخال قيمة صالحة',
          studyingYourList: 'دراسة قائمتك...',
          request: 'طلب ',
          error: 'خطأ',
          failedToClear: 'فشل في مسح قائمتك #',
          retryingInSecond: 'يرجى المحاولة مرة أخرى في وقت لاحق.',
          retry: 'إعادة المحاولة',
          done: 'تم',
          cheat: 'خداع',
          cheat_desc: 'قائمة الألعاب الموصى بها الخاصة بك بواسطة:',
          yourListViewed: 'تم عرض قائمتك ',
          times: ' مرات',
          reloadPage: 'إعادة تحميل الصفحة'
      },
      KR: {
          createList: '목록 생성 중...',
          viewRecommended: '추천 게임 보기 #',
          enterCorrectValue: '유효한 값을 입력하세요',
          studyingYourList: '목록을 검토 중...',
          request: '요청 ',
          error: '오류',
          failedToClear: '목록을 지울 수 없습니다 #',
          retryingInSecond: '나중에 다시 시도하십시오.',
          retry: '재시도',
          done: '완료',
          cheat: '속임수',
          cheat_desc: '추천 게임 목록을:',
          yourListViewed: '목록이 ',
          times: ' 번 조회되었습니다',
          reloadPage: '페이지 새로고침'
      },
      FR: {
          createList: 'Création de la liste...',
          viewRecommended: 'Voir les recommandations #',
          enterCorrectValue: 'Veuillez entrer une valeur valide',
          studyingYourList: 'Étude de votre liste...',
          request: 'Demande ',
          error: 'Erreur',
          failedToClear: 'Impossible d\'effacer votre liste #',
          retryingInSecond: 'Veuillez réessayer plus tard.',
          retry: 'Réessayer',
          done: 'Terminé',
          cheat: 'Tricher',
          cheat_desc: 'votre liste de jeux recommandés par:',
          yourListViewed: 'Votre liste a été vue ',
          times: ' fois',
          reloadPage: 'Recharger la page'
      },
      DE: {
          createList: 'Liste wird erstellt...',
          viewRecommended: 'Empfohlene Spiele anzeigen #',
          enterCorrectValue: 'Bitte geben Sie einen gültigen Wert ein',
          studyingYourList: 'Ihre Liste wird untersucht...',
          request: 'Anfrage ',
          error: 'Fehler',
          failedToClear: 'Ihre Liste konnte nicht gelöscht werden #',
          retryingInSecond: 'Bitte versuchen Sie es später erneut.',
          retry: 'Erneut versuchen',
          done: 'Fertig',
          cheat: 'Betrügen',
          cheat_desc: 'Ihre empfohlene Spieleliste durch:',
          yourListViewed: 'Ihre Liste wurde ',
          times: ' mal angesehen',
          reloadPage: 'Seite neu laden'
      },
      IT: {
          createList: 'Creazione della lista...',
          viewRecommended: 'Visualizzazione raccomandati #',
          enterCorrectValue: 'Inserisci un valore valido',
          studyingYourList: 'Studio della tua lista...',
          request: 'Richiesta ',
          error: 'Errore',
          failedToClear: 'Impossibile cancellare la tua lista #',
          retryingInSecond: 'Si prega di riprovare più tardi.',
          retry: 'Riprova',
          done: 'Fatto',
          cheat: 'Barare',
          cheat_desc: 'la tua lista di giochi consigliati per:',
          yourListViewed: 'La tua lista è stata visualizzata ',
          times: ' volte',
          reloadPage: 'Ricaricare la pagina'
      },
      BE: {
          createList: 'Стварэнне спісу...',
          viewRecommended: 'Прагляд рэкамендаваных #',
          enterCorrectValue: 'Увядзіце карэктнае значэнне',
          studyingYourList: 'Вывучэнне вашага спісу...',
          request: 'Запыт ',
          error: 'Памылка',
          failedToClear: 'Не ўдалося ачысціць ваш спіс #',
          retryingInSecond: 'Калі ласка, паспрабуйце яшчэ раз пазней.',
          retry: 'Паспрабаваць яшчэ раз',
          done: 'Гатова',
          cheat: 'Падмануць',
          cheat_desc: 'ваш спіс рэкамендаваных гульняў у колькасці:',
          yourListViewed: 'Ваш спіс праглядаўся ',
          times: ' раз(ы)',
          reloadPage: 'Перазагрузіць старонку'
      },
      UA: {
          createList: 'Створення списку...',
          viewRecommended: 'Перегляд рекомендованих #',
          enterCorrectValue: 'Введіть коректне значення',
          studyingYourList: 'Вивчення вашого списку...',
          request: 'Запит ',
          error: 'Помилка',
          failedToClear: 'Не вдалося очистити ваш список #',
          retryingInSecond: 'Будь ласка, спробуйте ще раз пізніше.',
          retry: 'Спробувати ще раз',
          done: 'Готово',
          cheat: 'Обманути',
          cheat_desc: 'ваш список рекомендованих ігор у кількості:',
          yourListViewed: 'Ваш список переглянуто ',
          times: ' раз(и)',
          reloadPage: 'Перезавантажити сторінку'
      },
      TR: {
          createList: 'Liste oluşturuluyor...',
          viewRecommended: 'Önerilenleri görüntüleme #',
          enterCorrectValue: 'Lütfen geçerli bir değer girin',
          studyingYourList: 'Listenizi inceliyorum...',
          request: 'İstek ',
          error: 'Hata',
          failedToClear: 'Listenizi temizleyemedi #',
          retryingInSecond: 'Lütfen daha sonra tekrar deneyin.',
          retry: 'Tekrar dene',
          done: 'Tamamlandı',
          cheat: 'Hile',
          cheat_desc: 'önerilen oyunlar listenizi:',
          yourListViewed: 'Listeniz ',
          times: ' kez görüntülendi',
          reloadPage: 'Sayfayı yenile'
      },
      AF: {
          createList: 'Skep lys...',
          viewRecommended: 'Bekyk aanbeveelings #',
          enterCorrectValue: 'Voer asseblief \'n geldige waarde in',
          studyingYourList: 'Bestudeer jou lys...',
          request: 'Versoek ',
          error: 'Fout',
          failedToClear: 'Kon nie jou lys uitvee nie #',
          retryingInSecond: 'Probeer asseblief weer later.',
          retry: 'Probeer weer',
          done: 'Klaar',
          cheat: 'Kroek',
          cheat_desc: 'jou aanbevole speletjieslys deur:',
          yourListViewed: 'Jou lys is gesien ',
          times: ' keer',
          reloadPage: 'Herlaai die bladsy'
      },
      HI: {
          createList: 'सूची बना रहा है...',
          viewRecommended: 'अनुशंसित देख रहे हैं #',
          enterCorrectValue: 'कृपया मान्य मान दर्ज करें',
          studyingYourList: 'आपकी सूची का अध्ययन कर रहा है...',
          request: 'अनुरोध ',
          error: 'त्रुटि',
          failedToClear: 'आपकी सूची को साफ़ करने में विफल रहा #',
          retryingInSecond: 'कृपया बाद में पुन: प्रयास करें।',
          retry: 'पुनः प्रयास करें',
          done: 'हो गया',
          cheat: 'धोखा',
          cheat_desc: 'आपकी अनुशंसित खेल सूची द्वारा:',
          yourListViewed: 'आपकी सूची को देखा गया है ',
          times: ' बार',
          reloadPage: 'पृष्ठ पुनः लोड करें'
      }
  };



    const userLang = navigator.language.slice(0, 2).toUpperCase();
    const lang = languages[userLang] || languages['EN'];

    let DiscoveryQueueModal;

    const GenerateQueue = (queueNumber) => {
        const queueNumberMax = parseInt(document.getElementById("queue-number").value);
        if (queueNumberMax <= 0) {
            alert(lang.enterCorrectValue);
            return;
        }

        if (DiscoveryQueueModal) {
            DiscoveryQueueModal.Dismiss();
        }

        DiscoveryQueueModal = ShowBlockingWaitDialog(lang.createList, lang.viewRecommended + ++queueNumber);

        fetch('https://store.steampowered.com/explore/generatenewdiscoveryqueue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                sessionid: g_sessionID,
                queuetype: 0
            })
        }).then(response => response.json()).then(data => {
            const requests = [];
            let done = 0;
            let errorShown;

            data.queue.forEach(appId => {
                const request = fetch('https://store.steampowered.com/app/10', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        appid_to_clear_from_queue: appId,
                        sessionid: g_sessionID
                    })
                });

                request.then(() => {
                    if (errorShown) return;
                    DiscoveryQueueModal.Dismiss();
                    DiscoveryQueueModal = ShowBlockingWaitDialog(lang.studyingYourList, lang.request + ++done + ' / ' + data.queue.length);
                }).catch(() => {
                    errorShown = true;
                    setTimeout(() => GenerateQueue(queueNumber - 1), 1000);
                    DiscoveryQueueModal.Dismiss();
                    DiscoveryQueueModal = ShowConfirmDialog(lang.error, lang.failedToClear + ++done + '. ' + lang.retryingInSecond, lang.retry);
                });

                requests.push(request);
            });

            Promise.all(requests).then(() => {
                DiscoveryQueueModal.Dismiss();
                if (queueNumber < queueNumberMax) {
                    GenerateQueue(queueNumber);
                } else {
                    DiscoveryQueueModal = ShowConfirmDialog(lang.done, lang.yourListViewed + queueNumber + lang.times, lang.reloadPage).then(() => {
                        ShowBlockingWaitDialog(lang.reloadPage);
                        window.location.reload();
                    });
                }
            });

        }).catch(() => {
            setTimeout(() => GenerateQueue(queueNumber - 1), 1000);
            DiscoveryQueueModal.Dismiss();
            DiscoveryQueueModal = ShowBlockingWaitDialog(lang.error, lang.failedToClear + queueNumber + '. ' + lang.retryingInSecond);
        });
    };

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'discovery_queue_customize_ctn';
    buttonContainer.innerHTML = `<div class="btnv6_blue_hoverfade btn_medium" id="js-cheat-queue"><span>${lang.cheat}</span></div> ${lang.cheat_desc} <span class="input gray_bevel"><input type="number" id="queue-number" min="1" step="1" value="1" /></span>`;

    const container = document.querySelector('.discovery_queue_customize_ctn');
    container.parentNode.insertBefore(buttonContainer, container);

    const button = document.getElementById('js-cheat-queue');
    button.addEventListener('click', () => {
        GenerateQueue(0);
    }, false);
})();
