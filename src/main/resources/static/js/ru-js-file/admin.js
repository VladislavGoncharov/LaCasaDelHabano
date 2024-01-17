let allHeaderBtn = $(`input[type="radio"][name="header-btn"]`);

allHeaderBtn.on('change', function () {
    let value = $(this).val()

    allHeaderBtn.parent().removeClass('admin__header-box--active')
    $(this).parent().addClass('admin__header-box--active')

    $('[id^="admin-"]').css('display', 'none')
    $(`#admin-${value}`).css('display', 'block')
})

function openOtherInfo(id) {
    $(`#other-info-${id}`).slideToggle();
    $(`#btn-other-info-${id}`).toggleClass('rotate-180');
}


// $(`input[type="radio"][name="header-btn"][value="reserve"]`).trigger('click')
// $(`input[type="radio"][name="header-btn"][value="fb-customer"]`).trigger('click')
// $(`input[type="radio"][name="header-btn"][value="fb-wholesale"]`).trigger('click')

function openItem(itemId) {
    let currentURL = window.location.href;
    let siteBaseURL = currentURL.substring(0, currentURL.indexOf('/', 8));

    window.location.href = siteBaseURL + '/ru/item/' + itemId
}

let allItems = null;
let allNews = null;
let allReserves = null;
let allFeedbacks = null;
let allRegistrations = null;

let allItemsContainer = $('#admin__body-item');
let allNewsContainer = $('#admin__body-news');
let allReservesContainer = $('#admin__body-reserve');
let allFeedbacksContainer = $('#admin__body-fb-customer');
let allRegistrationsContainer = $('#admin__body-fb-wholesale');

let itemsPagination = $('#pagination__body-item');
let newsPagination = $('#pagination__body-news');
let reservesPagination = $('#pagination__body-reserve');
let feedbacksPagination = $('#pagination__body-fb-customer');
let registrationsPagination = $('#pagination__body-fb-wholesale');

let allDataArray = [allItems, allNews, allReserves, allFeedbacks, allRegistrations];
let allContainerForData = [allItemsContainer, allNewsContainer, allReservesContainer, allFeedbacksContainer, allRegistrationsContainer];
let allPaginationFooter = [itemsPagination, newsPagination, reservesPagination, feedbacksPagination, registrationsPagination];
let allPaginationPage = [10, 4, 6, 8, 8];

let siteBaseURL = null;

$(document).ready(startAdminPage);

function startAdminPage() {

    let currentURL = window.location.href;
    siteBaseURL = currentURL.substring(0, currentURL.indexOf('/', 8)); // Индекс 8 для пропуска "https://" или "http://"
    $.ajax({
        url: siteBaseURL + '/api/admin/getAllDataForAdmin', method: 'GET', // Метод запроса
        dataType: 'json', // Ожидаемый формат данных
        success: function (data) {

            allItems = data.allItems;
            allNews = data.allNews;
            allReserves = data.allReserves;
            allFeedbacks = data.allFeedbacks;
            allRegistrations = data.allRegistrationOfWholesaleCustomer;

            allDataArray = [allItems, allNews, allReserves, allFeedbacks, allRegistrations];

            for (let i = 0; i < Object.keys(data).length; i++) {
                let container = allContainerForData[i]

                $(allPaginationFooter[i]).pagination({
                    dataSource: allDataArray[i], pageSize: allPaginationPage[i], callback: function (data, pagination) {
                        container.empty();

                        if (data.length === 0) {
                            let itemDiv = document.createElement('div');
                            itemDiv.classList.add('d-flex', 'm-4', 'ps-2');
                            itemDiv.innerHTML = `
                                           <div class="h5"> Данных временно нет
                                           </div>                        
                                     `;
                            container.append(itemDiv);
                        } else for (let j = 0; j < data.length; j++) {
                            switch (i) {
                                case 0: {
                                    createItem(container, data[j])
                                    break;
                                }
                                case 1: {
                                    createNews(container, data[j])
                                    break;
                                }
                                case 2: {
                                    createReserves(container, data[j])
                                    break;
                                }
                                case 3: {
                                    createFeedbackCustomer(container, data[j])
                                    break;
                                }
                                case 4: {
                                    createFeedbackWholesale(container, data[j])
                                    break;
                                }
                            }
                        }
                    }
                });
            }

            $('#countItem').text('Всего товаров: ' + allItems.length);
            $('#countNews').text('Всего новостей: ' + allNews.length);
            $('#countReserve').text('Всего резервов: ' + allReserves.length);
            $('#countFeedback').text('Всего откликов: ' + allFeedbacks.length);
            $('#countRegistration').text('Всего заявок: ' + allRegistrations.length);
        }, error: function (xhr, status, error) {
            console.error(status, error);
        }
    });

    $.ajax({
        url: siteBaseURL + '/api/admin/getPhoneAndLink', method: 'GET', // Метод запроса
        dataType: 'json', // Ожидаемый формат данных
        success: function (data) {
            let container = $('#admin__body-other');
            container.empty();

            createSelectionOtherSettings(container, data)
        }, error: function (xhr, status, error) {
            console.error(status, error);
        }
    });
    $.ajax({
        url: siteBaseURL + '/api/admin/getAllTelegramId', method: 'GET', // Метод запроса
        dataType: 'json', // Ожидаемый формат данных
        success: function (data) {
            let container = $('#admin__body-other-telegram');

            container.empty();

            createSelectionOtherSettingsTelegramList(container, data)
        }, error: function (xhr, status, error) {
            console.error(status, error);
        }
    });
    $.ajax({
        url: siteBaseURL + '/api/admin/getTitleOnCatalogPage', method: 'GET', // Метод запроса
        dataType: 'json', // Ожидаемый формат данных
        success: function (data) {
            let container = $('#admin__body-other-title-on-catalog-page');

            container.empty();

            createSelectionOtherTitleOnCatalogPage(container, data)
        }, error: function (xhr, status, error) {
            console.error(status, error);
        }
    });


}

function createItem(container, item) {
    let itemDiv = document.createElement('div');
    itemDiv.classList.add('admin__selection-inner-box');

    // Создаем элемент для опций на русском
    let optionRuDiv = document.createElement('div');
    optionRuDiv.classList.add('item-cell-option', 'item-cell-option-ru');

    // Перебираем свойства объекта с опциями на русском и добавляем их в элемент
    for (let key in item.option) {
        if (item.option.hasOwnProperty(key)) {
            let entryRuDiv = document.createElement('div');
            entryRuDiv.textContent = `Опция РУ: { ${key} , ${item.option[key]} }`;
            optionRuDiv.appendChild(entryRuDiv);
        }
    }

    // Создаем элемент для опций на английском
    let optionEnDiv = document.createElement('div');
    optionEnDiv.classList.add('item-cell-option', 'item-cell-option-en');

    // Перебираем свойства объекта с опциями на английском и добавляем их в элемент
    for (let key in item.enLangOption) {
        if (item.enLangOption.hasOwnProperty(key)) {
            let entryEnDiv = document.createElement('div');
            entryEnDiv.textContent = `Option EN: { ${key} , ${item.enLangOption[key]} }`;
            optionEnDiv.appendChild(entryEnDiv);
        }
    }

    // Добавляем созданные элементы в основной элемент
    itemDiv.appendChild(optionRuDiv);
    itemDiv.appendChild(optionEnDiv);

    let visibleItemHTML;

    if (item.visible) visibleItemHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">\n' +
        '  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>\n' +
        '  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>\n' +
        '</svg>'
    else visibleItemHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">\n' +
        '  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>\n' +
        '  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>\n' +
        '  <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>\n' +
        '</svg>'

    let seriesOrTypeOfAccessoryHTML
    let seriesOrTypeOfAccessoryElLangHTML
    if (item.type === 'ACCESSORY') {
        seriesOrTypeOfAccessoryHTML = `<div class="item-cell-series">Тип акссесуара: ${item.typeOfAccessory}</div>`
        seriesOrTypeOfAccessoryElLangHTML = `<div class="item-cell-series">TypeOfAccessory: ${item.enLangTypeOfAccessory}</div>`
    }
    else {
        seriesOrTypeOfAccessoryHTML = `<div class="item-cell-series">Серия: ${item.series}</div>`
        seriesOrTypeOfAccessoryElLangHTML = `<div class="item-cell-series">Series: ${item.enLangSeries}</div>`
    }



    itemDiv.innerHTML = `
                    <div class="item-photo-box">
                        <img class="item-photo" src="${item.photo}" alt="${item.photo}">
                    </div>
                    <div class="item-main-box">
                        <div class="item-cell-id">Id: ${item.id}</div>
                        <div class="item-cell-type">Тип: ${item.type}</div>
                        <div class="item-cell-name">Наименование: ${item.name}</div>
                        <div class="item-cell-factory-name">Фабричный формат: ${item.factoryName}</div>
                        <div class="item-cell-brand">Бренд: ${item.brand}</div>
<!--                        <div class="item-cell-series">Серия: ${item.series}</div>-->
                        ${seriesOrTypeOfAccessoryHTML}
                        <div class="item-cell-country">Страна: ${item.country}</div>
                        <div class="item-cell-article">Артикул: ${item.articleNumber}</div>
                        <div class="item-cell-size">Размер: ${item.size}</div>
                        <div class="item-cell-rg">Ring gauge: ${item.ringGauge}</div>
                        <div class="item-cell-fortress">Крепкость: ${item.fortress}</div>
                        <div class="item-cell-price">Цена: ${item.price}</div>
                    </div>
                    <div class="item-btn-box">
                        <button class="item-btn" type="button" onclick="openModalDeleteObject('item',${item.id})"
                        data-bs-toggle="modal" data-bs-target="#modal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </button>
                        <button class="item-btn" type="button" onclick="openModalUpdateItem(${item.id})"
                        data-bs-toggle="modal" data-bs-target="#modal-update-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg>
                        </button>
                        <button id="itemVisible_${item.id}" class="item-btn" type="button" onclick="visibleItem(${item.id})"
                        data-visible="${item.visible}">
                            ${visibleItemHTML}
                        </button>
                        <button class="item-btn" type="button" onclick="openOtherInfo('item-${item.id}')">
                            <svg id="btn-other-info-item-${item.id}" xmlns="http://www.w3.org/2000/svg"
                                 width="16" height="16" fill="currentColor" class="bi bi-chevron-down"
                                 viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="item-other-info-box" id="other-info-item-${item.id}">
                        <div class="item-other-info-inner-box">
                            <div class="item-cell-option item-cell-option-ru">${optionRuDiv.innerHTML}</div>
                            <div class="item-cell-option item-cell-option-en">${optionEnDiv.innerHTML}</div>
                            <div class="item-cell-name">Name: ${item.enLangName}</div>
                            <div class="item-cell-brand">Brand: ${item.enLangBrand}</div>
<!--                            <div class="item-cell-series">Series: ${item.enLangSeries}</div>-->
                            ${seriesOrTypeOfAccessoryElLangHTML}
                            <div class="item-cell-country">Country: ${item.enLangCountry}</div>
                            <div class="item-cell-description">
                                <div class="item-description-en">${item.enLangDescription}</div>
                                <div class="item-description-ru">${item.description}</div>
                            </div>
                        </div>
                    </div>
        `;
    container.append(itemDiv);
}

