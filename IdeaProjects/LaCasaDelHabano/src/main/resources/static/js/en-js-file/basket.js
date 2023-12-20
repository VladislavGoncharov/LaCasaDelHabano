function updateBasket() {
    $('#basket .os-content').children().remove() // удаляем содержимое корзины
    // $('.basket__scroll_div .os-content').children().remove() // удаляем содержимое корзины
    // обнуляем и скрываем количество товаров, которые есть/были в корзине
    // на странице каталога
    $("[id^='count_']").text(0);
    $("[id^='box_count_']").css('display', 'none');

    if (localStorage.getItem("basket") !== null) {
        let basketJSON = localStorage.getItem('basket')
        let basketJSONStringify = JSON.stringify(basketJSON);

        if (basketJSON.length > 2) {

            let basket = JSON.parse(basketJSON);

            let mapBasket = new Map()

            // перевожу корзину в Map для того, чтобы узнать количество одинаковый айтемов (одиноковый это когда опция и айди одинаково)
            basket.forEach(function (item) {
                let itemStringify = JSON.stringify(item)

                if (mapBasket.has(itemStringify)) {
                    let value = mapBasket.get(itemStringify)
                    value = parseInt(value) + 1
                    mapBasket.set(itemStringify, value)
                } else mapBasket.set(itemStringify, 1)
            })

            let totalPrice = 0
            let totalCountItems = 0


            let locationHref = window.location.href;

            let currentItemIdForPageItem
            let includesItemIdOnBasketSwitcherForPageItem = false

            if (locationHref.includes("item")) {

                currentItemIdForPageItem = $('.btn-buy--in-basket').attr('data-item-id');
                if (locationHref.includes("item") && basketJSON.includes(currentItemIdForPageItem)) {
                    includesItemIdOnBasketSwitcherForPageItem = true
                }
            }

            let cumulativeQuantityOfItems = 0
            // По новой Map создаю элементы в корзине с учетом количество добавленного товара
            // А так же считаю общую цену в зависимости от количества одинакового товара и опции (поштучно, 20 штук и тд)
            mapBasket.forEach(function (count, key) {
                let itemBasket = JSON.parse(key)
                //вытягиваю оригинальный объект из глобальной переменной
                let item = window.globalAllItemsOriginalMap.get(itemBasket.id)

                console.log(item)
                let optionKey
                let optionValue

                $.each(item.option, function (key, value) {
                    // Получаем ключ и значение из объекта option
                    if (itemBasket.option === key) {
                        optionKey = key
                        optionValue = value
                    }
                });


                if (locationHref.includes("catalog")) showCountItemsInPageCatalog(itemBasket.id, count)
                // if (includesItemIdOnBasketSwitcherForPageItem) showCountItemsInPageItem(itemBasket.id, count, currentItemIdForPageItem)
                if (includesItemIdOnBasketSwitcherForPageItem && parseInt(itemBasket.id) === parseInt(currentItemIdForPageItem))
                    cumulativeQuantityOfItems = cumulativeQuantityOfItems + count

                totalPrice = totalPrice + (parseInt(item.price) * count * parseInt(optionValue))
                totalCountItems = totalCountItems + count;

                if (isNaN(totalPrice)) {

                    console.log("localStorage.removeItem('basket')")
                    localStorage.removeItem('basket')
                    updateBasket()
                }

                createItemInBasket(item, optionKey, count)
            })


            if (cumulativeQuantityOfItems > 0) showCountItemsInPageItem(cumulativeQuantityOfItems)
            else zeroingQuantityInProductCards()


            $('#reserve-basket').attr('onclick', 'reserveBasket(' + totalCountItems + ',\'' +
                formatNumberWithThousandsSeparator(totalPrice) + '\')'  )
            $('#basket_total').css('opacity', 1)
            $('#basket_total_price').text(formatNumberWithThousandsSeparator(totalPrice))

        } else {
            basketIsEmpty()
        }

    } else {
        basketIsEmpty()
    }


}

function showCountItemsInPageCatalog(idItem, count) {

    let currentItem = $(`[id^='count_${idItem}']`).text()

    currentItem = parseInt(currentItem) + parseInt(count)

    $(`[id^='count_${idItem}']`).text(currentItem);
    $(`[id^='box_count_${idItem}']`).css('display', 'flex');


}

