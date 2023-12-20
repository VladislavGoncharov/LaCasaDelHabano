window.globalAllItemsOriginal = null
window.globalAllItemsOriginalMap = new Map()
$(document).ready(function () {

    let currentURL = window.location.href;
    let siteBaseURL = currentURL.substring(0, currentURL.indexOf('/', 8)); // Индекс 8 для пропуска "https://" или "http://"

    // запрос, где проверяем, заходил ли пользователь и подтверждал ли, что ему 18 лет
    $.ajax({
        url: siteBaseURL + '/api/session', method: 'GET', success: function (sessionId) {
            // console.log(sessionId); // Вывод данных о сессии
            if (localStorage.getItem("session") !== null) {
                let sessionObject = JSON.parse(localStorage.getItem("session"))
                if (sessionObject.id === sessionId && sessionObject.result === "yes") {
                } else {
                    createSessionByFirstEnter(sessionId)
                }
            } else {
                createSessionByFirstEnter(sessionId)
            }
        }, error: function (xhr, status, error) {
            console.error(status, error);
        }
    });


    setTimeout(function () {
        distanceToBottom()
    }, 100);
    $('.basket__scroll_div').overlayScrollbars({
        className: 'os-theme-dark', scrollbars: {
            clickScrolling: true
        }
    })
    scrollFunction()
    adaptationOfScreensaver()
    // document.body.style.overflow = 'hidden';
    // $('html, body').scrollTop(0);

    // скачиваем все элементы
    $.ajax({
        url: siteBaseURL + '/api/getItemsEn', method: 'GET', // Метод запроса
        dataType: 'json', // Ожидаемый формат данных
        success: function (responseData) {

            // Обработка данных, полученных с сервера
            // sortingItems(responseData, "sortByName")
            window.globalAllItemsOriginal = responseData
            getGlobalAllItems()
        }, error: function (xhr, status, error) {
            // Обработка ошибок
            console.error(status, error);
        }
    });

})

function getGlobalAllItems() { // рекурсивная функция, чтобы дождаться, когда в глобал.джс прогрузиться аякс в глобальную переменную

    if (window.globalAllItemsOriginal === null) {
        setTimeout(function () {
            getGlobalAllItems()
        }, 10);
    } else {
        allItemsOriginal = window.globalAllItemsOriginal
        allItemsCurrent = allItemsOriginal

        allItemsOriginal.forEach(function (item) {
            window.globalAllItemsOriginalMap.set(item.id, item)
        })
// Проверьте, содержит ли URL строка "catalog"
        if (window.location.href.includes("catalog")) {

            addingOriginalDataInOriginalArray(true);
            arrayFilters = getFiltersFromHashURL()
            updateDataWithCurrentFilters()
        }

        updateBasket()
    }
}

function createSessionByFirstEnter(sessionId) {
    $('#svg_loading, .bg_black_pop_up_windows_on_the_right_darkening_enter').css('display', 'block')
    $('html, body').scrollTop(0);
    document.body.style.overflow = "hidden";

    let newSessionObj = {
        id: sessionId, result: "no"
    }
    localStorage.setItem("session", JSON.stringify(newSessionObj))
}


//адаптация заставки
function adaptationOfScreensaver() {
    let svg_loadingH = $('html #svg_loading').width()
    let svg_loadingW = $('html #svg_loading').height()
    let viewBoxSVGLoading = `0 0 ${svg_loadingH} ${svg_loadingW}`;
    let svgLoading = $('#svg_loading')

    svgLoading.attr('viewBox', viewBoxSVGLoading);
}

let isScrollEnabled = true;

// Функция для переключения состояния прокрутки
function toggleScroll() {
    if (isScrollEnabled) {
        // Если прокрутка разрешена, блокируем её
        document.body.style.overflow = "hidden";
    } else {
        // Если прокрутка заблокирована, разрешаем её
        document.body.style.overflow = "auto";
    }

    // Инвертируем состояние
    isScrollEnabled = !isScrollEnabled;
}
//открытие меню
function openPopUp(el, event) {

    toggleScroll()
    if (event !== null) event.preventDefault();
    let element = $(`#${el}`);
    element.fadeToggle();
    element.children().first().toggleClass("open_pop_up");
    setTimeout(function () {
        element.find('.border_hide_left, .border_hide_right, .border_hide_center, .transform_up_text, .transform_right_text').each(function () {
            $(this).toggleClass('transform_show')
        })
        element.find('.opacity_hide_text').toggleClass('opacity_show')
    }, 700)

    if (el === 'basket') updateBasket()
    if (el === 'reserve' && !element.children().first().hasClass('open_pop_up')) {
        setTimeout(function () {
            changeReserveType('standard', '', 0, 0)
            clearingReserve()
        }, 500)
    }
}

