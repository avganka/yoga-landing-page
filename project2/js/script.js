window.addEventListener('DOMContentLoaded', function () {

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');

        }
    }
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function (e) {
        let target = e.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    let hours = document.querySelector('.hours'),
        minutes = document.querySelector('.minutes'),
        seconds = document.querySelector('.seconds');

    function timer() {
        let startHours = 18;
        let startMinutes = 20;
        let startSeconds = 12;
        let startTime = Date.now();
        let duration = ((startHours * 60 + startMinutes) * 60 + startSeconds) * 1000;

        let countdown = setInterval(function () {
            let diff = duration - (Date.now() - startTime);
            let hoursTimer = Math.floor((diff / (1000 * 60 * 60)) % 24);
            let minutesTimer = Math.floor((diff / 1000 / 60) % 60);
            let secondsTimer = Math.floor((diff / 1000) % 60);

            hours.textContent = addZero(hoursTimer);
            minutes.textContent = addZero(minutesTimer);
            seconds.textContent = addZero(secondsTimer);
            if (diff <= 0) {
                clearInterval(countdown);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }, 1000);
    }

    function addZero(num) {
        if (num < 10) {
            return '0' + num;
        } else return num;
    }
    timer();

    // Модальное окно
    let more = document.querySelector('.more'),
        overlay = document.querySelector(".overlay"),
        popupClose = overlay.querySelector('.popup-close'),
        tabsMore = document.querySelectorAll('.description-btn');

    tabsMore.forEach(function (item) {
        item.addEventListener('click', showModal);
    });
    more.addEventListener('click', showModal);

    function showModal() {
        overlay.style.display = 'flex';
        this.classList.add('more-splash');
        document.body.style.overflow = "hidden";
    }
    popupClose.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = "";
    });

    //Отправка форм

    let message = {
        loading: 'Загрузка..',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так',
    };
    let modalForm = document.querySelector('.main-form'),
        bottomForm = document.getElementById('form'),
        input = document.querySelectorAll('input'),
        statusMessage = document.createElement('div');



    function sendForm(elem) {
        elem.addEventListener('submit', function (e) {
            e.preventDefault();
            statusMessage.classList.add('status');
            elem.appendChild(statusMessage);
            let formData = new FormData(elem);
            let obj = {};
            let json;
            formData.forEach(function (item, index) {
                obj[index] = item;
                json = JSON.stringify(obj);
            });

            function requestFunc(data) {
                return new Promise((resolve, reject) => {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php', true);
                    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                    console.log(data)

                    request.addEventListener('readystatechange', function () {
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState == 4) {
                            if (request.status == 200) {
                                resolve();
                            } else {
                                reject();
                            }
                        }
                    });
                    request.send(data);
                });
            };
            requestFunc(json)
                .then(() => {
                    statusMessage.textContent = message.loading;
                })
                .then(() => {
                    statusMessage.textContent = message.success;
                })
                .catch(() => {
                    statusMessage.textContent = message.failure;
                })
                .then(() => {
                    for (let i = 0; i < input.length; i++) {
                        input[i].value = "";
                    }
                })
        });
    }

    sendForm(modalForm);
    sendForm(bottomForm);

});