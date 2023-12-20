
$(window).scroll(function () {
    let win = $(window)
    let windowBottomTransform = win.scrollTop() + (win.innerHeight() * 0.95);
    $('.transform_left').each(function () {
        let elementTop = $(this).offset().top;
        if (!$(this).closest('#allMenu').length)
            if (elementTop <= windowBottomTransform) {
                $(this).addClass('transform_show');
            }
    });
});



let registrationOfWholesaleCustomerName = $('#registration-of-a-wholesale-customer-name')
let registrationOfWholesaleCustomerTelEmail = $('#registration-of-a-wholesale-customer-tel-email')
let registrationOfWholesaleCustomerNameOfOrganization = $('#registration-of-a-wholesale-customer-name-of-organization')
let registrationOfWholesaleCustomerCity = $('#registration-of-a-wholesale-customer-city')
let registrationOfWholesaleCustomerSubjectOfLetter = $('#registration-of-a-wholesale-customer-subject-of-letter')
let registrationOfWholesaleCustomerMessage = $('#registration-of-a-wholesale-customer-message')
let registrationOfWholesaleCustomerButton = $('#registration-of-a-wholesale-customer-button')

function sendRegistration(event) {
    let check = true;
    if (event !== null) event.preventDefault();

    if (registrationOfWholesaleCustomerName.val().length === 0 || registrationOfWholesaleCustomerName.hasClass('input-block')) {
        registrationOfWholesaleCustomerName.addClass('input-block')
        check = false;
    }
    if (registrationOfWholesaleCustomerTelEmail.val().length === 0 || registrationOfWholesaleCustomerTelEmail.hasClass('input-block')) {
        registrationOfWholesaleCustomerTelEmail.addClass('input-block')
        check = false;
    }

    if (registrationOfWholesaleCustomerNameOfOrganization.val().length === 0 || registrationOfWholesaleCustomerNameOfOrganization.hasClass('input-block')) {
        registrationOfWholesaleCustomerNameOfOrganization.addClass('input-block')
        check = false;
    }

    if (registrationOfWholesaleCustomerCity.val().length === 0 || registrationOfWholesaleCustomerCity.hasClass('input-block')) {
        registrationOfWholesaleCustomerCity.addClass('input-block')
        check = false;
    }

    if (registrationOfWholesaleCustomerSubjectOfLetter.val().length === 0 || registrationOfWholesaleCustomerSubjectOfLetter.hasClass('input-block')) {
        registrationOfWholesaleCustomerSubjectOfLetter.addClass('input-block')
        check = false;
    }

    if (check) {

        // animateAfterSendingRegistration('flat-button-failure','Произошла ошибка, пожалуйста обновить страницу');
        // Плавное скрытие внутреннего div
        let formRegistration = new FormData()
            formRegistration.append('name', registrationOfWholesaleCustomerName.val())
            formRegistration.append('telOrEmail', registrationOfWholesaleCustomerTelEmail.val())
            formRegistration.append('nameOfOrganization', registrationOfWholesaleCustomerNameOfOrganization.val())
            formRegistration.append('city', registrationOfWholesaleCustomerCity.val())
            formRegistration.append('subjectOfLetter', registrationOfWholesaleCustomerSubjectOfLetter.val())
            formRegistration.append('message', registrationOfWholesaleCustomerMessage.val())

        $.ajax({
            url: '/api/send-registration-of-wholesale-customer',
            type: 'POST',
            processData: false,
            contentType: false,
            data: formRegistration,
            success: function (data) {
                if (data) {
                    clearingRegistration();
                    animateAfterSendingRegistration('flat-button-success', 'Мы свяжемся с вами в ближайшее время');
                }
                else animateAfterSendingRegistration('flat-button-failure', 'Произошла ошибка, пожалуйста обновите страницу');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
                animateAfterSendingRegistration('flat-button-failure', 'Произошла ошибка, пожалуйста обновите страницу');
            }
        });

    }
}