$('#search').click(function () {
    openPopUp('search', event);
});
$('#basket').click(function () {
    openPopUp('basket', event)
});
$('.bg_black_pop_up_windows_on_the_right_dark').click(function (event) {
    event.stopPropagation();
});
$('html #no').click(function () {
    window.location.href = 'https://yandex.ru/games/category/kids'
});
$('html #yes').click(function () {

    adaptationOfScreensaver()
    let sessionObject = JSON.parse(localStorage.getItem("session"))
    document.body.style.overflow = "hidden";
    sessionObject.result = "yes"
    localStorage.setItem("session", JSON.stringify(sessionObject))

    if ($("#is_homepage").length === 0) {
        $('.top-775px').css('top', '14vh')
    }

    let container = $('html #enter')
    let svg_loading = $('html #svg_loading rect')
    let svg_container = $('html #main__img_div')
    svg_container.addClass('main__img_div_enter')
    svg_container.addClass('border-none')
    svg_container.removeClass('main__img_div')

    gsap.to(container.find('.top-775px'), {
        opacity: 1, duration: 3
    })

    let timeline = gsap.timeline();
    // Добавление анимации к таймлайну

    if ($("#is_homepage").length === 1) {
        timeline.to(container.find('.top-510px, .top-265px'), {
            opacity: 0, duration: 2
        })
            .to(container.find('.top-775px'), {
                opacity: 1, duration: 3, ease: Power2.easeInOut
            }, 0)
            .fromTo(svg_loading, {
                yPercent: 100
            }, {
                yPercent: 70, duration: 2, ease: Power2.easeInOut
            }, 1.5)
            .to(svg_loading, {
                yPercent: 40, duration: 2, ease: Power2.easeInOut
            }, 3.5)
            .to(svg_loading, {
                yPercent: 0, duration: 1.5, ease: Power2.easeInOut
            }, 5.5)
            .to(svg_loading, {
                height: 0, duration: 5, ease: Power2.easeInOut
            }, 7)
            .to($('.bg_black_pop_up_windows_on_the_right_darkening_enter'), {
                yPercent: 500, duration: 3, ease: Power2.easeInOut
            }, 7.7)
            .to(container.find('.top-775px, nav'), {
                opacity: 0, duration: .5, ease: Power2.easeInOut
            }, 7)
            .from($('.enter-show'), {
                yPercent: 100, duration: 2, ease: Power2.easeInOut
            }, 9);
    } else {

        timeline.to(container.find('.top-510px, .top-265px'), {
            opacity: 0, duration: 2
        })
            .to(container.find('.top-775px'), {
                opacity: 1, duration: 3, ease: Power2.easeInOut
            }, 0)
            .fromTo(svg_loading, {
                yPercent: 100
            }, {
                yPercent: 70, duration: 2, ease: Power2.easeInOut
            }, 1.5)
            .to(svg_loading, {
                yPercent: 40, duration: 2, ease: Power2.easeInOut
            }, 3.5)
            .to(svg_loading, {
                yPercent: 0, duration: 1.5, ease: Power2.easeInOut
            }, 5.5)
            .to(svg_loading, {
                opacity: 0, duration: 1.5, ease: Power2.easeInOut
            }, 7)
            .to($('.bg_black_pop_up_windows_on_the_right_darkening_enter'), {
                opacity: 0, duration: 1.5, ease: Power2.easeInOut, onComplete: function() {
                    $('.bg_black_pop_up_windows_on_the_right_darkening_enter').css('display', 'none');
                }
            }, 7)
            .to(container.find('.top-775px, nav'), {
                opacity: 0, duration: 1.5, ease: Power2.easeInOut
            }, 7);
    }
    // // Запуск таймлайна
    timeline.play();
    setTimeout(function () {
        svg_container.find('.main__img').css('opacity', 0)
        svg_container.css('z-index', '19')
    }, 1500)
    setTimeout(function () {
        svg_container.addClass('main__img_div')
        svg_container.removeClass('main__img_div_enter')
        svg_container.find('.main__img').css('opacity', 1)
        $('#main__img_div .layer').css('opacity', 1)
        svg_container.removeClass('border-none')

        setTimeout(function () {
            $('body').css('overflow', 'auto');
            svg_container.css('z-index', '3');
            document.body.style.overflow = "auto";
        }, 2000)
    }, 8000)
});