function showCountItemsInPageItem(showCountItemsInPageItem) {

    let btnQuantityItem = $('.btn-buy--quantity-item');
    let btnMinusItem = $('.btn-buy--minus-item');


    btnMinusItem.removeClass('btn-buy--close')
    btnQuantityItem.removeClass('btn-buy--close')

    btnQuantityItem.css('padding', '0 20%')
    btnQuantityItem.text(showCountItemsInPageItem);

    let widthBtnMinusItem = btnMinusItem.css('width')

    console.log(widthBtnMinusItem)
    if (!(widthBtnMinusItem === '40px')) btnMinusItem.animate({width: '40px'}, 200);

    console.log(parseInt(btnQuantityItem.text()))
    console.log(showCountItemsInPageItem)
    console.log(parseInt(btnQuantityItem.text()) < showCountItemsInPageItem)
    if (!(parseInt(btnQuantityItem.text()) === showCountItemsInPageItem)) {
        console.log('if (parseInt(btnQuantityItem.text()) < showCountItemsInPageItem)')
        btnQuantityItem.animate({width: '20px'}, 200);

    }
}


function basketIsEmpty() {

    let itemDiv = document.createElement('div');
    itemDiv.classList.add('text-uppercase', 'h5');

    itemDiv.innerHTML = `
         <div class="transform_show">empty</div>
   `;
    $('#basket .os-content').append(itemDiv);
    // $('.basket__scroll_div .os-content').append(itemDiv);

    $('#basket_total').css('opacity', 0)
    $('#basket_total_price').text(0)


    zeroingQuantityInProductCards()
}

//создание карточки товара в корзине
function createItemInBasket(item, option, count) {

    let disableBTN = count < 2 ? 'disable-btn' : '';

    let itemDiv = document.createElement('div');
    itemDiv.classList.add('grid-col-2', 'mt-4', 'pe-3');

    itemDiv.innerHTML = `
         <div class="basket__box_img">
            <img class="basket__img" src="${item.photo}" alt="catalog__img_card_1">
         </div>
         <div class="position-relative ms-2">
            <div class="h5">${item.name}</div>
            <div class="h5">Опция: ${option}</div>
            <div class="position-absolute bottom-0 w-100">
               <div class="mb-4 pb-2"><a class="h5 fc-grey" onclick="deleteInBasket('${item.id}:${option}')">Удалить</a></div>
               <div class="d-flex justify-content-between align-items-end">
                  <div class="h3-num">${item.price}</div>
                  <div class="d-flex justify-content-center align-items-center">
                     <a class="me-sm-3 me-1 ${disableBTN}" onclick="minusItemInBasket('${item.id}:${option}')">
                        <svg class="plus_minus_basket" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M4.53516 15.1045H24.4629C24.9633 15.1045 25.3691 14.6987 25.3691 14.1982C25.3691 13.6978 24.9633 13.292 24.4629 13.292H4.53516C4.03464 13.292 3.62891 13.6978 3.62891 14.1982C3.62891 14.6987 4.03464 15.1045 4.53516 15.1045Z" fill="#817878"/>
                        </svg>
                     </a>
                     <div class="h3-num ps-2 pe-2 me-sm-3 me-1">${count}</div>
                     <a onclick="plusItemInBasket('${item.id}:${option}')">
                        <svg class="plus_minus_basket" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <g id="Add / undefined / Glyph: undefined">
                              <path id="Vector" d="M24.7734 14.1931C24.7734 14.6519 24.4327 15.0312 23.9903 15.0912L23.8674 15.0996L15.1068 15.101L15.1068 23.8652C15.1068 24.3657 14.701 24.7714 14.2005 24.7714C13.7417 24.7714 13.3625 24.4304 13.3025 23.9882L13.2943 23.8652L13.2943 15.101L4.53494 15.1034C4.03445 15.1035 3.62845 14.6979 3.62845 14.1974C3.62845 13.7386 3.9692 13.3593 4.41157 13.2993L4.53458 13.2909L13.2943 13.2885L13.2943 4.5293C13.2943 4.02878 13.7 3.62305 14.2005 3.62305C14.6593 3.62305 15.0385 3.96398 15.0986 4.40632L15.1068 4.5293L15.1068 13.2885L23.867 13.2871C24.3675 13.2869 24.7734 13.6926 24.7734 14.1931Z" fill="white"/>
                           </g>
                        </svg>
                     </a>
                  </div>
               </div>
            </div>
         </div>
      `;
    $('#basket .os-content').append(itemDiv);
    // $('.basket__scroll_div .os-content').append(itemDiv);
}

