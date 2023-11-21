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
        url: siteBaseURL + '/api/getItemsRu', method: 'GET', // Метод запроса
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
    let widthScreen = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    let viewBoxSVGLoading = '0 0 1000 1000';
    if (widthScreen > 1535) viewBoxSVGLoading = '0 0 1000 1000'; else if (widthScreen > 1395) viewBoxSVGLoading = '0 0 920 1000'; else if (widthScreen > 1195) viewBoxSVGLoading = '0 0 800 1000'; else if (widthScreen > 977) viewBoxSVGLoading = '0 0 640 1000'; else if (widthScreen > 555) viewBoxSVGLoading = '0 0 800 1000'; else if (widthScreen > 399) viewBoxSVGLoading = '0 0 690 1000'; else if (widthScreen > 350) viewBoxSVGLoading = '0 0 600 1000'; else viewBoxSVGLoading = '0 0 500 1000';
    let svgLoading = $('#svg_loading')

    svgLoading.attr('viewBox', viewBoxSVGLoading);
}

//открытие меню
function openPopUp(el, event) {
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
    gsap.to($('.bg_black_pop_up_windows_on_the_right_darkening_enter'), {
        yPercent: 100, duration: 1, ease: Power2.easeInOut
    })
    gsap.to($('#svg_loading rect'), {
        yPercent: 100, duration: 1, ease: Power2.easeInOut
    })

    document.body.style.overflow = 'auto';
});
$('html #yes').click(function () {
    let sessionObject = JSON.parse(localStorage.getItem("session"))
    document.body.style.overflow = "hidden";
    sessionObject.result = "yes"
    localStorage.setItem("session", JSON.stringify(sessionObject))

    if ($("#is_homepage").length === 0) {
        $('.top-775px').css('top', '400px')
    }

    let container = $('html #enter')
    let svg_loading = $('html #svg_loading rect')
    let svg_container = $('html #main__img_div')
    svg_container.addClass('main__img_div_enter')
    svg_container.removeClass('main__img_div')
    gsap.to(container.find('.top-775px'), {
        opacity: 1, duration: 3
    })

    let timeline = gsap.timeline();
    // Добавление анимации к таймлайну
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
            yPercent: 18, duration: 1.5, ease: Power2.easeInOut
        }, 5.5).to(svg_loading, {
        height: 0, duration: 5, ease: Power2.easeInOut
    }, 6).to($('.bg_black_pop_up_windows_on_the_right_darkening_enter'), {
        yPercent: 100, duration: 3, ease: Power2.easeInOut
    }, 7.7).to(container.find('.top-775px, nav'), {
        opacity: 0, duration: .5, ease: Power2.easeInOut
    }, 7.7).from($('.enter-show'), {
        yPercent: 100, duration: 2, ease: Power2.easeInOut
    }, 9);
    // // Запуск таймлайна
    timeline.play();
    setTimeout(function () {
        //        svg_container.css('display', 'block')
        //        svg_container.find('.imageHolderMain').css('opacity', 0)
        svg_container.find('.main__img').css('opacity', 0)
        svg_container.css('z-index', '19')
    }, 1500)
    setTimeout(function () {
        svg_container.addClass('main__img_div')
        svg_container.removeClass('main__img_div_enter')
        svg_container.find('.main__img').css('opacity', 1)
        $('#main__img_div .layer').css('opacity', 1)
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
        let heightClass = 'height-' + distanceToBottom + 'px';
        // Добавление класса к текущему элементу
        //        $element.addClass(heightClass);
        // Применение стиля высоты к текущему элементу с добавленным классом
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
new AirDatepicker('#reserve-date', {
    position: 'left center',
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

    if (check) {

        let formReserve = {};
        switch (type) {
            case 'standard': {
                formReserve = {
                    type: type,
                    newsName: '',
                    mug: $(`input[type="radio"][name="reserve-mug"]:checked`).val(),
                    name: reserveName.val(),
                    telOrEmail: reserveTelEmail.val(),
                    numberOfGuests: reserveCount.val(),
                    message: reserveMessage.val(),
                    firstBasket: ''
                }

                console.log('-----------------standard')
                break;
            }
            case 'news': {
                // ДОДЕЛАТЬ ОТПРАВКУ РЕЗЕРВА В НОВОСТИ И КОРЗИНУ, ПРИНИМАТЬ ДАННЫЕ В БЕКЕ И ОБРАБАТЫВАТЬ
                console.log(reserveType.text() + "reserveType.text()")
                formReserve = {
                    type: type,
                    newsName: reserveType.text(),
                    mug: $(`input[type="radio"][name="reserve-mug"]:checked`).val(),
                    name: reserveName.val(),
                    telOrEmail: reserveTelEmail.val(),
                    numberOfGuests: reserveCount.val(),
                    message: reserveMessage.val(),
                    firstBasket: ''
                }
                console.log('-----------------news')
                break;
            }
            case 'basket': {
                formReserve = {
                    type: type,
                    newsName: '',
                    mug: $(`input[type="radio"][name="reserve-mug"]:checked`).val(),
                    name: reserveName.val(),
                    telOrEmail: reserveTelEmail.val(),
                    numberOfGuests: reserveCount.val(),
                    message: reserveMessage.val(),
                    firstBasket: localStorage.getItem("basket")
                }
                console.log('-----------------basket')
                break;
            }

        }
        console.log(formReserve)
        $.ajax({
            url: '/api/send-reserve',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(formReserve),
            success: function (data) {
                if (data) {
                    clearingFeedback();
                    animateAfterSendingFeedback('flat-button-success', 'Мы свяжемся с вами в ближайшее время');
                } else animateAfterSendingFeedback('flat-button-failure', 'Произошла ошибка, пожалуйста обновите страницу');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
                animateAfterSendingFeedback('flat-button-failure', 'Произошла ошибка, пожалуйста обновите страницу');
            }
        });
        clearingReserve();
        // Плавное скрытие внутреннего div
        changeReserveType('success', '', 0, 0)
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
            reserveType.text('Вы можете забронировать для себя место в нашей дегустационной зоне. ' +
                'Для этого заполните форму ниже. Мы свяжемся с вами в ближайшее время.');
            reserveButton.attr('onclick', 'sendDataReserve(event, \'standard\')')
            return;
        }
        case 'news': {
            reserveType.text('Резерв по новости \"' + message + '\"');
            reserveButton.attr('onclick', 'sendDataReserve(event, \'news\')')
            return;

        }
        case 'basket': {
            const reserveText = totalCountItems === 1 ? 'товара' : 'товаров';
            reserveType.text(`Резерв ${totalCountItems} ${reserveText} на сумму ${totalPrice} р`);
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
                innerDiv.text('Удачно')
            }, 1500);

            // Плавное показ внутреннего div
            function showInnerDiv() {
                gsap.to(innerDiv, {opacity: 1, duration: 1});
            }

            reserveType.toggleClass('opacity_show')
            setTimeout(function () {
                reserveType.text(`Мы свяжемся с вами в ближайшее время`);
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
                    innerDiv.text('Отправить')
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
                innerDiv.text('Ошибка')
            }, 1500);

            // Плавное показ внутреннего div
            function showInnerDiv() {
                gsap.to(innerDiv, {opacity: 1, duration: 1});
            }

            reserveType.toggleClass('opacity_show')
            setTimeout(function () {
                reserveType.text(`Произошла ошибка, пожалуйста обновить страницу`);
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
                    innerDiv.text('Отправить')
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
        let formFeedback = {
            name: feedbackName.val(),
            telOrEmail: feedbackTelEmail.val(),
            message: feedbackMessage.val()
        }

        $.ajax({
            url: '/api/send-feedback',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(formFeedback),
            success: function (data) {
                if (data) {
                    clearingFeedback();
                    animateAfterSendingFeedback('flat-button-success', 'Мы свяжемся с вами в ближайшее время');
                } else animateAfterSendingFeedback('flat-button-failure', 'Произошла ошибка, пожалуйста обновите страницу');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
                animateAfterSendingFeedback('flat-button-failure', 'Произошла ошибка, пожалуйста обновите страницу');
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
            innerDiv.text('Отправить')
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