//функция автоматического расчета высоты элемента
function distanceToBottom() {
    $('.height-auto').each(function () {
        let $element = $(this);
        let distanceToBottom = Math.round($('body').height() - $element.position().top) + 25;

        $element.css('height', (distanceToBottom - 100));
        $element.css('pointer-events', 'none');
    });
}

// плавный скрол до верха
$('.scroll-to-top').click(function (event) {
    event.preventDefault()
    $('html, body').animate({
        scrollTop: 0
    }, 100);
});
$(window).scroll(function () {
    scrollFunction()
});
$(window).resize(function () {
    setTimeout(function () {
        distanceToBottom()
    }, 100);
});
// Обрабатываем событие нажатия на колесико мыши
$(window).on('mousedown', function (e) {
    if (e.which === 2) {
        // Если нажато колесико мыши, предотвращаем прокрутку страницы
        e.preventDefault();
    }
});

function scrollFunction() {
    let win = $(window)
    let windowBottomOpacity = win.scrollTop() + (win.innerHeight() * 0.95);
    let windowBottomTransform = win.scrollTop() + (win.innerHeight() * 0.85);
    let windowBottomScale = win.scrollTop() + (win.innerHeight() * 0.2);
    // Проверяем каждый элемент, к которому нужно добавить класс при появлении в зоне видимости
    $('.transform_up_text').each(function () {
        let elementTop = $(this).offset().top;
        if (!$(this).closest('#allMenu').length) {
            if ($(this).closest('.main__our_mug_div').length > 0) {
                if (elementTop <= (win.scrollTop() + (win.innerHeight() * 1.1))) {
                    $(this).addClass('transform_show');
                }
            } else if (elementTop <= windowBottomOpacity) {
                $(this).addClass('transform_show');
            }
        }
    });
    $('.opacity_hide_text').each(function () {
        let elementTop = $(this).offset().top;
        if (!$(this).closest('#allMenu').length) if (elementTop <= windowBottomOpacity) {
            $(this).addClass('opacity_show');
        }
    });
    $('[class*=border_hide]').each(function () {
        let elementTop = $(this).offset().top;
        if (!$(this).closest('#allMenu').length) if (elementTop <= windowBottomOpacity) {
            $(this).addClass('transform_show');
        }
    });
}

//создание курсора
let customCursor = $('<div>', {
    id: 'custom-cursor', class: 'custom-cursor'
});
$('body').append(customCursor);
$(document).mousemove(function (event) {
    $('#custom-cursor').css({
        left: (event.clientX - 12) + 'px', top: (event.clientY - 12) + 'px'
    });
});
let $animationTime = 1000;
if (window.location.pathname.includes('catalog')) $animationTime = 500
// плавный скролл
SmoothScroll({
    // Время скролла 400 = 0.4 секунды
    animationTime: $animationTime, // Размер шага в пикселях
    stepSize: 100, // Дополнительные настройки:
    // Ускорение
    accelerationDelta: 20, // Максимальное ускорение
    accelerationMax: 2, // Поддержка клавиатуры
    keyboardSupport: true, // Шаг скролла стрелками на клавиатуре в пикселях
    arrowScroll: 50, // Pulse (less tweakable)
    // ratio of "tail" to "acceleration"
    pulseAlgorithm: true, pulseScale: 4, pulseNormalize: 1, // Поддержка тачпада
    touchpadSupport: true
})
// Запрещаем только горизонтальный скролл на всей странице
document.body.addEventListener('wheel', function (e) {
    if (e.deltaX !== 0) {
        e.preventDefault();
    }
}, {
    passive: false
});
//запрет горизонтального скрола
//$(document.body).on('mousewheel', function(e) {
//        e.preventDefault();
//      e.stopPropagation();
//      var max = this.scrollWidth - this.offsetWidth; // this might change if you have dynamic content, perhaps some mutation observer will be useful here
//
//      if (this.scrollLeft + e.deltaX < 0 || this.scrollLeft + e.deltaX > max) {
//        this.scrollLeft = Math.max(0, Math.min(max, this.scrollLeft + e.deltaX));
//      }
//    },{ passive: false });
//дата в резерве

