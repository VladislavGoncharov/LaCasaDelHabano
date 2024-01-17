//функция увеличения картинки при попадании курсора на область картинки
$('.item-img').mousemove(function (e) {
    let image = $(this).find('img');
    let containerWidth = $(this).width();
    let containerHeight = $(this).height();
    let offsetX = containerWidth - e.pageX;
    let offsetY = containerHeight - e.pageY;
    image.css({
        'transition': '0s'
        , 'transform': 'translate(' + (offsetX * 0.5) + 'px, ' + offsetY + 'px) scale(2)'
    });
});
//функция которая возвращает картинку при уходе курсора из области картинки
$('.item-img').mouseleave(function (e) {
    let image = $(this).find('img');
    image.css({
        'transition': '1s'
        , 'transform': 'translate(0) scale(1)'
    });
});

// Вызываем функцию обновления высоты при загрузке страницы и при изменении размера окна
$(window).on('load resize', function () {
    let screenWidth = document.documentElement.clientWidth;

    let $heightAlongCentralColumnElements = $('.height-along-central-column');
    let $centralColumnElement = $('.central-column');

    if (screenWidth > 768) {

        let heightAlongCentralColumnHeight2 = getElementHeight($heightAlongCentralColumnElements.find('> div:first-child'));
        let centralColumnHeight = getElementHeight($centralColumnElement);

        console.log(heightAlongCentralColumnHeight2)
        console.log(centralColumnHeight)

        if (heightAlongCentralColumnHeight2 > centralColumnHeight) {
            heightAlongCentralColumnHeight2 = heightAlongCentralColumnHeight2 + 50
            $heightAlongCentralColumnElements.css('height', heightAlongCentralColumnHeight2)
            $centralColumnElement.css('height', heightAlongCentralColumnHeight2)
        } else {
            centralColumnHeight = centralColumnHeight + 50

            $heightAlongCentralColumnElements.css('height', centralColumnHeight)
            $centralColumnElement.css('height', centralColumnHeight)
        }

        $heightAlongCentralColumnElements.find('> img:first-child').css('height', '100%')
    }
    else {

        $heightAlongCentralColumnElements.css('height', 'auto')
    }
});

function getElementHeight($element) {
    return $element.outerHeight();
}

//обработка кнопок в корзину и количество
let plusItem = $('#plus-item');
let minusItem = $('#minus-item');
let quantityOfItem = $('#quantity-of-item');
plusItem.click(function (event) {
    event.preventDefault();
    let quantity = parseInt(quantityOfItem.text());
    quantity++;
    quantityOfItem.text(quantity)
    minusItem.find('path').css('fill', 'black')
    calculationOfFinalPrice()
})
minusItem.click(function (event) {
    event.preventDefault();
    let quantity = parseInt(quantityOfItem.text());
    if (quantity > 1) {
        quantity--;
        quantityOfItem.text(quantity)
        if (quantity > 1) minusItem.find('path').css('fill', 'black')
        else minusItem.find('path').css('fill', 'grey')
    } else {
        minusItem.find('path').css('fill', 'grey')
    }
    calculationOfFinalPrice()
})


$(document).ready(function () {
    $('input[name="packagingOption"]').change(function () {
        calculationOfFinalPrice()
    });
    calculationOfFinalPrice()
});

//подсчет окончательной цены
function calculationOfFinalPrice() {
    let valueSelectedPackagingOption = $('input[name="packagingOption"]:checked').val();
    let quantity = parseInt(quantityOfItem.text());
    let priceItem = parseInt($("#endPrice").attr("data-price"));

    let endPrice = priceItem * quantity * valueSelectedPackagingOption;

    $('#endPrice').text(formatNumberWithThousandsSeparator(endPrice));
}

//функция, которая форматируем конечную цену в красивый вариант, например 1793203221 в 1 793 203 221
function formatNumberWithThousandsSeparator(number) {
    // Преобразуем число в строку и разделяем его на группы по 3 цифры с конца числа
    let parts = number.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    // Объединяем группы с разделителем тысяч и возвращаем результат
    return parts.join('.');
}


$(document).ready(function () {
    window.autoWidthImgInCardItems()
})
$(window).resize(function () {
    window.autoWidthImgInCardItems()
});


//добавить товары в корзину
function addItemInBasket(idItem, optionItem) {


    if (localStorage.getItem("basket") !== null) {

        let jsonBasket = localStorage.getItem("basket");

        // Преобразование JSON-строки в массив пар ключ-значение and Восстановление Map из массива
        let myArrayRestored = JSON.parse(jsonBasket);
        // console.log(myMapRestored);

        let quantityOfItem = parseInt($('#quantity-of-item').text());

        for (let i = 0; i < quantityOfItem; i++) {
            myArrayRestored.push({
                id: idItem,
                option: optionItem
            })
        }

        jsonBasket = JSON.stringify(myArrayRestored);

        localStorage.setItem("basket", jsonBasket);

        // Ключ "basket" существует в локальном хранилище
        // console.log("Ключ 'basket' существует:", localStorage.getItem("basket"));
    } else {

        let myArrayRestored = []


        let quantityOfItem = parseInt($('#quantity-of-item').text());

        for (let i = 0; i < quantityOfItem; i++) {
            myArrayRestored.push({
                id: idItem,
                option: optionItem
            })
        }


        // Преобразование Map в JSON-строку и сохранение в LocalStorage
        let jsonBasket = JSON.stringify(myArrayRestored);


        localStorage.setItem("basket", jsonBasket);
    }

    updateBasket()


}

function minusItemInBasketFromCatalog(idItem) {


    let jsonBasket = localStorage.getItem("basket");
    // console.log(jsonBasket);

    // Преобразование JSON-строки в массив пар ключ-значение and Восстановление Map из массива
    let basket = JSON.parse(jsonBasket);
    console.log(idItem);

    let numberDeleteItem = -1;

    for (let i = 0; i < basket.length; i++) {
        console.log(basket[i].id);

        if (basket[i].id === idItem) {
            numberDeleteItem = i;
        }
    }

    // Если нашли объект с нужным идентификатором, удаляем его
    if (numberDeleteItem !== -1) {
        basket.splice(numberDeleteItem, 1);
    }


    jsonBasket = JSON.stringify(basket);

    localStorage.setItem("basket", jsonBasket);


    updateBasket()

}

function getValueFromRadio() {
    // Используем селектор по атрибуту name и типу input радиокнопки
    let selectedValue = $(`input[type="radio"][name="packagingOption"]:checked`).attr('data-name-value');

    // Если выбрана радиокнопка, то selectedValue будет содержать ее значение, иначе undefined
    console.log(selectedValue);
    return selectedValue
}