function visibleItem(itemId) {
    $.ajax({
        url: siteBaseURL + '/api/admin/updateVisible/' + itemId ,
        method: 'PUT', // Метод запроса
        dataType: 'json', // Ожидаемый формат данных
        success: function (response) {
            console.log(response)
            if (response) {
                let el = $(`#itemVisible_${itemId}`)
                let isVisible = el.attr('data-visible')
                console.log(isVisible)
                let visibleItemHTML;

                if (isVisible === 'true') {
                    visibleItemHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">\n' +
                        '  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>\n' +
                        '  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>\n' +
                        '  <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>\n' +
                        '</svg>'
                    el.attr('data-visible','false')
                }
                else {
                    visibleItemHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">\n' +
                        '  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>\n' +
                        '  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>\n' +
                        '</svg>'
                    el.attr('data-visible', 'true')
                }

                el.empty()
                el.append(visibleItemHTML)
            }

        }, error: function (xhr, status, error) {
            errorDelete()
            console.error(status, error);
        }
    });
}

function createNews(container, news) {
    let itemDiv = document.createElement('div');
    itemDiv.classList.add('admin__selection-inner-box', 'admin__selection-inner-box-news');

    itemDiv.innerHTML = `
                    <div class="item-photo-box item-photo-box-news">
                        <img class="item-photo item-photo-news" src="${news.photo}" alt="${news.photo}">
                    </div>
                    <div class="news-main-box">
                        <div class="news-main-inner-box__main-data">
                            <div class="news-cell">Id: ${news.id}</div>
                            <div class="news-cell">Дата: ${news.date}</div>
                            <div class="news-cell">Заголовок: ${news.header}</div>
                            <div class="news-cell">Header: ${news.enLangHeader}</div>

                        </div>
                        <div class="news-main-inner-box__tags">
                            <div class="news-cell news-cell-tags">Теги: ${news.tag}</div>
                            <div class="news-cell news-cell-tags">Tegs: ${news.enLangTag}</div>
                        </div>
                        <div class="news-main-inner-box__text">
                            <div class="news-cell-description__header__box news-cell-description__header__box-left">
                                <div class="news-cell-description__header">Основной текст:</div>
                                <div class="news-cell-description__text">${news.mainText}</div>
                            </div>
                            <div class="news-cell-description__header__box news-cell-description__header__box-right">
                                <div class="news-cell-description__header">Main text:</div>
                                <div class="news-cell-description__text">${news.enLangMainText}</div>
                            </div>
                        </div>
                    </div>
                    <div class="item-btn-box">
                        <button class="item-btn" type="button" onclick="openModalDeleteObject('news',${news.id})"
                        data-bs-toggle="modal" data-bs-target="#modal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </button>
                        <button class="item-btn" type="button" onclick="openModalUpdateNews(${news.id})"
                        data-bs-toggle="modal" data-bs-target="#modal-update-news">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg>
                        </button>
                    </div>
        `;
    container.append(itemDiv);
}