let position = 'left center'
if (document.documentElement.clientWidth < 1000) position = 'bottom center'

new AirDatepicker('#reserve-date', {
    position: position,
    minDate: new Date(),
    maxDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    buttons: [{
        content: 'Сегодня', className: 'flat-button flat-button-bg-light', onClick: (dp) => {
            let date = new Date();
            dp.selectDate(date);
            dp.setViewDate(date);
        }
    }],
    autoClose: true,
    onSelect: function (date) {
        if (date.formattedDate === undefined) reserveDate.addClass('input-block')
        else reserveDate.removeClass('input-block')

    }
});


//авто настройка высоты и ширины картинок в карточках товаров
window.autoWidthImgInCardItems = function () {
    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    let cardImg = $('.catalog__card_img_div')
    cardImg.css('width', 'initial')

    if (screenWidth > 2000) {
        cardImg.css('height', '455px')
    } else {
        cardImg.css('height', cardImg.css('width'))
    }
}

//проверка ввода данных в резерве
let reserveType = $('#reserve-type')
let reserveName = $('#reserve-name')
let reserveTelEmail = $('#reserve-tel-email')
let reserveDate = $('#reserve-date')
let reserveCount = $('#reserve-count')
let reserveMessage = $('#reserve-message')
let reserveButton = $('#reserve-button')
let reserveMug = $(`input[type="radio"][name="reserve-mug"]`)


reserveName.on('input', function (event) {
    let inputValue = event.target.value;
    // Заменяем цифры на пустую строку
    inputValue = inputValue.replace(/\d/g, '');
    reserveName.val(inputValue);

    if (reserveName.length > 100) reserveName.addClass('input-block')
    else reserveName.removeClass('input-block')

    console.log(inputValue);
});
reserveTelEmail.on('input', function (event) {
    let inputValue = event.target.value;

    // Регулярное выражение для проверки адреса электронной почты
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Регулярное выражение для проверки номера телефона (простой пример)
    let phoneRegex = /^(\+7|8)[0-9]{10}$/;

    if (emailRegex.test(inputValue) && inputValue.length <= 100 || phoneRegex.test(inputValue) && inputValue.length <= 100) {
        reserveTelEmail.removeClass('input-block')
        console.log("reserveTelEmail.removeClass('input-block')")
    } else {
        reserveTelEmail.addClass('input-block')
        console.log("reserveTelEmail.addClass('input-block')")
    }
    console.log(event.target.value)
})
reserveDate.on('input', function (event) {
    let inputValue = event.target.value
    $(this).val('');
    $(this).removeClass('input-block');
    console.log(event.target.value)
})
reserveCount.on('input', function (event) {
    let inputValue = event.target.value

    // Регулярное выражение для проверки ввода от 1 до 15
    let validInput = /^(1[0-5]|[1-9])$/; // Позволяет вводить числа от 1 до 15

    if (validInput.test(inputValue)) {
        reserveCount.removeClass('input-block')
        console.log("reserveCount.removeClass('input-block')")
    } else {
        reserveCount.addClass('input-block')
        console.log("reserveCount.addClass('input-block')")
    }
    console.log(event.target.value)
})
reserveMessage.on('input', function (event) {
    console.log(event.target.value)
})
reserveMug.on('change', function (event) {
    console.log(event.target.value)
})