function minusItemInBasket(currentItem) {
    let obj = getStringifyItem(currentItem)

    let jsonBasket = localStorage.getItem("basket");

    // Преобразование JSON-строки в массив пар ключ-значение and Восстановление Map из массива
    let basket = JSON.parse(jsonBasket);

    let mapBasket = new Map();

    basket.forEach(function (item) {
        let itemStringify = JSON.stringify(item)

        // Используем объект item как ключ
        if (mapBasket.has(itemStringify)) {
            let value = mapBasket.get(itemStringify);
            value = parseInt(value) + 1;
            mapBasket.set(itemStringify, value);
        } else {
            mapBasket.set(itemStringify, 1);
        }
    });


    let value = mapBasket.get(obj)
    value = parseInt(value) - 1
    mapBasket.set(obj, value)

    basket = []
    mapBasket.forEach(function (value, key) {
        for (let i = 0; i < value; i++) {

            basket.push(JSON.parse(key))
        }
    })

    jsonBasket = JSON.stringify(basket);
    localStorage.setItem("basket", jsonBasket);

    updateBasket()


}

function plusItemInBasket(currentItem) {
    let obj = getStringifyItem(currentItem)

    let jsonBasket = localStorage.getItem("basket");

    // Преобразование JSON-строки в массив пар ключ-значение and Восстановление Map из массива
    let basket = JSON.parse(jsonBasket);

    let mapBasket = new Map();

    basket.forEach(function (item) {
        let itemStringify = JSON.stringify(item)

        // Используем объект item как ключ
        if (mapBasket.has(itemStringify)) {
            let value = mapBasket.get(itemStringify);
            value = parseInt(value) + 1;
            mapBasket.set(itemStringify, value);
        } else {
            mapBasket.set(itemStringify, 1);
        }
    });


    let value = mapBasket.get(obj)
    value = parseInt(value) + 1
    mapBasket.set(obj, value)

    basket = []
    mapBasket.forEach(function (value, key) {
        for (let i = 0; i < value; i++) {

            basket.push(JSON.parse(key))
        }
    })

    jsonBasket = JSON.stringify(basket);
    localStorage.setItem("basket", jsonBasket);

    updateBasket()

}

function deleteInBasket(currentItem) { // не настроен
    let jsonBasket = localStorage.getItem("basket");

    // Преобразование JSON-строки в массив пар ключ-значение and Восстановление Map из массива
    let basket = JSON.parse(jsonBasket);

    currentItem = currentItem.split(':')

    let idToRemove = parseInt(currentItem[0]);
    let optionToRemove = currentItem[1];

    // Используем метод filter() для создания нового массива без объектов, которые нужно удалить
    basket = basket.filter(item => !(item.id === idToRemove && item.option === optionToRemove));

    jsonBasket = JSON.stringify(basket);
    localStorage.setItem("basket", jsonBasket);

    updateBasket()
}

function formatNumberWithThousandsSeparator(number) {
    // Преобразуем число в строку и разделяем его на группы по 3 цифры с конца числа
    let parts = number.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    // Объединяем группы с разделителем тысяч и возвращаем результат
    return parts.join('.');
}

function getStringifyItem(item) {
    item = item.split(':')
    let obj = {
        id: parseInt(item[0]), option: item[1]
    }

    return JSON.stringify(obj);
}

// обнуляем и скрываем количество товаров, которые есть/были в корзине
function zeroingQuantityInProductCards() {

    console.log('zeroingQuantityInProductCards')

    // на странице товара
    let btnMinusItem = $('.btn-buy--minus-item')
    let btnQuantityItem = $('.btn-buy--quantity-item')
    btnQuantityItem.text(0)
    if (!btnQuantityItem.hasClass('btn-buy--close') && !btnMinusItem.hasClass('btn-buy--close')) {
        btnMinusItem.addClass('btn-buy--close')
        btnQuantityItem.addClass('btn-buy--close')
        btnQuantityItem.css('padding', '0')
        btnMinusItem.animate({width: 0}, 700);
        btnQuantityItem.animate({width: 0}, 200);
    }


}