function createReserves(container, reserve) {
    let itemDiv = document.createElement('div');
    itemDiv.classList.add('admin__selection-inner-box', 'admin__selection-inner-box-reserve');

    let reserveCellBasket = document.createElement('div');
    reserveCellBasket.classList.add('reserve-cell-basket');

    itemDiv.innerHTML = `
        <div class="reserve-cell-main-data">
            <div class="news-cell">Id: ${reserve.id}</div>
            <div class="news-cell">Дата: ${reserve.datetime}</div>
            <div class="news-cell">Гость: ${reserve.name}</div>
            <div class="news-cell">Телефон/email: ${reserve.telOrEmail}</div>
            <div class="news-cell">Количество гостей: ${reserve.numberOfGuests}</div>
            <div class="news-cell">Магазин: ${reserve.mug}</div>
        </div>
        <div class="reserve-cell-massage">
            <div>Сообщение:</div>
            <div class="news-cell-description__text">${reserve.message}</div>
        </div>
        <div class="reserve-cell-type-basket" id="reserve-cell-type-basket-${reserve.id}" th:switch="${reserve.type}">
            ${reserve.type === 'standard' ? `<div>Резерв по типу: стандарт</div>` : reserve.type === 'news' ? `<div>Резерв по типу: новость</div>
                    <div>${'Новость резерва ' + reserve.newsName}</div>` : `<div class="d-flex justify-content-between">
                        <div> Резерв по типу: бронь товаров</div>
                        <div>${'сумма: ' + reserve.fullPrice + ' р.'}</div>
                        <div>${'кол-во: ' + reserve.quantityItems}</div>
                    </div>`}
        </div>
    `;

    itemDiv.innerHTML += `
        <div class="item-btn-box">
            <button class="item-btn" type="button" onclick="openModalDeleteObject('reserve',${reserve.id})"
                        data-bs-toggle="modal" data-bs-target="#modal">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>
        </div>
    `;

    container.append(itemDiv);


    // Преобразовать строку JSON в объект JavaScript
    // let parsedData = JSON.parse(reserve.basketMap);
    const jsonString = reserve.basketMap;

// Извлечение информации из строк
    const extractedData = Object.entries(jsonString).map(([key, value]) => {
        const match = key.match(/BasketDTO\{(.+?)\}/);
        if (match) {
            const basketData = match[1].split(', ').reduce((acc, pair) => {
                const [field, fieldValue] = pair.split('=');
                console.log(field)
                console.log(fieldValue)
                if (field && fieldValue) { // Добавленная проверка
                    acc[field.trim()] = fieldValue.trim().replace(/['"]/g, '');
                }
                return acc;
            }, {});
            return {basketData, quantity: value};
        }
        return null;
    });

// Пройдемся по каждому объекту в массиве
    extractedData.forEach((item) => {
        if (item) {
            // Создать новый reserveCellBasket для каждого товара
            let reserveCellBasket = document.createElement('div');
            reserveCellBasket.classList.add('reserve-cell-basket');
            reserveCellBasket.setAttribute("data-itemId", `${item.basketData.itemId}`);

            let innerBoxPhoto = document.createElement('div');
            innerBoxPhoto.classList.add('reserve-cell-basket__inner-box-photo');
            innerBoxPhoto.innerHTML = `
               <img class="reserve-cell-basket__reserve-photo" src="${item.basketData ? item.basketData.itemPhoto : ''}" alt="${item.basketData ? item.basketData.itemPhoto : ''}">
              `;

            let innerBoxMainData = document.createElement('div');
            innerBoxMainData.classList.add('reserve-cell-basket__inner-box-main-data');
            innerBoxMainData.innerHTML = `
                <div class="item-cell-id">Id: ${item.basketData.itemId}</div>
                <div class="item-cell-type">Опция: ${item.basketData.itemOption}</div>
                <div class="item-cell-price">Цена: ${item.basketData.itemPrice}</div>
                <div class="item-cell-name">Наименование: ${item.basketData.itemName}</div>
              `;

            let innerBoxQuantity = document.createElement('div');
            innerBoxQuantity.classList.add('reserve-cell-basket__inner-box-quantity');
            innerBoxQuantity.innerHTML = `
                <div>кол-во</div>
                <div>x${item.quantity}</div>
              `;

            reserveCellBasket.appendChild(innerBoxPhoto);
            reserveCellBasket.appendChild(innerBoxMainData);
            reserveCellBasket.appendChild(innerBoxQuantity);

            $(`html #reserve-cell-type-basket-${reserve.id}`).append(reserveCellBasket);
        }
    });

}

$('html').on('click', '.reserve-cell-basket', function () {
    let itemId = $(this).attr('data-itemId')

    window.location.href = siteBaseURL + '/ru/item/' + itemId

})


function createFeedbackCustomer(container, feedback) {
    let itemDiv = document.createElement('div');
    itemDiv.classList.add('admin__selection-inner-box', 'admin__selection-inner-box-feedback');

    itemDiv.innerHTML = `
                    <div class="feedback-cell-id">
                        <div>id: ${feedback.id}</div>
                        <div>Дата и время заявки:</div>
                        <div>${feedback.datetime}</div>
                    </div>
                    <div class="feedback-cell-name">
                        <div>Имя: ${feedback.name}</div>
                        <div>Способ связи: ${feedback.telOrEmail}</div>
                    </div>
                    <div class="feedback-cell-message">
                        <div>Сообщение:</div>
                        <div>${feedback.message}</div>
                    </div>
                    <div class="item-btn-box">
                        <button class="item-btn" type="button" onclick="openModalDeleteObject('feedback',${feedback.id})"
                        data-bs-toggle="modal" data-bs-target="#modal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </button>
                    </div>
        `;
    container.append(itemDiv);
}

function createFeedbackWholesale(container, wholesale) {
    let itemDiv = document.createElement('div');
    itemDiv.classList.add('admin__selection-inner-box', 'admin__selection-inner-box-feedback');

    itemDiv.innerHTML = `
                    <div class="feedback-cell-id">
                        <div>id: ${wholesale.id}</div>
                        <div>Дата и время заявки:</div>
                        <div>${wholesale.datetime}</div>
                    </div>
                    <div class="feedback-cell-name">
                        <div>Имя: ${wholesale.name}</div>
                        <div>Способ связи: ${wholesale.telOrEmail}</div>
                        <div>Организация: ${wholesale.nameOfOrganization}</div>
                        <div>Город: ${wholesale.city}</div>
                    </div>
                    <div class="feedback-cell-message">
                        <div>Тема письма:</div>
                        <div>${wholesale.subjectOfLetter}</div>
                        <div>Сообщение:</div>
                        <div>${wholesale.message}</div>
                    </div>
                    <div class="item-btn-box">
                        <button class="item-btn" type="button" onclick="openModalDeleteObject('wholesale',${wholesale.id})"
                        data-bs-toggle="modal" data-bs-target="#modal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </button>
                    </div>
        `;
    container.append(itemDiv);
}


function createSelectionOtherSettings(container, phoneAndLinkObj) {
    let itemDiv = document.createElement('div');
    itemDiv.innerHTML = `
                    <div class="admin__body-other-line__box">
                        <div class="admin__body-other-line">
                            <div>Кузнечный:</div>
                        </div>
                        <div class="admin__body-other-line">
                            <div>Домашний телефон: ${phoneAndLinkObj.kuznechnyTelephonyHouse}
                                <button class="body-other-line-btn" type="button" onclick="openModalUpdatePhoneAndLink('kuznechnyTelephonyHouse')"
                                data-bs-toggle="modal" data-bs-target="#modal-update-phone-and-link">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                           class="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                     </svg>
                                </button>
                            </div>
                            <div>Мобильный телефон: ${phoneAndLinkObj.kuznechnyTelephonyMobile}
                                <button class="body-other-line-btn" type="button" onclick="openModalUpdatePhoneAndLink('kuznechnyTelephonyMobile')"
                                data-bs-toggle="modal" data-bs-target="#modal-update-phone-and-link">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                           class="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                     </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="admin__body-other-line__box">
                        <div class="admin__body-other-line">
                            <div>Петроградская:</div>
                        </div>
                        <div class="admin__body-other-line">
                            <div>Домашний телефон: ${phoneAndLinkObj.petrogradskoyTelephonyHouse}
                                <button class="body-other-line-btn" type="button" onclick="openModalUpdatePhoneAndLink('petrogradskoyTelephonyHouse')"
                                data-bs-toggle="modal" data-bs-target="#modal-update-phone-and-link">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                           class="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                     </svg>
                                </button>
                            </div>
                            <div>Мобильный телефон: ${phoneAndLinkObj.petrogradskoyTelephonyMobile}
                                <button class="body-other-line-btn" type="button" onclick="openModalUpdatePhoneAndLink('petrogradskoyTelephonyMobile')"
                                data-bs-toggle="modal" data-bs-target="#modal-update-phone-and-link">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                           class="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                     </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="admin__body-other-line__box">
                        <div class="admin__body-other-line">
                            <div>Ссылки:</div>
                        </div>
                        <div class="admin__body-other-line">
                            <div>Телеграм: ${phoneAndLinkObj.linkTLG}
                                <button class="body-other-line-btn" type="button" onclick="openModalUpdatePhoneAndLink('linkTLG')"
                                data-bs-toggle="modal" data-bs-target="#modal-update-phone-and-link">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                           class="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                     </svg>
                                </button>
                            </div>
                            <div>Вконтакте: ${phoneAndLinkObj.linkVK}
                                <button class="body-other-line-btn" type="button" onclick="openModalUpdatePhoneAndLink('linkVK')"
                                data-bs-toggle="modal" data-bs-target="#modal-update-phone-and-link">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                           class="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                     </svg>
                                </button>
                            </div>
                        </div>
                        <div class="admin__body-other-line">
                            <div>Инстаграмм: ${phoneAndLinkObj.linkINST}
                                <button class="body-other-line-btn" type="button" onclick="openModalUpdatePhoneAndLink('linkINST')"
                                data-bs-toggle="modal" data-bs-target="#modal-update-phone-and-link">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                           class="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                     </svg>
                                </button>
                            </div>
                            <div>Фейсбук: ${phoneAndLinkObj.linkFB}
                                <button class="body-other-line-btn" type="button" onclick="openModalUpdatePhoneAndLink('linkFB')"
                                data-bs-toggle="modal" data-bs-target="#modal-update-phone-and-link">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                           class="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                     </svg>
                                </button>
                            </div>
                        </div>
                        <div class="admin__body-other-line">
                            <div>Почта: ${phoneAndLinkObj.linkMail}
                                <button class="body-other-line-btn" type="button" onclick="openModalUpdatePhoneAndLink('linkMail')"
                                data-bs-toggle="modal" data-bs-target="#modal-update-phone-and-link">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                           class="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                     </svg>
                                </button>
                            </div>
                            <div style="display: none">Сайт разработчиков: ${phoneAndLinkObj.linkDevelopers}
                                <button class="body-other-line-btn" type="button" onclick="openModalUpdatePhoneAndLink('linkDevelopers')"
                                data-bs-toggle="modal" data-bs-target="#modal-update-phone-and-link">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                           class="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                     </svg>
                                </button>
                            </div>
                        </div>
                        <div class="admin__body-other-line">
                            <div>Сайт ресторан O!Cuba: ${phoneAndLinkObj.linkCubaRestaurant}
                                <button class="body-other-line-btn" type="button" onclick="openModalUpdatePhoneAndLink('linkCubaRestaurant')"
                                data-bs-toggle="modal" data-bs-target="#modal-update-phone-and-link">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                           class="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                     </svg>
                                </button>
                            </div>
                            <div>Сайт Cuba Day: ${phoneAndLinkObj.linkCubaDay}
                                <button class="body-other-line-btn" type="button" onclick="openModalUpdatePhoneAndLink('linkCubaDay')"
                                data-bs-toggle="modal" data-bs-target="#modal-update-phone-and-link">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                           class="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                     </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    `
    container.append(itemDiv);
}

function createSelectionOtherSettingsTelegramList(container, listTelegramId) {
    let itemDiv = document.createElement('div');
    itemDiv.innerHTML = `
        <div class="admin__body-other-line__box">
            <div class="admin__body-other-line">
                <div>Оповещения в телеграм</div><div class="ms-4 ps-4"><button class="admin__button" type="button" onclick="openModalAddTelegramId()"
                data-bs-toggle="modal" data-bs-target="#modal-update-phone-and-link">Добавить телеграм id
                    </button></div>
            </div>
            <div class="admin__body-other-line">
                ${listTelegramId.map((id, index) => `
                    <div>Телеграм id №${index + 1}: ${id}
                        <button class="body-other-line-btn" type="button" onclick="openModalDeleteObject('telegramId','${id}')"
                            data-bs-toggle="modal" data-bs-target="#modal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
                            </svg>
                        </button>
                    </div>
                `).join('')}
            </div>
            <div class="admin__body-other-line">
                <div>Инструкция подключение телеграм-бота для оповещений </div>
            </div>
            <div class="admin__body-other-line">
                <div>Зайти в телеграм, в поиске найти телеграм-бота LaCasaDelHabanoSPB_bot (ник: LaCasaDelHabanoSPB), зайти в него и снизу нажать кнопку "Начать"
                <br><br>Далее в поиске найти телеграм-бота my_id_bot (ник: What's my Telegram ID?), зайти в него и снизу нажать кнопку "Начать", в меню выбрать "Узнать свой ID"
                 <br><br>Следующий шаг, добавить ID (который выдал вам бот) на сайт по кнопке выше "Добавить телеграм id"
                 <br><br>Готово
                 <br><br><br>P.S. строго следовать инструкции, шаги не меняем</div>
            </div>
        </div>
    `;
    container.append(itemDiv);
}

function createSelectionOtherTitleOnCatalogPage(container, data) {
    let switcher = data.switcher === true ? "вкл" : "выкл";
    let itemDiv = document.createElement('div');
    itemDiv.innerHTML = `
        <div class="admin__body-other-line__box">
            <div class="admin__body-other-line">
                <div>Заголовок на странице каталога</div><div class="ms-4 ps-4"><button class="admin__button" type="button" onclick="openModalUpdateTitleOnCatalogPage()"
                data-bs-toggle="modal" data-bs-target="#modal-update-title-on-catalog-page">Изменить
                    </button></div>
            </div>
            <div class="admin__body-other-line">
                Текущий режим: ${switcher}
            </div>
            <div class="admin__body-other-line">
                Русский текст: ${data.textRu}
            </div>
            <div class="admin__body-other-line">
                Английский текст: ${data.textEn}
            </div>
            <div class="admin__body-other-line">
                Цвет текста: ${data.colorText}  <span style="width: 10px;height: 10px;margin-left: 20px;background: ${data.colorText}"></span>
            </div>
            <div class="admin__body-other-line">
                Цвет фона: ${data.colorBackground} <span style="width: 10px;height: 10px;margin-left: 20px;background: ${data.colorBackground}"></span>
            </div>
        </div>
    `;
    container.append(itemDiv);
}

$('#input__body-item').on('input', function () {

    if (allDataArray[0].length === 0) return;

    let container = allContainerForData[0]
    if ($(this).val() === '') {
        $(allPaginationFooter[0]).pagination({
            dataSource: allDataArray[0], pageSize: allPaginationPage[0], callback: function (data, pagination) {
                container.empty();
                // Отображение элементов на текущей странице
                for (let j = 0; j < data.length; j++) {
                    createItem(container, data[j])
                }
            }
        })
        return;
    }

    let searchResult = [];

    allItems.forEach(item => {

        if (item.articleNumber.includes($(this).val()) || item.brand.toLowerCase().includes($(this).val().toLowerCase()) || item.name.toLowerCase().includes($(this).val().toLowerCase()) || item.id.toString().includes($(this).val())  // Преобразуйте id в строку перед проверкой
        ) {
            searchResult.push(item);
        }
    });

    if (searchResult.length === 0) {
        container.empty();
        let itemDiv = document.createElement('div');
        itemDiv.classList.add('d-flex', 'm-3');
        itemDiv.innerHTML = `
                       <div class="h5"> По запросу ${$(this).val()} 
                       не найдено совпадений по id, артикулу, бренду и названию
                       </div>                        
                 `;
        container.append(itemDiv);
    } else {

        $(allPaginationFooter[0]).pagination({
            dataSource: searchResult, pageSize: allPaginationPage[0], callback: function (data, pagination) {
                container.empty();
                // Отображение элементов на текущей странице
                for (let j = 0; j < data.length; j++) {
                    createItem(container, data[j])
                }
            }
        })
    }
})

$('#input__body-news').on('input', function () {

    if (allDataArray[1].length === 0) return;

    let container = allContainerForData[1]
    if ($(this).val() === '') {
        $(allPaginationFooter[1]).pagination({
            dataSource: allDataArray[1], pageSize: allPaginationPage[1], callback: function (data, pagination) {
                container.empty();
                // Отображение элементов на текущей странице
                for (let j = 0; j < data.length; j++) {
                    createNews(container, data[j])
                }
            }
        })
        return;
    }

    let searchResult = [];

    allNews.forEach(news => {

        if (news.header.toLowerCase().includes($(this).val().toLowerCase()) || news.tag.toLowerCase().includes($(this).val().toLowerCase()) || news.date.toLowerCase().includes($(this).val().toLowerCase()) || news.id.toString().includes($(this).val())  // Преобразуйте id в строку перед проверкой
        ) {
            searchResult.push(news);
        }
    });

    if (searchResult.length === 0) {
        container.empty();
        let itemDiv = document.createElement('div');
        itemDiv.classList.add('d-flex', 'm-3');
        itemDiv.innerHTML = `
                       <div class="h5"> По запросу ${$(this).val()} 
                       не найдено совпадений по id, заголовку, дате и тегам
                       </div>                        
                 `;
        container.append(itemDiv);
    } else {

        $(allPaginationFooter[1]).pagination({
            dataSource: searchResult, pageSize: allPaginationPage[1], callback: function (data, pagination) {
                container.empty();
                // Отображение элементов на текущей странице
                for (let j = 0; j < data.length; j++) {
                    createNews(container, data[j])
                }
            }
        })
    }
})

$('#input__body-reserve').on('input', function () {

    if (allDataArray[2].length === 0) return;

    let container = allContainerForData[2]
    if ($(this).val() === '') {
        $(allPaginationFooter[2]).pagination({
            dataSource: allDataArray[2], pageSize: allPaginationPage[2], callback: function (data, pagination) {
                container.empty();
                // Отображение элементов на текущей странице
                for (let j = 0; j < data.length; j++) {
                    createReserves(container, data[j])
                }
            }
        })
        return;
    }

    let searchResult = [];

    allReserves.forEach(reserves => {

        if (reserves.name.toLowerCase().includes($(this).val().toLowerCase()) || reserves.mug.toLowerCase().includes($(this).val().toLowerCase()) || reserves.telOrEmail.toLowerCase().includes($(this).val().toLowerCase()) || reserves.datetime.toLowerCase().includes($(this).val().toLowerCase()) || reserves.id.toString().includes($(this).val())  // Преобразуйте id в строку перед проверкой
        ) {
            searchResult.push(reserves);
        }
    });

    if (searchResult.length === 0) {
        container.empty();
        let itemDiv = document.createElement('div');
        itemDiv.classList.add('d-flex', 'm-3');
        itemDiv.innerHTML = `
                       <div class="h5"> По запросу ${$(this).val()} 
                       не найдено совпадений по id, магазину, дате, гостю и тел./email
                       </div>                        
                 `;
        container.append(itemDiv);
    } else {

        $(allPaginationFooter[2]).pagination({
            dataSource: searchResult, pageSize: allPaginationPage[2], callback: function (data, pagination) {
                container.empty();
                // Отображение элементов на текущей странице
                for (let j = 0; j < data.length; j++) {
                    createReserves(container, data[j])
                }
            }
        })
    }
})

$('#input__body-fb-customer').on('input', function () {

    if (allDataArray[3].length === 0) return;

    let container = allContainerForData[3]
    if ($(this).val() === '') {
        $(allPaginationFooter[3]).pagination({
            dataSource: allDataArray[3], pageSize: allPaginationPage[3], callback: function (data, pagination) {
                container.empty();
                // Отображение элементов на текущей странице
                for (let j = 0; j < data.length; j++) {
                    createFeedbackCustomer(container, data[j])
                }
            }
        })
        return;
    }

    let searchResult = [];

    allFeedbacks.forEach(feedback => {

        if (feedback.datetime.toLowerCase().includes($(this).val().toLowerCase()) || feedback.telOrEmail.toLowerCase().includes($(this).val().toLowerCase()) || feedback.name.toLowerCase().includes($(this).val().toLowerCase()) || feedback.id.toString().includes($(this).val())  // Преобразуйте id в строку перед проверкой
        ) {
            searchResult.push(feedback);
        }
    });

    if (searchResult.length === 0) {
        container.empty();
        let itemDiv = document.createElement('div');
        itemDiv.classList.add('d-flex', 'm-3');
        itemDiv.innerHTML = `
                       <div class="h5"> По запросу ${$(this).val()} 
                       не найдено совпадений по id, дате, гостю и тел./email
                       </div>                        
                 `;
        container.append(itemDiv);
    } else {

        $(allPaginationFooter[3]).pagination({
            dataSource: searchResult, pageSize: allPaginationPage[3], callback: function (data, pagination) {
                container.empty();
                // Отображение элементов на текущей странице
                for (let j = 0; j < data.length; j++) {
                    createFeedbackCustomer(container, data[j])
                }
            }
        })
    }
})

$('#input__body-fb-wholesale').on('input', function () {

    if (allDataArray[4].length === 0) return;

    let container = allContainerForData[4]
    if ($(this).val() === '') {
        $(allPaginationFooter[4]).pagination({
            dataSource: allDataArray[4], pageSize: allPaginationPage[4], callback: function (data, pagination) {
                container.empty();
                // Отображение элементов на текущей странице
                for (let j = 0; j < data.length; j++) {
                    createFeedbackWholesale(container, data[j])
                }
            }
        })
        return;
    }

    let searchResult = [];

    allRegistrations.forEach(registration => {

        if (registration.telOrEmail.toLowerCase().includes($(this).val().toLowerCase()) || registration.name.toLowerCase().includes($(this).val().toLowerCase()) || registration.nameOfOrganization.toLowerCase().includes($(this).val().toLowerCase()) || registration.id.toString().includes($(this).val())  // Преобразуйте id в строку перед проверкой
        ) {
            searchResult.push(registration);
        }
    });

    if (searchResult.length === 0) {
        container.empty();
        let itemDiv = document.createElement('div');
        itemDiv.classList.add('d-flex', 'm-3');
        itemDiv.innerHTML = `
                       <div class="h5"> По запросу ${$(this).val()} 
                       не найдено совпадений по id, организации, клиенту и тел./email
                       </div>                        
                 `;
        container.append(itemDiv);
    } else {

        $(allPaginationFooter[4]).pagination({
            dataSource: searchResult, pageSize: allPaginationPage[4], callback: function (data, pagination) {
                container.empty();
                // Отображение элементов на текущей странице
                for (let j = 0; j < data.length; j++) {
                    createFeedbackWholesale(container, data[j])
                }
            }
        })
    }
})


function openModalDeleteObject(objName, id) {

    let resultObj = null;

    switch (objName) {
        case 'item': {
            resultObj = getResultObj(0, id)
            setDeleteModal('Подтвердите удаление товара', 'id: ' + id,
                'Название: ' + resultObj.name, `deleteItem(${id}, 'deleteItem')`)
            break;
        }

        case 'news': {
            resultObj = getResultObj(1, id)
            setDeleteModal('Подтвердите удаление новости', 'id: ' + id,
                'Заголовок: ' + resultObj.header, `deleteItem(${id}, 'deleteNews')`)
            break;
        }

        case 'reserve': {
            resultObj = getResultObj(2, id)
            setDeleteModal('Подтвердите удаление резерва', 'id: ' + id,
                'Имя гостя: ' + resultObj.name, `deleteItem(${id}, 'deleteReserve')`)
            break;
        }

        case 'feedback': {
            resultObj = getResultObj(3, id)
            setDeleteModal('Подтвердите удаление отклика', 'id: ' + id,
                'Имя гостя: ' + resultObj.name, `deleteItem(${id}, 'deleteFeedback')`)
            break;
        }
        case 'wholesale': {
            resultObj = getResultObj(4, id)
            setDeleteModal('Подтвердите удаление заявки', 'id: ' + id,
                'ФИО опт. покупателя : ' + resultObj.name, `deleteItem(${id}, 'deleteRegistration')`)
            break;
        }
        case 'telegramId': {

            setDeleteModal('Подтвердите удаление ID телеграмма', 'id: ' + id,
                '', `deleteTelegramId(${id})`)
            break;
        }

    }
}

function getResultObj(i, id) {
    let res
    $.each(allDataArray[i], function (index, item) {
        if (item.id === id) {
            res = item;
        }
    });
    return res;
}

function setDeleteModal(title, lineFirst, lineSecond, btnFunc) {
    $('#modal-title').text(title)
    $('#modal-body-line-first').text(lineFirst)
    $('#modal-body-line-second').text(lineSecond)
    let modalBtn = $('#modal-btn')
    modalBtn.text('Удалить')
    modalBtn.attr('onclick', btnFunc);
}

function deleteItem(id, url) {
    $.ajax({
        url: siteBaseURL + '/api/admin/' + url, method: 'DELETE', // Метод запроса
        dataType: 'json', // Ожидаемый формат данных
        contentType: 'application/json', data: JSON.stringify(id), success: function (response) {
            if (response) successDelete()
            else errorDelete()
        }, error: function (xhr, status, error) {
            errorDelete()
            console.error(status, error);
        }
    });
}

function deleteTelegramId(id) {
    $.ajax({
        url: siteBaseURL + '/api/admin/deleteTelegramId/' + id, method: 'DELETE', // Метод запроса
        dataType: 'json', // Ожидаемый формат данных
        contentType: 'application/json',
        data: JSON.stringify(id), success: function (response) {
            if (response) successDelete()
            else errorDelete()
        }, error: function (xhr, status, error) {
            errorDelete()
            console.error(status, error);
        }
    });
}

function successDelete() {
    $('#modal-btn').text('Удачно')
    $('#modal-footer').addClass('modal-success')
    setTimeout(function () {
        $('#modal-btn-close').trigger('click')
        startAdminPage()
        setTimeout(function () {
            $('#modal-footer').removeClass('modal-success')
        }, 500)
    }, 1500)
}

function errorDelete() {
    $('#modal-btn').text('Ошибка')
    $('#modal-footer').addClass('modal-error')
    setTimeout(function () {
        $('#modal-btn-close').trigger('click')
        setTimeout(function () {
            $('#modal-footer').removeClass('modal-error')
        }, 500)
    }, 1500)
}


let allHeaderBtnSelectItem = $(`input[type="radio"][name="select-add-item"]`);

allHeaderBtnSelectItem.on('change', function () {
    let value = $(this).val()

    allHeaderBtnSelectItem.parent().removeClass('admin__modal-header-box--active')
    $(this).parent().addClass('admin__modal-header-box--active')

    $('[id^="add-item-modal-select-"]').css('display', 'none')
    $(`#add-item-modal-select-${value}`).css('display', 'flex')

    $('#add-item-modal-select-NEWS').css('display', 'flex')
    $(`#modal-check-item-btn`).attr('onclick', `modelBtnCheckItem('${value}')`)
    $(`#modal-add-item-btn`).attr('onclick', `modelBtnAddItem('${value}')`)
})

//выбор фото с превью
let dt = new DataTransfer();

$('.input-file input[type=file]').on('change', function () {
    let $files_list = $(this).closest('.input-file').next();
    $files_list.empty();

    for (var i = 0; i < this.files.length; i++) {
        let file = this.files.item(i);

        // Определение размера файла
        let fileSizeInBytes = file.size;
        let fileSizeInKB = Math.floor(fileSizeInBytes / 1024); // Преобразование в килобайты

        console.log('Размер файла:', fileSizeInKB, 'KB');
        if (!((file.type === 'image/jpeg' || file.type === 'image/png') && (file.name.toLowerCase().endsWith('.jpg') || file.name.toLowerCase().endsWith('.png')))) {
            let new_fileSizeInKB_error = `<div class="input-file-list-item-error">Файл должен быть типом .jpg или .png,
            текущий тип ${file.type}
                    </div>`
            $files_list.append(new_fileSizeInKB_error);
            $('.modal__img-warning').append()
        } else if (fileSizeInKB > 1024) {
            let new_fileSizeInKB_error = `<div class="input-file-list-item-error">Файл должен быть размером менне 1 мб, 
                    текущий размер файла ${fileSizeInKB} кб
                    </div>`
            $files_list.append(new_fileSizeInKB_error);
            $('.modal__img-warning').append()
        } else {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                let new_file_input = '<span class="input-file-list-item">' +
                    '<img class="input-file-list-img" src="' + reader.result + '">' +
                    '<span class="input-file-list-name">' + file.name + '</span>' +
                    '<a href="#" onclick="removeFilesItem(this); return false;" class="input-file-list-remove">x</a>' +
                    '</span>';
                $files_list.append(new_file_input);
            }
        }
    }

});

function removeFilesItem(target) {
    let name = $(target).prev().text();
    let input = $(target).closest('.modal__img-row').find('input[type=file]');
    $(target).closest('.input-file-list-item').remove();
    for (let i = 0; i < dt.items.length; i++) {
        if (name === dt.items[i].getAsFile().name) {
            dt.items.remove(i);
        }
    }
    input[0].files = dt.files;
}

function createOpenModal(nameEl) {
    if (nameEl === 'item') $(`html input[type='radio'][name='select-add-item'][value='CIGAR']`).trigger('click')
}

$('.modal-btn-option-plus').click(function () {
    let nameEl = ''

    if ($(this).closest('#add-item-modal-select-CIGAR').length > 0 ||
        $(this).closest('#update-item-modal-select-CIGAR').length > 0) nameEl = 'CIGAR'
    if ($(this).closest('#add-item-modal-select-CIGARILLO').length > 0 ||
        $(this).closest('#update-item-modal-select-CIGARILLO').length > 0) nameEl = 'CIGARILLO'
    if ($(this).closest('#add-item-modal-select-COFFEE').length > 0 ||
        $(this).closest('#update-item-modal-select-COFFEE').length > 0) nameEl = 'COFFEE'
    if ($(this).closest('#add-item-modal-select-ACCESSORY').length > 0 ||
        $(this).closest('#update-item-modal-select-ACCESSORY').length > 0) nameEl = 'ACCESSORY'

    let nameUpdate = ''
    let addOrUpdate = 'add'
    let newOrUpdate = 'new'

    if ($(this).closest('#update-item-modal-select-CIGAR').length > 0 ||
        $(this).closest('#update-item-modal-select-CIGARILLO').length > 0 ||
        $(this).closest('#update-item-modal-select-COFFEE').length > 0 ||
        $(this).closest('#update-item-modal-select-ACCESSORY').length > 0) {
        nameUpdate = '-update'
        addOrUpdate = 'update'
        newOrUpdate = 'update'
    }


    let optionBoxRu = $(`html #${addOrUpdate}-item-modal-select-${nameEl} .option-inputs-box-ru`)
    let optionBoxEn = $(`html #${addOrUpdate}-item-modal-select-${nameEl} .option-inputs-box-en`)

    let count = parseInt(optionBoxRu.children().length) + 1

    let itemDivRu = document.createElement('div');
    itemDivRu.innerHTML = `
                                   <label class="modal__text-container--label modal__text-container--option-label" 
                                        style="border-top: dashed 1px black;padding-top: 10px">
                                        Текст
                                        <input class="modal__text-container--input modal__text-container--option-input"
                                               id="input${nameUpdate}-${nameEl}-ru-option-key-${count}"
                                               type="text" name="${newOrUpdate}-item-${nameEl}" placeholder="25 сигар/сигарилл/пачек" 
                                               title="ввод свободный, не более 250 символов">
                                    </label>
                                    <label class="modal__text-container--label modal__text-container--option-label">
                                        Значение
                                        <input class="modal__text-container--input modal__text-container--option-input 
                                        styleForJqIsOnlyForEnteringIntegers"
                                               id="input${nameUpdate}-${nameEl}-ru-option-value-${count}"
                                               type="number" name="${newOrUpdate}-item-${nameEl}" placeholder="25"
                                               title="ввод только цифр, количество товара" step="1">
                                    </label>                      
                 `;
    optionBoxRu.append(itemDivRu);

    let itemDivEn = document.createElement('div');
    itemDivEn.innerHTML = `
                                    <label class="modal__text-container--label modal__text-container--option-label"
                                        style="border-top: dashed 1px black;padding-top: 10px">
                                        Text
                                        <input class="modal__text-container--input modal__text-container--option-input"
                                               id="input${nameUpdate}-${nameEl}-en-option-key-${count}"
                                               type="text" name="${newOrUpdate}-item-${nameEl}" placeholder="25 items"
                                               title="ввод свободный, не более 250 символов">
                                    </label>
                                    <label class="modal__text-container--label modal__text-container--option-label">
                                        Value
                                        <input class="modal__text-container--input modal__text-container--option-input"
                                               id="input${nameUpdate}-${nameEl}-en-option-value-${count}"
                                               type="number" name="${newOrUpdate}-item-${nameEl}" placeholder="25"
                                               title="ввод только цифр, количество товара" step="1">
                                    </label>                      
                 `;
    optionBoxEn.append(itemDivEn);

    if (count > 1) {
        $(`html #${addOrUpdate}-item-modal-select-${nameEl} .modal-btn-option-minus`).prop('disabled', false);
    }
    if (count === 5) {
        $(`html #${addOrUpdate}-item-modal-select-${nameEl} .modal-btn-option-plus`).prop('disabled', true);
    }
})
$('.modal-btn-option-minus').click(function () {
    let nameEl = ''

    if ($(this).closest('#add-item-modal-select-CIGAR').length > 0 ||
        $(this).closest('#update-item-modal-select-CIGAR').length > 0) nameEl = 'CIGAR'
    if ($(this).closest('#add-item-modal-select-CIGARILLO').length > 0 ||
        $(this).closest('#update-item-modal-select-CIGARILLO').length > 0) nameEl = 'CIGARILLO'
    if ($(this).closest('#add-item-modal-select-COFFEE').length > 0 ||
        $(this).closest('#update-item-modal-select-COFFEE').length > 0) nameEl = 'COFFEE'
    if ($(this).closest('#add-item-modal-select-ACCESSORY').length > 0 ||
        $(this).closest('#update-item-modal-select-ACCESSORY').length > 0) nameEl = 'ACCESSORY'

    let addOrUpdate = 'add'

    if ($(this).closest('#update-item-modal-select-CIGAR').length > 0 ||
        $(this).closest('#update-item-modal-select-CIGARILLO').length > 0 ||
        $(this).closest('#update-item-modal-select-COFFEE').length > 0 ||
        $(this).closest('#update-item-modal-select-ACCESSORY').length > 0)
        addOrUpdate = 'update'


    let optionBoxRu = $(`html #${addOrUpdate}-item-modal-select-${nameEl} .option-inputs-box-ru`)
    let optionBoxEn = $(`html #${addOrUpdate}-item-modal-select-${nameEl} .option-inputs-box-en`)

    optionBoxRu.children().last().remove()

    optionBoxEn.children().last().remove()

    let count = optionBoxRu.children().length


    if (count === 1) {
        $(`html #${addOrUpdate}-item-modal-select-${nameEl} .modal-btn-option-minus`).prop('disabled', true);
    }
    if (count < 5) {
        $(`html #${addOrUpdate}-item-modal-select-${nameEl} .modal-btn-option-plus`).prop('disabled', false);
    }
})


function checkingInputItem(nameEl) {
    let check = true;
    let allEl = $(`#add-item-modal-select-${nameEl} input[type=text], #add-item-modal-select-${nameEl} input[type=number], #add-item-modal-select-${nameEl} textarea`)
    // Удаление всех классов с ошибками перед новой проверкой
    $('.modal__img-row').removeClass('input-error');
    allEl.removeClass('input-error');
    allEl.each(function () {

        if ($(this).val() === '') {
            $(this).addClass('input-error');

            if (check) addItemError(', поля ввода не должны быть пусты')
            check = false
        }
    });
    if ($(`html #add-item-modal-select-${nameEl} .input-file-list-img`).length === 0) {
        $('.modal__img-row').addClass('input-error');

        if (check) addItemError(', поля ввода не должны быть пусты')
        check = false
    }

    return check;
}

function checkingInputUpdateNewsWithPhoto() {
    let check = true;
    let allEl = $(`#modal-update-news input[type=text], #modal-update-news textarea`)
    // Удаление всех классов с ошибками перед новой проверкой
    $('.modal__img-row').removeClass('input-error');
    allEl.removeClass('input-error');
    allEl.each(function () {

        if ($(this).val() === '') {
            $(this).addClass('input-error');

            if (check) addItemError(', поля ввода не должны быть пусты')
            check = false
        }
    });
    if ($(`html #modal-update-news .input-file-list-img`).length === 0) {
        $('.modal__img-row').addClass('input-error');

        if (check) addItemError(', поля ввода не должны быть пусты')
        check = false
    }


    return check;
}

function checkingInputUpdateNewsWithoutPhoto() {
    let check = true;
    let allEl = $(`#modal-update-news input[type=text], #modal-update-news textarea`)
    // Удаление всех классов с ошибками перед новой проверкой
    allEl.removeClass('input-error');
    allEl.each(function () {

        if ($(this).val() === '') {
            $(this).addClass('input-error');

            if (check) addItemError(', поля ввода не должны быть пусты')
            check = false
        }
    });


    return check;
}

function checkingInputUpdateItemWithPhoto(nameEl) {
    let check = true;
    let allEl = $(`#update-item-modal-select-${nameEl} input[type=text], #update-item-modal-select-${nameEl} input[type=number], #update-item-modal-select-${nameEl} textarea`)
    // Удаление всех классов с ошибками перед новой проверкой
    $('.modal__img-row').removeClass('input-error');
    allEl.removeClass('input-error');
    allEl.each(function () {

        if ($(this).val() === '') {
            $(this).addClass('input-error');

            if (check) addItemError(', поля ввода не должны быть пусты')
            check = false
        }
    });
    if ($(`html #update-item-modal-select-${nameEl} .input-file-list-img`).length === 0) {
        $('.modal__img-row').addClass('input-error');

        if (check) addItemError(', поля ввода не должны быть пусты')
        check = false
    }

    return check;
}

function checkingInputUpdateItemWithoutPhoto(nameEl) {
    let check = true;
    let allEl = $(`#update-item-modal-select-${nameEl} input[type=text], #update-item-modal-select-${nameEl} input[type=number], #update-item-modal-select-${nameEl} textarea`)
    // Удаление всех классов с ошибками перед новой проверкой
    allEl.removeClass('input-error');
    allEl.each(function () {

        if ($(this).val() === '') {
            $(this).addClass('input-error');

            if (check) addItemError(', поля ввода не должны быть пусты')
            check = false
        }
    });

    return check;
}

$('.modal').on('focus', 'input, textarea', function () {
    // Удаление класса с ошибкой при фокусе на инпуте
    $('.modal__img-row').removeClass('input-error');
    $(this).removeClass('input-error');
});

function modelBtnAddItem(nameEl) {
    let checking = checkingInputItem(nameEl)
    if (checking) sendItemDTOToServer(nameEl);
}

function modelBtnCheckItem(nameEl) {
    checkingInputItem(nameEl)
}

function modelBtnCheckItemUpdate(nameEl) {
    let switcher = $(`.update-input-file-item-${nameEl}`).attr('data-target')

    switcher = JSON.parse(switcher)

    if (switcher)
        checkingInputUpdateItemWithPhoto(nameEl)
    else
        checkingInputUpdateItemWithoutPhoto(nameEl)
}

function modelBtnCheckNewsUpdate() {
    let switcher = $('.update-input-file').attr('data-target')
    switcher = JSON.parse(switcher)
    if (switcher) checkingInputUpdateNewsWithPhoto()
    else checkingInputUpdateNewsWithoutPhoto()
}

function modelBtnAddNews() {
    let checking = checkingInputItem('NEWS')
    if (checking) sendNewsDTOToServer();
}

function modelBtnUpdateNews() {
    let switcher = $('.update-input-file').attr('data-target')

    switcher = JSON.parse(switcher)

    let checking
    if (switcher)
        checking = checkingInputUpdateNewsWithPhoto()
    else
        checking = checkingInputUpdateNewsWithoutPhoto()

    if (checking) sendNewsDTOToServerUpdate(switcher);
}

function modelBtnUpdateItem(nameEl) {
    let switcher = $(`.update-input-file-item-${nameEl}`).attr('data-target')

    switcher = JSON.parse(switcher)

    let checking
    if (switcher)
        checking = checkingInputUpdateItemWithPhoto(nameEl)
    else
        checking = checkingInputUpdateItemWithoutPhoto(nameEl)

    if (checking) sendItemDTOToServerUpdate(switcher, nameEl);
}

$('html').on('input', 'input.modal__text-container--input.modal__text-container--option-input, input.modal__text-container--input', function () {
    let inputValue = $(this).val();
    let maxLength = 250;

    if (inputValue.length > maxLength) {
        $(this).val(inputValue.substring(0, maxLength));
    }
});

$('html textarea.modal__text-container--input.modal__text-container--textarea').on('input', function () {
    let inputValue = $(this).val();
    let maxLength = 2500;

    if (inputValue.length > maxLength) {
        $(this).val(inputValue.substring(0, maxLength));
    }
});
$('html #input-cigar-fortress').on('input', function () {
    let inputValue = $(this).val();

    // Оставляем только цифры в строке
    let numericValue = inputValue.replace(/\D/g, '');

    // Проверка, что введенное значение является числом
    if (!isNaN(numericValue) && numericValue !== '' && inputValue.length === 1) {
        // Преобразование строки в число
        numericValue = parseInt(numericValue, 10);
        // Проверка, что число находится в диапазоне от 1 до 5
        if (numericValue >= 1 && numericValue <= 5) {
        } else $(this).val('')
    } else if (inputValue.length === 2) {
        $(this).val(inputValue.substring(0, 1));
    } else $(this).val('')
});


function createItemDTO(nameEl) {

    let formData = new FormData();

    switch (nameEl) {
        case 'CIGAR': {
            // Добавляем данные в объект FormData
            formData.append('type', 'CIGAR');
            formData.append('series', $('#input-cigar-ru-series').val());
            formData.append('brand', $('#input-cigar-ru-brand').val());
            formData.append('name', $('#input-cigar-ru-name').val());
            formData.append('factoryName', $('#input-cigar-factory-name').val());
            formData.append('price', parseInt($('#input-cigar-price').val()) || 0);
            formData.append('size', parseInt($('#input-cigar-size').val()) || 0);
            formData.append('ringGauge', parseInt($('#input-cigar-ring-gauge').val()) || 0);
            formData.append('fortress', parseInt($('#input-cigar-fortress').val()) || 0);
            formData.append('photoMultipartFile', $('#input-cigar-img')[0].files[0]);
            formData.append('country', $('#input-cigar-ru-country').val());
            formData.append('description', $('#input-cigar-ru-description').val());
            formData.append('articleNumber', $('#input-cigar-article').val());
            formData.append('typeOfAccessory', '');

            // Добавляем данные из функции collectOptionData('ru')
            let optionDataRu = collectOptionData('ru', 'CIGAR', 'add');
            console.log('optionDataRu')
            console.log(optionDataRu)
            console.log(JSON.stringify(Object.fromEntries(optionDataRu)))
            formData.append('optionJSON', JSON.stringify(Object.fromEntries(optionDataRu)));

            formData.append('enLangSeries', $('#input-cigar-en-series').val());
            formData.append('enLangBrand', $('#input-cigar-en-brand').val());
            formData.append('enLangName', $('#input-cigar-en-name').val());
            formData.append('enLangCountry', $('#input-cigar-en-country').val());
            formData.append('enLangDescription', $('#input-cigar-en-description').val());
            formData.append('enLangTypeOfAccessory', '');

            // Добавляем данные из функции collectOptionData('en')
            let optionDataEn = collectOptionData('en', 'CIGAR', 'add');
            formData.append('enLangOptionJSON', JSON.stringify(Object.fromEntries(optionDataEn)));

            break;
        }
        case 'CIGARILLO': {
            // Добавляем данные в объект FormData
            formData.append('type', 'CIGARILLO');
            formData.append('series', '');
            formData.append('brand', $('#input-cigarillo-ru-brand').val());
            formData.append('name', $('#input-cigarillo-ru-name').val());
            formData.append('price', parseInt($('#input-cigarillo-price').val()) || 0);
            formData.append('size', 0);
            formData.append('ringGauge', 0);
            formData.append('fortress', 0);
            formData.append('photoMultipartFile', $('#input-cigarillo-img')[0].files[0]);
            formData.append('country', $('#input-cigarillo-ru-country').val());
            formData.append('description', $('#input-cigarillo-ru-description').val());
            formData.append('articleNumber', $('#input-cigarillo-article').val());
            formData.append('typeOfAccessory', '');
            formData.append('factoryName', '');

            // Добавляем данные из функции collectOptionData('ru')
            let optionDataRu = collectOptionData('ru', 'CIGARILLO', 'add');
            console.log('optionDataRu')
            console.log(optionDataRu)
            console.log(JSON.stringify(Object.fromEntries(optionDataRu)))
            formData.append('optionJSON', JSON.stringify(Object.fromEntries(optionDataRu)));

            formData.append('enLangSeries', '');
            formData.append('enLangBrand', $('#input-cigarillo-en-brand').val());
            formData.append('enLangName', $('#input-cigarillo-en-name').val());
            formData.append('enLangCountry', $('#input-cigarillo-en-country').val());
            formData.append('enLangDescription', $('#input-cigarillo-en-description').val());
            formData.append('enLangTypeOfAccessory', '');

            // Добавляем данные из функции collectOptionData('en')
            let optionDataEn = collectOptionData('en', 'CIGARILLO', 'add');
            formData.append('enLangOptionJSON', JSON.stringify(Object.fromEntries(optionDataEn)));

            break;
        }
        case 'COFFEE': {
            // Добавляем данные в объект FormData
            formData.append('type', 'COFFEE');
            formData.append('series', '');
            formData.append('brand', $('#input-coffee-ru-brand').val());
            formData.append('name', $('#input-coffee-ru-name').val());
            formData.append('price', parseInt($('#input-coffee-price').val()) || 0);
            formData.append('size', 0);
            formData.append('ringGauge', 0);
            formData.append('fortress', 0);
            formData.append('photoMultipartFile', $('#input-coffee-img')[0].files[0]);
            formData.append('country', $('#input-coffee-ru-country').val());
            formData.append('description', $('#input-coffee-ru-description').val());
            formData.append('articleNumber', $('#input-coffee-article').val());
            formData.append('typeOfAccessory', '');
            formData.append('factoryName', '');

            // Добавляем данные из функции collectOptionData('ru')
            let optionDataRu = collectOptionData('ru', 'COFFEE', 'add');
            console.log('optionDataRu')
            console.log(optionDataRu)
            console.log(JSON.stringify(Object.fromEntries(optionDataRu)))
            formData.append('optionJSON', JSON.stringify(Object.fromEntries(optionDataRu)));

            formData.append('enLangSeries', '');
            formData.append('enLangBrand', $('#input-coffee-en-brand').val());
            formData.append('enLangName', $('#input-coffee-en-name').val());
            formData.append('enLangCountry', $('#input-coffee-en-country').val());
            formData.append('enLangDescription', $('#input-coffee-en-description').val());
            formData.append('enLangTypeOfAccessory', '');

            // Добавляем данные из функции collectOptionData('en')
            let optionDataEn = collectOptionData('en', 'COFFEE', 'add');
            formData.append('enLangOptionJSON', JSON.stringify(Object.fromEntries(optionDataEn)));

            break;
        }
        case 'ACCESSORY': {
            // Добавляем данные в объект FormData
            formData.append('type', 'ACCESSORY');
            formData.append('series', '');
            formData.append('brand', '');
            formData.append('name', $('#input-accessory-ru-name').val());
            formData.append('price', parseInt($('#input-accessory-price').val()) || 0);
            formData.append('size', 0);
            formData.append('ringGauge', 0);
            formData.append('fortress', 0);
            formData.append('photoMultipartFile', $('#input-accessory-img')[0].files[0]);
            formData.append('country', $('#input-accessory-ru-country').val());
            formData.append('description', $('#input-accessory-ru-description').val());
            formData.append('articleNumber', $('#input-accessory-article').val());
            formData.append('typeOfAccessory', $('#input-accessory-ru-type-of-accessory').val());

            // Добавляем данные из функции collectOptionData('ru')
            let optionDataRu = collectOptionData('ru', 'ACCESSORY', 'add');
            console.log('optionDataRu')
            console.log(optionDataRu)
            console.log(JSON.stringify(Object.fromEntries(optionDataRu)))
            formData.append('optionJSON', JSON.stringify(Object.fromEntries(optionDataRu)));

            formData.append('enLangSeries', '');
            formData.append('enLangBrand', '');
            formData.append('enLangName', $('#input-accessory-en-name').val());
            formData.append('enLangCountry', $('#input-accessory-en-country').val());
            formData.append('enLangDescription', $('#input-accessory-en-description').val());
            formData.append('enLangTypeOfAccessory', $('#input-accessory-en-type-of-accessory').val());
            formData.append('factoryName', '');

            // Добавляем данные из функции collectOptionData('en')
            let optionDataEn = collectOptionData('en', 'ACCESSORY', 'add');
            formData.append('enLangOptionJSON', JSON.stringify(Object.fromEntries(optionDataEn)));

            break;
        }
    }


    return formData;
}

function createNewsDTO() {

    let formData = new FormData();

    // Добавляем данные в объект FormData
    formData.append('header', $('#input-news-ru-header').val());
    formData.append('mainText', $('#input-news-ru-main-text').val());
    formData.append('tag', $('#input-news-ru-tag').val());
    formData.append('photoMultipartFile', $('#input-news-img')[0].files[0]);


    formData.append('enLangHeader', $('#input-news-en-header').val());
    formData.append('enLangMainText', $('#input-news-en-main-text').val());
    formData.append('enLangTag', $('#input-news-en-tag').val());

    return formData;
}

function updateNewsDTO(switcher) {

    let formData = new FormData();

    // Добавляем данные в объект FormData
    formData.append('id', $('#update-news-id').attr('data-id'));
    formData.append('header', $('#input-update-news-ru-header').val());
    formData.append('mainText', $('#input-update-news-ru-main-text').val());
    formData.append('tag', $('#input-update-news-ru-tag').val());

    formData.append('enLangHeader', $('#input-update-news-en-header').val());
    formData.append('enLangMainText', $('#input-update-news-en-main-text').val());
    formData.append('enLangTag', $('#input-update-news-en-tag').val());

    if (switcher)
        formData.append('photoMultipartFile', $('#input-update-news-img')[0].files[0]);

    return formData;
}

function updateItemDTO(switcher, nameEl) {

    let formData = new FormData();


    formData.append('id', $(`#update-${nameEl}-id`).attr('data-id'));
    formData.append('name', $(`#input-update-${nameEl}-ru-name`).val());
    formData.append('price', parseInt($(`#input-update-${nameEl}-price`).val()) || 0);
    formData.append('country', $(`#input-update-${nameEl}-ru-country`).val());
    formData.append('description', $(`#input-update-${nameEl}-ru-description`).val());
    formData.append('articleNumber', $(`#input-update-${nameEl}-article`).val());
    formData.append('enLangName', $(`#input-update-${nameEl}-en-name`).val());
    formData.append('enLangCountry', $(`#input-update-${nameEl}-en-country`).val());
    formData.append('enLangDescription', $(`#input-update-${nameEl}-en-description`).val());


    // Добавляем данные из функции collectOptionData('ru')
    let optionDataRu = collectOptionData('ru', nameEl, 'update');
    formData.append('optionJSON', JSON.stringify(Object.fromEntries(optionDataRu)));
    // Добавляем данные из функции collectOptionData('en')
    let optionDataEn = collectOptionData('en', nameEl, 'update');
    formData.append('enLangOptionJSON', JSON.stringify(Object.fromEntries(optionDataEn)));

    switch (nameEl) {
        case 'CIGAR': {
            // Добавляем данные в объект FormData
            formData.append('type', 'CIGAR');
            formData.append('series', $(`#input-update-${nameEl}-ru-series`).val());
            formData.append('brand', $(`#input-update-${nameEl}-ru-brand`).val());
            formData.append('factoryName', $(`#input-update-${nameEl}-factory-name`).val());
            formData.append('size', parseInt($(`#input-update-${nameEl}-size`).val()) || 0);
            formData.append('ringGauge', parseInt($(`#input-update-${nameEl}-ring-gauge`).val()) || 0);
            formData.append('fortress', parseInt($(`#input-update-${nameEl}-fortress`).val()) || 0);
            formData.append('typeOfAccessory', '');
            formData.append('enLangSeries', $(`#input-update-${nameEl}-en-series`).val());
            formData.append('enLangBrand', $(`#input-update-${nameEl}-en-brand`).val());
            formData.append('enLangTypeOfAccessory', '');

            break;
        }
        case 'CIGARILLO': {
            // Добавляем данные в объект FormData
            formData.append('type', 'CIGARILLO');
            formData.append('series', '');
            formData.append('brand', $(`#input-update-${nameEl}-ru-brand`).val());
            formData.append('size', 0);
            formData.append('ringGauge', 0);
            formData.append('fortress', 0);
            formData.append('typeOfAccessory', '');
            formData.append('enLangSeries', '');
            formData.append('enLangBrand', $(`#input-update-${nameEl}-en-brand`).val());
            formData.append('enLangTypeOfAccessory', '');
            formData.append('factoryName', '');

            break;
        }
        case 'COFFEE': {
            // Добавляем данные в объект FormData
            formData.append('type', 'COFFEE');
            formData.append('series', '');
            formData.append('brand', $(`#input-update-${nameEl}-ru-brand`).val());
            formData.append('size', 0);
            formData.append('ringGauge', 0);
            formData.append('fortress', 0);
            formData.append('typeOfAccessory', '');
            formData.append('enLangSeries', '');
            formData.append('enLangBrand', $(`#input-update-${nameEl}-en-brand`).val());
            formData.append('enLangTypeOfAccessory', '');
            formData.append('factoryName', '');

            break;
        }
        case 'ACCESSORY': {
            // Добавляем данные в объект FormData
            formData.append('type', 'ACCESSORY');
            formData.append('series', '');
            formData.append('brand', '');
            formData.append('size', 0);
            formData.append('ringGauge', 0);
            formData.append('fortress', 0);
            formData.append('typeOfAccessory', $(`#input-update-${nameEl}-ru-type-of-accessory`).val());
            formData.append('enLangSeries', '');
            formData.append('enLangBrand', '');
            formData.append('enLangTypeOfAccessory', $(`#input-update-${nameEl}-en-type-of-accessory`).val());
            formData.append('factoryName', '');

            break;
        }
    }

    console.log(switcher)
    if (switcher) {
        console.log('photoMultipartFile')
        formData.append('photoMultipartFile', $(`#input-update-${nameEl}-img`)[0].files[0]);
    }
    return formData;
}

function collectOptionData(language, nameEl, addOrUpdate) {

    let option = new Map();
    let countOption = parseInt($(`html #${addOrUpdate}-item-modal-select-${nameEl} .option-inputs-box-${language}`).children().length);

    if (addOrUpdate === 'add')
        for (let i = 1; i <= countOption; i++) {
            option.set(
                $(`html #input-${nameEl}-${language}-option-key-${i}`).val(),
                $(`html #input-${nameEl}-${language}-option-value-${i}`).val()
            );
        }
    else for (let i = 1; i <= countOption; i++) {
        option.set(
            $(`html #input-update-${nameEl}-${language}-option-key-${i}`).val(),
            $(`html #input-update-${nameEl}-${language}-option-value-${i}`).val()
        );
    }

    return option;
}

// Отправка данных на сервер
function sendItemDTOToServer(nameEl) {
    let itemDTO = createItemDTO(nameEl);

    console.log(`sendItem`)
    for (let pair of itemDTO.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }

    $.ajax({
        url: '/api/admin/addItem',
        method: 'POST',
        processData: false,
        contentType: false,
        data: itemDTO,
        success: function (data) {
            if (data) {
                addItemSuccess()
                startAdminPage()
            } else addItemError(', валидация на сервере не прошла')
            // Обработка успешного ответа от сервера
            console.log('ItemDTO успешно отправлен на сервер:', data);
        },
        error: function (xhr, status, error) {

            addItemError(', ошибка на сервере')
            console.error('Ошибка при отправке ItemDTO на сервер:', status, error);
        }
    });
}

// Отправка данных на сервер
function sendNewsDTOToServer() {
    let newsDTO = createNewsDTO();

    console.log(`sendNews`)
    for (let pair of newsDTO.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }

    $.ajax({
        url: '/api/admin/addNews',
        method: 'POST',
        processData: false,
        contentType: false,
        data: newsDTO,
        success: function (data) {
            if (data) {
                addItemSuccess()
                startAdminPage()
            } else addItemError(', валидация на сервере не прошла')
            // Обработка успешного ответа от сервера
            console.log('NewsDTO успешно отправлен на сервер:', data);
        },
        error: function (xhr, status, error) {

            addItemError(', ошибка на сервере')
            console.error('Ошибка при отправке NewsDTO на сервер:', status, error);
        }
    });
}

// Отправка данных на сервер
function sendNewsDTOToServerUpdate(switcher) {


    let newsDTO = updateNewsDTO(switcher);

    console.log(`updateNews`)
    for (let pair of newsDTO.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }

    $.ajax({
        url: '/api/admin/updateNews',
        method: 'PUT',
        processData: false,
        contentType: false,
        data: newsDTO,
        success: function (data) {
            if (data) {
                $('.update-input-file').attr('data-target', 'false')
                addItemSuccess()
                startAdminPage()
            } else addItemError(', валидация на сервере не прошла')
            // Обработка успешного ответа от сервера
            console.log('NewsDTO успешно отправлен на сервер:', data);
        },
        error: function (xhr, status, error) {

            addItemError(', ошибка на сервере')
            console.error('Ошибка при отправке NewsDTO на сервер:', status, error);
        }
    });
}

// Отправка данных на сервер
function sendItemDTOToServerUpdate(switcher, nameEl) {


    let newsDTO = updateItemDTO(switcher, nameEl);

    console.log(`updateItem`)
    for (let pair of newsDTO.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }

    $.ajax({
        url: '/api/admin/updateItem',
        method: 'PUT',
        processData: false,
        contentType: false,
        data: newsDTO,
        success: function (data) {
            if (data) {
                addItemSuccess()
                startAdminPage()
            } else addItemError(', валидация на сервере не прошла')
            // Обработка успешного ответа от сервера
            console.log('NewsDTO успешно отправлен на сервер:', data);
        },
        error: function (xhr, status, error) {

            addItemError(', ошибка на сервере')
            console.error('Ошибка при отправке NewsDTO на сервер:', status, error);
        }
    });
}

function deleteAllInputs() {
    $('.input-file-list-remove').trigger('click')
    let allEl = $('#modal-add-item input[type=text], #modal-add-item input[type=number], #modal-add-item textarea, #modal-add-news input[type=text], #modal-add-news textarea')
    // Удаление всех классов с ошибками перед новой проверкой
    $('.modal__img-row').removeClass('input-error');
    allEl.removeClass('input-error');
    allEl.each(function () {
        $(this).val('')
    });
}

function addItemSuccess() {
    let resultDiv = $('html .result-text-add-item')
    resultDiv.show()
    resultDiv.removeClass('add-item-error')
    resultDiv.addClass('add-item-success')
    resultDiv.text(`Удачно`);

    setTimeout(function () {
        $('html .modal-add-item-btn-close').trigger('click')
        resultDiv.hide();
        setTimeout(function () {
            resultDiv.removeClass('add-item-success')
            resultDiv.text('')
            deleteAllInputs()
        }, 1000);
    }, 2500);
}

function addItemError(text) {

    let resultDiv = $('.result-text-add-item')
    resultDiv.show()
    resultDiv.addClass('add-item-error')
    resultDiv.text(`Проверьте введенные данные${text}`);

    setTimeout(function () {
        resultDiv.hide();
        setTimeout(function () {
            resultDiv.removeClass('add-item-error')
            resultDiv.text('')
        }, 1000);
    }, 20000);
}


$('html').on('input', '.styleForJqIsOnlyForEnteringIntegers', function () {
    let inputValue = $(this).val();

    // Оставляем только цифры
    inputValue = inputValue.replace(/[^0-9]/g, '');

    // Проверка на превышение 10 000 000
    if (parseInt(inputValue, 10) > 10000000) {
        inputValue = '10000000'; // Ограничиваем значение до 10 000 000
    }

    $(this).val(inputValue);
});

function addNewLine(langEl, el) {
    let input = $(`#input${el}-news-${langEl}-main-text`);
    let inputValue = input.val();
    inputValue += '<br>';
    input.val(inputValue);
}

function updateNews(data) {

    $('#update-news-id').text('id:' + data.id)
    $('#update-news-id').attr('data-id', data.id)
    $('#input-update-news-ru-header').val(data.header)
    $('#input-update-news-ru-tag').val(data.tag)
    $('#input-update-news-ru-main-text').val(data.mainText)
    $('#input-update-news-en-header').val(data.enLangHeader)
    $('#input-update-news-en-tag').val(data.enLangTag)
    $('#input-update-news-en-main-text').val(data.enLangMainText)
}

function openModalUpdateNews(id) {

    $.ajax({
        url: siteBaseURL + '/api/admin/getNewsById/' + id,
        method: 'GET', // Метод запроса
        dataType: 'json', // Ожидаемый формат данных
        success: function (data) {
            updateNews(data);
        }, error: function (xhr, status, error) {
            console.error(status, error);
        }
    });

}


function updateItem(data) {
    $(`html .input-file-list-remove`).trigger('click')
    $(`.update-input-file-item-${data.type}`).attr('data-target', false)

    $('[id^="header-btn-"]').css('display', 'none');
    $(`#header-btn-${data.type}`).css('display', 'flex');
    $('[id^="update-item-modal-select-"]').css('display', 'none');
    $(`#update-item-modal-select-${data.type}`).css('display', 'flex');

    $('#modelBtnCheckItemUpdate').attr('onclick', `modelBtnCheckItemUpdate('${data.type}')`)
    $('#modelBtnUpdateItem').attr('onclick', `modelBtnUpdateItem('${data.type}')`)

    let button = $(`html #update-item-modal-select-${data.type} .modal-btn-option-minus`);

    while (!button.prop('disabled')) {
        button.eq(0).trigger('click');
    }

    console.log(data)
    switch (data.type) {
        case 'CIGAR': {
            $(`#input-update-${data.type}-ru-series`).val(data.series)
            $(`#input-update-${data.type}-en-series`).val(data.enLangSeries)
            $(`#input-update-${data.type}-size`).val(data.size)
            $(`#input-update-${data.type}-ring-gauge`).val(data.ringGauge)
            $(`#input-update-${data.type}-fortress`).val(data.fortress)

            $(`#input-update-${data.type}-ru-brand`).val(data.brand)
            $(`#input-update-${data.type}-factory-name`).val(data.factoryName)
            $(`#input-update-${data.type}-en-brand`).val(data.enLangBrand)
            break;
        }
        case 'CIGARILLO':
        case 'COFFEE': {

            $(`#input-update-${data.type}-ru-brand`).val(data.brand)
            $(`#input-update-${data.type}-en-brand`).val(data.enLangBrand)
            break;
        }
        case 'ACCESSORY': {
            $(`#input-update-${data.type}-ru-type-of-accessory`).val(data.typeOfAccessory)
            $(`#input-update-${data.type}-en-type-of-accessory`).val(data.enLangTypeOfAccessory)

            break;
        }
    }

    $(`#update-${data.type}-id`).text('id:' + data.id)
    $(`#update-${data.type}-id`).attr('data-id', data.id)


    $(`#input-update-${data.type}-ru-name`).val(data.name)
    $(`#input-update-${data.type}-ru-country`).val(data.country)
    $(`#input-update-${data.type}-ru-description`).val(data.description)
    $(`#input-update-${data.type}-en-name`).val(data.enLangName)
    $(`#input-update-${data.type}-en-country`).val(data.enLangCountry)
    $(`#input-update-${data.type}-en-description`).val(data.enLangDescription)
    $(`#input-update-${data.type}-article`).val(data.articleNumber)
    $(`#input-update-${data.type}-price`).val(data.price)

    let i = 1;

    for (const [key, value] of Object.entries(data.option)) {
        if (!(i === 1)) {
            $(`html #update-item-modal-select-${data.type} .modal-btn-option-plus`).eq(0).trigger('click');
        }
        $(`#input-update-${data.type}-ru-option-key-${i}`).val(key);
        $(`#input-update-${data.type}-ru-option-value-${i}`).val(value);
        i++;
    }

    let k = 1;

    for (const [key, value] of Object.entries(data.enLangOption)) {
        $(`#input-update-${data.type}-en-option-key-${k}`).val(key);
        $(`#input-update-${data.type}-en-option-value-${k}`).val(value);
        k++;
    }
}


function openModalUpdateItem(id) {

    $.ajax({
        url: siteBaseURL + '/api/admin/getItemById/' + id,
        method: 'GET', // Метод запроса
        dataType: 'json', // Ожидаемый формат данных
        success: function (data) {
            updateItem(data);
        }, error: function (xhr, status, error) {
            console.error(status, error);
        }
    });

}

$('.update-input-file, .update-input-file-item-ACCESSORY, .update-input-file-item-CIGAR, .update-input-file-item-CIGARILLO, .update-input-file-item-COFFEE').click(function () {
    $(this).attr('data-target', 'true')
})

function openModalUpdatePhoneAndLink(nameEl) {

    $('#modal-update-phone-and-link-btn').text('Подтвердить изменения')
    $('#modal-update-phone-and-link-btn').attr('data-target', 'update')

    let firstLine = $(`#modal-update-phone-and-link-body-line-first`)
    let input = $(`#modal-update-phone-and-link-input`)

    $.ajax({
        url: siteBaseURL + '/api/admin/getPhoneAndLink', method: 'GET', // Метод запроса
        dataType: 'json', // Ожидаемый формат данных
        success: function (data) {

            switch (nameEl) {
                case 'kuznechnyTelephonyHouse': {
                    firstLine.text('Домашний телефон на Кузнечном');
                    input.val(data.kuznechnyTelephonyHouse);
                    input.attr('data-name', 'kuznechnyTelephonyHouse');
                    break
                }
                case 'kuznechnyTelephonyMobile': {
                    firstLine.text('Мобильный телефон на Кузнечном');
                    input.val(data.kuznechnyTelephonyMobile);
                    input.attr('data-name', 'kuznechnyTelephonyMobile');
                    break
                }
                case 'petrogradskoyTelephonyHouse': {
                    firstLine.text('Домашний телефон на Петроградской');
                    input.val(data.petrogradskoyTelephonyHouse);
                    input.attr('data-name', 'petrogradskoyTelephonyHouse');
                    break
                }
                case 'petrogradskoyTelephonyMobile': {
                    firstLine.text('Мобильный телефон на Петроградской');
                    input.val(data.petrogradskoyTelephonyMobile);
                    input.attr('data-name', 'petrogradskoyTelephonyMobile');
                    break
                }
                case 'linkTLG': {
                    firstLine.text('Ссылка на телеграм');
                    input.val(data.linkTLG);
                    input.attr('data-name', 'linkTLG');
                    break
                }
                case 'linkVK': {
                    firstLine.text('Ссылка на вконтакте');
                    input.val(data.linkVK);
                    input.attr('data-name', 'linkVK');
                    break
                }
                case 'linkINST': {
                    firstLine.text('Ссылка на инстаграмм');
                    input.val(data.linkINST);
                    input.attr('data-name', 'linkINST');
                    break
                }
                case 'linkFB': {
                    firstLine.text('Ссылка на фейсбук');
                    input.val(data.linkFB);
                    input.attr('data-name', 'linkFB');
                    break
                }
                case 'linkMail': {
                    firstLine.text('Ссылка на почту');
                    input.val(data.linkMail);
                    input.attr('data-name', 'linkMail');
                    break
                }
                case 'linkDevelopers': {
                    firstLine.text('Ссылка на разработчиков');
                    input.val(data.linkDevelopers);
                    input.attr('data-name', 'linkDevelopers');
                    break
                }
                case 'linkCubaRestaurant': {
                    firstLine.text('Ссылка на сайт O!Cuba');
                    input.val(data.linkCubaRestaurant);
                    input.attr('data-name', 'linkCubaRestaurant');
                    break
                }
                case 'linkCubaDay': {
                    firstLine.text('Ссылка на сайт Cuba Day');
                    input.val(data.linkCubaDay);
                    input.attr('data-name', 'linkCubaDay');
                    break
                }
            }
        }, error: function (xhr, status, error) {
            console.error(status, error);
        }
    });
}

function openModalUpdateTitleOnCatalogPage() {
    $.ajax({
        url: siteBaseURL + '/api/admin/getTitleOnCatalogPage', method: 'GET', // Метод запроса
        dataType: 'json', // Ожидаемый формат данных
        success: function (data) {
            console.log(`input[name="modal-update-title-on-catalog-page-switcher"][value="${data.switcher}"]`)
            $(`input[name="modal-update-title-on-catalog-page-switcher"][value="${data.switcher}"]`).prop('checked', true);
            $(`#modal-update-title-on-catalog-page-textRu`).val(data.textRu)
            $(`#modal-update-title-on-catalog-page-textEn`).val(data.textEn)
            $(`#modal-update-title-on-catalog-page-colorText`).val(data.colorText)
            $(`#modal-update-title-on-catalog-page-colorBackground`).val(data.colorBackground)

        }, error: function (xhr, status, error) {
            console.error(status, error);
        }
    });
}

function openModalAddTelegramId() {

    $('#modal-update-phone-and-link-btn').text('Добавить')
    $('#modal-update-phone-and-link-btn').attr('data-target', 'add')

    $(`#modal-update-phone-and-link-body-line-first`).text('Добавить телеграм id');

}


$('#modal-update-phone-and-link-btn').click(function () {
    let input = $(`#modal-update-phone-and-link-input`)


    if ($('#modal-update-phone-and-link-btn').attr('data-target') === 'update') {

        let formData = new FormData()
        formData.append('phoneAndLink', input.val() + '&%&' + input.attr('data-name'))
        console.log(formData)
        $.ajax({
            url: '/api/admin/updatePhoneAndLink',
            method: 'PUT',
            processData: false,
            contentType: false,
            data: formData,
            success: function (data) {
                if (data) successUpdatePhoneAndLink()
                else errorUpdatePhoneAndLink()
            },
            error: function (xhr, status, error) {

                errorUpdatePhoneAndLink()
                console.error('Ошибка при отправке ItemDTO на сервер:', status, error);
            }
        });
    }
    else {
        $.ajax({
            url: siteBaseURL + '/api/admin/addTelegramId/'+input.val(), method: 'POST', // Метод запроса
            dataType: 'json', // Ожидаемый формат данных
            success: function (data) {
                if (data) successUpdatePhoneAndLink()
                else errorUpdatePhoneAndLink()
            },
            error: function (xhr, status, error) {

                errorUpdatePhoneAndLink()
                console.error('Ошибка при отправке telegram ID на сервер:', status, error);
            }
        });
    }

})

$('#modal-update-title-on-catalog-page-btn').click(function () {

        let formData = new FormData()
        formData.append('switcher', $('input[name="modal-update-title-on-catalog-page-switcher"]:checked').val())
        formData.append('textRu', $('#modal-update-title-on-catalog-page-textRu').val())
        formData.append('textEn', $('#modal-update-title-on-catalog-page-textEn').val())
        formData.append('colorText', $('#modal-update-title-on-catalog-page-colorText').val())
        formData.append('colorBackground', $('#modal-update-title-on-catalog-page-colorBackground').val())
        console.log(formData)
        $.ajax({
            url: '/api/admin/updateTitleOnCatalogPage',
            method: 'PUT',
            processData: false,
            contentType: false,
            data: formData,
            success: function (data) {
                if (data) successUpdateTitleOnCatalogPage()
                else errorUpdateTitleOnCatalogPage()
            },
            error: function (xhr, status, error) {

                errorUpdateTitleOnCatalogPage()
                console.error('Ошибка:', status, error);
            }
        });

})


function successUpdatePhoneAndLink() {
    $('#modal-update-phone-and-link-btn').text('Удачно')
    $('#modal-update-phone-and-link-footer').addClass('modal-success')
    setTimeout(function () {
        $('#modal-update-phone-and-link-btn-close').trigger('click')
        startAdminPage()
        setTimeout(function () {
            $('#modal-update-phone-and-link-footer').removeClass('modal-success')
        }, 500)
    }, 1500)
}

function errorUpdatePhoneAndLink() {
    $('#modal-update-phone-and-link-btn').text('Ошибка')
    $('#modal-update-phone-and-link-footer').addClass('modal-error')
    setTimeout(function () {
        $('#modal-update-phone-and-link-btn-close').trigger('click')
        setTimeout(function () {
            $('#modal-update-phone-and-link-footer').removeClass('modal-error')
        }, 500)
    }, 1500)
}
function successUpdateTitleOnCatalogPage() {
    $('#modal-update-title-on-catalog-page-btn').text('Удачно')
    $('#modal-update-title-on-catalog-page-footer').addClass('modal-success')
    setTimeout(function () {
        $('#modal-update-title-on-catalog-page-btn-close').trigger('click')
        startAdminPage()
        setTimeout(function () {
            $('#modal-update-title-on-catalog-page-footer').removeClass('modal-success')
            $('#modal-update-title-on-catalog-page-btn').text('Подтвердить изменения')
        }, 500)
    }, 1500)
}

function errorUpdateTitleOnCatalogPage() {
    $('#modal-update-title-on-catalog-page-btn').text('Ошибка')
    $('#modal-update-title-on-catalog-page-footer').addClass('modal-error')
    setTimeout(function () {
        $('#modal-update-title-on-catalog-page-btn-close').trigger('click')
        setTimeout(function () {
            $('#modal-update-title-on-catalog-page-footer').removeClass('modal-error')
            $('#modal-update-title-on-catalog-page-btn').text('Подтвердить изменения')
        }, 500)
    }, 1500)
}