function sendDataReserve(event, type) {
// reserveButton.on('click', function (event) {
    let check = true;
    event.preventDefault()

    if (reserveName.val().length === 0 || reserveName.hasClass('input-block')) {
        reserveName.addClass('input-block')
        check = false;
    }
    if (reserveTelEmail.val().length === 0 || reserveTelEmail.hasClass('input-block')) {
        reserveTelEmail.addClass('input-block')
        check = false;
    }
    if (reserveDate.val().length === 0 || reserveDate.hasClass('input-block')) {
        reserveDate.addClass('input-block')
        check = false;
    }
    if (reserveCount.val().length === 0 || reserveCount.hasClass('input-block')) {
        reserveCount.addClass('input-block')
        check = false;
    }
    console.log(reserveDate.val())
    if (check) {
        let mugName = $(`input[type="radio"][name="reserve-mug"]:checked`).val()
        let formReserve = new FormData();
        formReserve.append('type', type)
        formReserve.append('datetime', reserveDate.val())
        formReserve.append('mug', mugName)
        formReserve.append('name', reserveName.val())
        formReserve.append('telOrEmail', reserveTelEmail.val())
        formReserve.append('numberOfGuests', reserveCount.val())
        formReserve.append('message', reserveMessage.val())
        switch (type) {
            case 'standard': {
                formReserve.append('newsName', '')
                formReserve.append('firstBasket', '')

                console.log('-----------------standard')
                break;
            }
            case 'news': {
                // ДОДЕЛАТЬ ОТПРАВКУ РЕЗЕРВА В НОВОСТИ И КОРЗИНУ, ПРИНИМАТЬ ДАННЫЕ В БЕКЕ И ОБРАБАТЫВАТЬ
                console.log(reserveType.text() + "reserveType.text()")
                formReserve.append('newsName', reserveType.text())
                formReserve.append('firstBasket', '')
                console.log('-----------------news')
                break;
            }
            case 'basket': {
                formReserve.append('newsName', '')
                formReserve.append('firstBasket', localStorage.getItem("basket"))

                console.log('-----------------basket')
                break;
            }

        }
        console.log(formReserve)
        console.log(JSON.stringify(formReserve))
        $.ajax({
            url: '/api/send-reserve',
            type: 'POST',
            processData: false,
            contentType: false,
            data: formReserve,
            success: function (data) {
                if (data) {
                    clearingReserve();
                    // Плавное скрытие внутреннего div
                    changeReserveType('success', '', 0, 0)
                    localStorage.removeItem('basket')
                } else changeReserveType('failure', '', 0, 0);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
                changeReserveType('failure', '', 0, 0);;
            }
        });
    }
}

// Список элементов, которые нужно анимировать
const elementsToAnimate = [reserveName, reserveTelEmail, reserveDate, reserveCount, reserveMessage];

function clearingReserve() {

    $(`input[type="radio"][name="reserve-mug"][value="kuznechny"]`).prop('checked', true)
    // Вызов функции для анимации элементов
    elementsToAnimate.forEach(element => {
        element.toggleClass('opacity_show')
        setTimeout(function () {
            element.toggleClass('opacity_show')
        }, 1500);
        // gsap.to(element, { opacity: 0, duration: 1.5, onComplete: () => {
        //         gsap.to(element, { opacity: 1, duration: 1.5 });
        //     }});
    });

// Очистка значений через setTimeout
    setTimeout(function () {
        elementsToAnimate.forEach(element => {
            element.val('').text('');
            element.removeClass('input-block')
        });
    }, 1500);
}