registrationOfWholesaleCustomerName.on('input', function (event) {
    let inputValue = event.target.value;
    // Заменяем цифры на пустую строку
    inputValue = inputValue.replace(/\d/g, '');
    registrationOfWholesaleCustomerName.val(inputValue);

    if (registrationOfWholesaleCustomerName.length > 100) registrationOfWholesaleCustomerName.addClass('input-block')
    else registrationOfWholesaleCustomerName.removeClass('input-block')

    console.log(inputValue);
});
registrationOfWholesaleCustomerNameOfOrganization.on('input', function (event) {
    let inputValue = event.target.value;
    // Заменяем цифры на пустую строку
    inputValue = inputValue.replace(/\d/g, '');
    registrationOfWholesaleCustomerNameOfOrganization.val(inputValue);

    if (registrationOfWholesaleCustomerNameOfOrganization.length > 100) registrationOfWholesaleCustomerNameOfOrganization.addClass('input-block')
    else registrationOfWholesaleCustomerNameOfOrganization.removeClass('input-block')

    console.log(inputValue);
});
registrationOfWholesaleCustomerCity.on('input', function (event) {
    let inputValue = event.target.value;
    // Заменяем цифры на пустую строку
    inputValue = inputValue.replace(/\d/g, '');
    registrationOfWholesaleCustomerCity.val(inputValue);

    if (registrationOfWholesaleCustomerCity.length > 100) registrationOfWholesaleCustomerCity.addClass('input-block')
    else registrationOfWholesaleCustomerCity.removeClass('input-block')

    console.log(inputValue);
});
registrationOfWholesaleCustomerSubjectOfLetter.on('input', function (event) {
    let inputValue = event.target.value;
    // Заменяем цифры на пустую строку
    inputValue = inputValue.replace(/\d/g, '');
    registrationOfWholesaleCustomerSubjectOfLetter.val(inputValue);

    if (registrationOfWholesaleCustomerSubjectOfLetter.length > 100) registrationOfWholesaleCustomerSubjectOfLetter.addClass('input-block')
    else registrationOfWholesaleCustomerSubjectOfLetter.removeClass('input-block')

    console.log(inputValue);
});
registrationOfWholesaleCustomerTelEmail.on('input', function (event) {
    let inputValue = event.target.value;

    // Регулярное выражение для проверки адреса электронной почты
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Регулярное выражение для проверки номера телефона (простой пример)
    let phoneRegex = /^(\+7|8)[0-9]{10}$/;

    if (emailRegex.test(inputValue) && inputValue.length <= 100 || phoneRegex.test(inputValue) && inputValue.length <= 100) {
        registrationOfWholesaleCustomerTelEmail.removeClass('input-block')
        console.log("registrationOfWholesaleCustomerTelEmail.removeClass('input-block')")
    } else {
        registrationOfWholesaleCustomerTelEmail.addClass('input-block')
        console.log("registrationOfWholesaleCustomerTelEmail.addClass('input-block')")
    }
    console.log(event.target.value)
})

// Список элементов, которые нужно анимировать
const elementsToAnimateRegistration =
    [registrationOfWholesaleCustomerName, registrationOfWholesaleCustomerTelEmail,
        registrationOfWholesaleCustomerNameOfOrganization, registrationOfWholesaleCustomerCity,
        registrationOfWholesaleCustomerSubjectOfLetter, registrationOfWholesaleCustomerMessage];

function clearingRegistration() {
    // Вызов функции для анимации элементов
    elementsToAnimateRegistration.forEach(element => {
        element.toggleClass('opacity_show')
        setTimeout(function () {
            element.toggleClass('opacity_show')
        }, 1500);
    });

    // Очистка значений через setTimeout
    setTimeout(function () {
        elementsToAnimateRegistration.forEach(element => {
            element.val('').text('');
            element.removeClass('input-block')
        });
    }, 1500);
}

function animateAfterSendingRegistration(cssClass, message) {
    let innerDiv = registrationOfWholesaleCustomerButton.find('div')


    gsap.to(innerDiv, {opacity: 0, duration: 1.5, onComplete: showInnerDiv});
    setTimeout(function () {
        registrationOfWholesaleCustomerButton.addClass(cssClass)
        innerDiv.text(message)
    }, 1500);

    // Плавное показ внутреннего div
    function showInnerDiv() {
        gsap.to(innerDiv, {opacity: 1, duration: 1});
    }

    setTimeout(function () {

        gsap.to(innerDiv, {opacity: 0, duration: 1, onComplete: showInnerDiv});
        setTimeout(function () {
            registrationOfWholesaleCustomerButton.removeClass(cssClass)
            innerDiv.text('Отправить')
        }, 1000)

        // Плавное показ внутреннего div
        function showInnerDiv() {
            gsap.to(innerDiv, {opacity: 1, duration: 1});
        }
    }, 20000);
}


$('html #registration-of-a-wholesale-customer-name, html #registration-of-a-wholesale-customer-tel-email, html #registration-of-a-wholesale-customer-name-of-organization, html #registration-of-a-wholesale-customer-city, html #registration-of-a-wholesale-customer-subject-of-letter, html #registration-of-a-wholesale-customer-message').on('input', function () {
    let inputValue = $(this).val();
    let maxLength = 250;

    if (inputValue.length > maxLength) {
        $(this).val(inputValue.substring(0, maxLength));
    }
});

$('#downloadButtonDocument').on('click', function(event) {
    // Создаем элемент <a> для скачивания файла
    event.preventDefault()
    let downloadLink = $('<a></a>');

    // Устанавливаем атрибуты элемента <a>
    downloadLink.attr('href', '/document/price_list_on_18_11_23.xls');
    downloadLink.attr('download', 'price_list_on_18_11_23.xls');

    // Добавляем элемент в DOM (временно)
    $('body').append(downloadLink);

    // Имитируем клик по элементу
    downloadLink[0].click();

    // Удаляем элемент из DOM
    downloadLink.remove();
});