function changeReserveType(type, message, totalCountItems, totalPrice) {
    switch (type) {
        case 'standard': {
            reserveType.text('You can book a place for yourself in our tasting area. ' +
                'To do this, fill out the form below. We will contact you as soon as possible.');
            reserveButton.attr('onclick', 'sendDataReserve(event, \'standard\')')
            return;
        }
        case 'news': {
            reserveType.text('Reserve for news \"' + message + '\"');
            reserveButton.attr('onclick', 'sendDataReserve(event, \'news\')')
            return;

        }
        case 'basket': {
            const reserveText = totalCountItems === 1 ? 'product' : 'products';
            reserveType.text(`Reserve ${totalCountItems} ${reserveText} for the amount of ${totalPrice} р`);
            reserveType.append(document.createElement('br'))
            reserveType.append(document.createElement('br'))
            reserveType.append(document.createElement('br'))
            reserveButton.attr('onclick', 'sendDataReserve(event, \'basket\')')
            return;
        }
        case 'success': {

            let innerDiv = reserveButton.find('div')


            gsap.to(innerDiv, {opacity: 0, duration: 1.5, onComplete: showInnerDiv});
            setTimeout(function () {
                reserveButton.addClass('flat-button-success')
                innerDiv.text('Successfully')
            }, 1500);

            // Плавное показ внутреннего div
            function showInnerDiv() {
                gsap.to(innerDiv, {opacity: 1, duration: 1});
            }

            reserveType.toggleClass('opacity_show')
            setTimeout(function () {
                reserveType.text(`We will contact you as soon as possible`);
                reserveType.append(document.createElement('br'))
                reserveType.append(document.createElement('br'))
                reserveType.append(document.createElement('br'))
                reserveType.toggleClass('opacity_show')
            }, 1500);
            setTimeout(function () {
                reserveType.toggleClass('opacity_show')
                setTimeout(function () {
                    changeReserveType('standard', '', 0, 0)
                    reserveType.toggleClass('opacity_show')
                }, 1500);

                gsap.to(innerDiv, {opacity: 0, duration: 1, onComplete: showInnerDiv});
                setTimeout(function () {
                    reserveButton.removeClass('flat-button-success')
                    innerDiv.text('Send')
                }, 1000)

                // Плавное показ внутреннего div
                function showInnerDiv() {
                    gsap.to(innerDiv, {opacity: 1, duration: 1});
                }


            }, 20000);
            reserveButton.attr('onclick', 'sendDataReserve(event, \'standard\')')
            return;
        }
        case 'failure': {

            let innerDiv = reserveButton.find('div')


            gsap.to(innerDiv, {opacity: 0, duration: 1.5, onComplete: showInnerDiv});
            setTimeout(function () {
                reserveButton.addClass('flat-button-failure')
                innerDiv.text('Mistake')
            }, 1500);

            // Плавное показ внутреннего div
            function showInnerDiv() {
                gsap.to(innerDiv, {opacity: 1, duration: 1});
            }

            reserveType.toggleClass('opacity_show')
            setTimeout(function () {
                reserveType.text(`An error has occurred, please refresh the page`);
                reserveType.append(document.createElement('br'))
                reserveType.append(document.createElement('br'))
                reserveType.append(document.createElement('br'))
                reserveType.toggleClass('opacity_show')
            }, 1500);
            setTimeout(function () {
                reserveType.toggleClass('opacity_show')
                setTimeout(function () {
                    changeReserveType('standard', '', 0, 0)
                    reserveType.toggleClass('opacity_show')
                }, 1500);

                gsap.to(innerDiv, {opacity: 0, duration: 1, onComplete: showInnerDiv});
                setTimeout(function () {
                    reserveButton.removeClass('flat-button-failure')
                    innerDiv.text('Send')
                }, 1000)

                // Плавное показ внутреннего div
                function showInnerDiv() {
                    gsap.to(innerDiv, {opacity: 1, duration: 1});
                }


            }, 20000);
            reserveButton.attr('onclick', 'sendDataReserve(event, \'standard\')')
            return;
        }
    }
}

//резерв корзины
function reserveBasket(totalCountItems, totalPrice) {
    openPopUp('basket', event)
    setTimeout(function () {
        openPopUp('reserve', null)
    }, 500)
    changeReserveType('basket', '', totalCountItems, totalPrice)
}

//резерв новостей
function reserveNews(message) {
    openPopUp('reserve', null)
    changeReserveType('news', message, 0, 0)
}

//отправить Обратную связь


let feedbackName = $('#feedback-name')
let feedbackTelEmail = $('#feedback-tel-email')
let feedbackMessage = $('#feedback-message')
let feedbackButton = $('#feedback-button')

function sendFeedback(event) {
    let check = true;
    if (event !== null) event.preventDefault();

    if (feedbackName.val().length === 0 || feedbackName.hasClass('input-block')) {
        feedbackName.addClass('input-block')
        check = false;
    }
    if (feedbackTelEmail.val().length === 0 || feedbackTelEmail.hasClass('input-block')) {
        feedbackTelEmail.addClass('input-block')
        check = false;
    }

    if (check) {

        // animateAfterSendingFeedback('flat-button-failure','Произошла ошибка, пожалуйста обновить страницу');
        // Плавное скрытие внутреннего div
        let formFeedback = new FormData()
        formFeedback.append('name', feedbackName.val())
        formFeedback.append('telOrEmail', feedbackTelEmail.val())
        formFeedback.append('message', feedbackMessage.val())

        $.ajax({
            url: '/api/send-feedback',
            type: 'POST',
            processData: false,
            contentType: false,
            data: formFeedback,
            success: function (data) {
                if (data) {
                    clearingFeedback();
                    animateAfterSendingFeedback('flat-button-success', 'We will contact you as soon as possible');
                }
                else animateAfterSendingFeedback('flat-button-failure', 'An error has occurred, please refresh the page');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
                animateAfterSendingFeedback('flat-button-failure', 'An error has occurred, please refresh the page');
            }
        });
        console.log('-----------------')
        console.log(feedbackName.val())
        console.log(feedbackTelEmail.val())
        console.log(feedbackMessage.val())
        console.log('-----------------' + check)

    }
}

feedbackName.on('input', function (event) {
    let inputValue = event.target.value;
    // Заменяем цифры на пустую строку
    inputValue = inputValue.replace(/\d/g, '');
    feedbackName.val(inputValue);

    if (feedbackName.length > 100) feedbackName.addClass('input-block')
    else feedbackName.removeClass('input-block')

    console.log(inputValue);
});
feedbackTelEmail.on('input', function (event) {
    let inputValue = event.target.value;

    // Регулярное выражение для проверки адреса электронной почты
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Регулярное выражение для проверки номера телефона (простой пример)
    let phoneRegex = /^(\+7|8)[0-9]{10}$/;

    if (emailRegex.test(inputValue) && inputValue.length <= 100 || phoneRegex.test(inputValue) && inputValue.length <= 100) {
        feedbackTelEmail.removeClass('input-block')
        console.log("feedbackTelEmail.removeClass('input-block')")
    } else {
        feedbackTelEmail.addClass('input-block')
        console.log("feedbackTelEmail.addClass('input-block')")
    }
    console.log(event.target.value)
})

// Список элементов, которые нужно анимировать
const elementsToAnimateFeedback = [feedbackName, feedbackTelEmail, feedbackMessage];

function clearingFeedback() {
    // Вызов функции для анимации элементов
    elementsToAnimateFeedback.forEach(element => {
        element.toggleClass('opacity_show')
        setTimeout(function () {
            element.toggleClass('opacity_show')
        }, 1500);
    });

    // Очистка значений через setTimeout
    setTimeout(function () {
        elementsToAnimateFeedback.forEach(element => {
            element.val('').text('');
            element.removeClass('input-block')
        });
    }, 1500);
}

function animateAfterSendingFeedback(cssClass, message) {
    let innerDiv = feedbackButton.find('div')


    gsap.to(innerDiv, {opacity: 0, duration: 1.5, onComplete: showInnerDiv});
    setTimeout(function () {
        feedbackButton.addClass(cssClass)
        innerDiv.text(message)
    }, 1500);

    // Плавное показ внутреннего div
    function showInnerDiv() {
        gsap.to(innerDiv, {opacity: 1, duration: 1});
    }

    setTimeout(function () {

        gsap.to(innerDiv, {opacity: 0, duration: 1, onComplete: showInnerDiv});
        setTimeout(function () {
            feedbackButton.removeClass(cssClass)
            innerDiv.text('Send')
        }, 1000)

        // Плавное показ внутреннего div
        function showInnerDiv() {
            gsap.to(innerDiv, {opacity: 1, duration: 1});
        }
    }, 20000);
}

$('html #switchLang').on('click', function (event) {
    event.preventDefault()

    if (localStorage.getItem("basket") !== null)
        localStorage.removeItem('basket');

    let currentURL = window.location.href;
    let newURL

    if (currentURL.includes('/ru')) newURL = currentURL.replace('/ru', '/en')
    else newURL = currentURL.replace('/en', '/ru')

    window.location.href = newURL
})


$('html #reserve-name, html #reserve-tel-email, html #reserve-date, html #reserve-count, html #reserve-message, html #feedback-name, html #feedback-tel-email, html #feedback-message').on('input', function () {
    let inputValue = $(this).val();
    let maxLength = 250;

    if (inputValue.length > maxLength) {
        $(this).val(inputValue.substring(0, maxLength));
    }
});