// массив с фильтрами
let arrayFilters = [];


function getFiltersFromHashURL() {
    let hash = decodeURIComponent(window.location.hash);

    if (hash.length > 1) {
        // Убираем символ # в начале хэша
        hash = hash.substring(1);

        // Разбиваем хэш на отдельные элементы, используя символ '?'
        let hashElements = hash.split('&');

        let type
        // Создаем объекты filters на основе элементов хэша
        hashElements.forEach(function (element) {

            let keyValue = element.split('?');

            let key = keyValue[0];

            let values = keyValue[1].split('='); // Объединяем оставшиеся части, чтобы поддерживать значения с символами '='

            let filters = {
                type: values[0], // Замените на нужный тип фильтра
                itemName: values[1],
                value: values[2]
            };

            arrayFilters.push({key: key, value: filters});
            // if (key === '10') {
            if (key === 'product') {
                let typeCheckbox = $(`input[data-name="${filters.value}"][name="type"]`)
                typeCheckbox.prop('checked', true);
                typeCheckbox.parent().addClass('checkbox-type-filter-checked');
                checkboxType(typeCheckbox)
                type = filters.value
            }
            if (filters.itemName === 'series') { //в фильтрах добавляется много элементов!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                filtersName = filters.value.replace(/\s/g, "_").toLowerCase();

                $(`[name="series"]`).each(function () {
                    let name = $(this).attr('data-name').replace(/\s/g, "_").toLowerCase();
                    if (filtersName === name) {
                        $(this).prop('checked', true);

                        let htmlToAppend = `
                            <div id="${key}" class="d-flex justify-content-between align-items-center me-5 underline-one filter-remove" data-option="${filters.itemName}" data-name="${filtersName.replace(/_/g, ' ')}">
                            <div class="text-nowrap">${filtersName.replace(/_/g, ' ')}</div>
                            <button class="pe-0"><img src="/img/cross_black.svg" alt="cross_black"></button>
                            </div>
                        `;
                        // Используем метод append() для добавления HTML-кода в элемент с классом "filters"
                        $('.filters').append(htmlToAppend);

                        addOrUpdateFilters(typeOfFilter.TEXT, filters.itemName, filtersName, key)
                        return

                    }
                })
            } else if (filters.itemName === 'brand') { //в фильтрах добавляется много элементов!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                type = type.charAt(0).toUpperCase() + type.slice(1)
                filtersName = filters.value.replace(/\s/g, "_").toLowerCase();

                $(`#brands${type} [name="${filters.itemName}"]`).each(function () {
                    let name = $(this).attr('data-name').replace(/\s/g, "_").toLowerCase();
                    if (filtersName === name) {
                        $(this).prop('checked', true);

                        let htmlToAppend = `
                            <div id="${key}" class="d-flex justify-content-between align-items-center me-5 underline-one filter-remove" data-option="${filters.itemName}" data-name="${filtersName.replace(/_/g, ' ')}">
                            <div class="text-nowrap">${filtersName.replace(/_/g, ' ')}</div>
                            <button class="pe-0"><img src="/img/cross_black.svg" alt="cross_black"></button>
                            </div>
                        `;
                        // Используем метод append() для добавления HTML-кода в элемент с классом "filters"
                        $('.filters').append(htmlToAppend);

                        addOrUpdateFilters(typeOfFilter.TEXT, filters.itemName, filtersName, key)
                        return

                    }
                })
            } else if (filters.itemName === 'factoryname') { //в фильтрах добавляется много элементов!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                filtersName = filters.value.replace(/\s/g, "_").toLowerCase();

                $(`[name="factoryName"]`).each(function () {
                    let name = $(this).attr('data-name').replace(/\s/g, "_").toLowerCase();
                    if (filtersName === name) {
                        $(this).prop('checked', true);

                        let htmlToAppend = `
                            <div id="${key}" class="d-flex justify-content-between align-items-center me-5 underline-one filter-remove" data-option="${filters.itemName}" data-name="${filtersName.replace(/_/g, ' ')}">
                            <div class="text-nowrap">${filtersName.replace(/_/g, ' ')}</div>
                            <button class="pe-0"><img src="/img/cross_black.svg" alt="cross_black"></button>
                            </div>
                        `;
                        // Используем метод append() для добавления HTML-кода в элемент с классом "filters"
                        $('.filters').append(htmlToAppend);

                        addOrUpdateFilters(typeOfFilter.TEXT, filters.itemName, filtersName, key)
                        return

                    }
                })
            } else if (filters.itemName === 'typeofaccessory') {
                filtersName = filters.value.replace(/\s/g, "_").toLowerCase();

                $(`[name="typeOfAccessory"]`).each(function () {
                    let name = $(this).attr('data-name').replace(/\s/g, "_").toLowerCase();
                    if (filtersName === name) {
                        $(this).prop('checked', true);

                        let htmlToAppend = `
                            <div id="${key}" class="d-flex justify-content-between align-items-center me-5 underline-one filter-remove" data-option="${filters.itemName}" data-name="${filtersName.replace(/_/g, ' ')}">
                            <div class="text-nowrap">${filtersName.replace(/_/g, ' ')}</div>
                            <button class="pe-0"><img src="/img/cross_black.svg" alt="cross_black"></button>
                            </div>
                        `;
                        // Используем метод append() для добавления HTML-кода в элемент с классом "filters"
                        $('.filters').append(htmlToAppend);

                        addOrUpdateFilters(typeOfFilter.TEXT, filters.itemName, filtersName, key)
                        return;

                    }
                })
            } else if (filters.type === 'rangemin' || filters.type === 'rangemax') {
                if (filters.itemName === 'ringgauge') filters.itemName = 'ringGauge'

                const isUpdateMin = filters.type === 'rangemin';
                const updateValue = parseInt(filters.value);

                sliders.forEach(function (slider) {
                    if (filters.itemName === slider.type) {
                        let currentSlider = $(`#${slider.id}`)[0]
                        // Получите текущие настройки слайдера
                        let currentOptions = currentSlider.noUiSlider.options;

                        currentOptions.start = isUpdateMin ? [updateValue, currentOptions.start[1]] : [currentOptions.start[0], updateValue];

                        currentSlider.noUiSlider.updateOptions(currentOptions);
                        return
                    }

                });
            }
        });
        return arrayFilters;

    } else {
        checkboxType($('.checkbox-type-filter input'))
        arrayFilters = []
        return arrayFilters;
    }


}

//

let currentSeriesArray = [];
let currentBrandsArray = [];
let currentFactoryNamesArray = [];
let currentRangePriceMinMax = []
let currentRangeRingGaugeMinMax = []
let currentRangeSizeMinMax = []
let currentRangeFortressMinMax = []

let originalSeriesCigarArray = [];
let originalBrandsCigarArray = [];
let originalFactoryNamesCigarArray = [];
let originalBrandsCigarillosArray = [];
let originalBrandsCoffeeArray = [];
let originalBrandsAccessoryArray = [];
let originalRangeAllPriceMinMax = []
let originalRangCigarPriceMinMax = []
let originalRangeCigarillosPriceMinMax = []
let originalRangeCoffeePriceMinMax = []
let originalRangeAccessoryPriceMinMax = []
let originalRangeRingGaugeMinMax = []
let originalRangeSizeMinMax = []
let originalRangeFortressMinMax = []


let allItemsOriginal //оригинальный массив данных
let allItemsCurrent = "sortByName" //текущий массив данных
// "sortByName" = сортировка по названию
// "sortByDesc" = сортировка по названию
// "sortByAsc" = сортировка по названию
let currentTypeSorting //текущий тип сортировки данных


// Массив с информацией о каждом ползунковом регуляторе
let sliders = [
    {
        id: 'range-price'
        , textFrom: '#range-price-from'
        , textTo: '#range-price-to'
        , type: 'price'
        , rangeMinMax: []
        , originalRangeMinMax: []
        , textMin: 'Price from: '
        , textMax: 'Price up to: '
    }
    , {
        id: 'range-ring-gauge'
        , textFrom: '#range-ring-gauge-from'
        , textTo: '#range-ring-gauge-to'
        , type: 'ringGauge'
        , rangeMinMax: []
        , originalRangeMinMax: []
        , textMin: 'Ring gauge from: '
        , textMax: 'Ring gauge up to: '
    }
    , {
        id: 'range-size'
        , textFrom: '#range-size-from'
        , textTo: '#range-size-to'
        , type: 'size'
        , rangeMinMax: []
        , originalRangeMinMax: []
        , textMin: 'Size from: '
        , textMax: 'Size up to: '
    }
    , {
        id: 'range-fortress'
        , textFrom: '#range-fortress-from'
        , textTo: '#range-fortress-to'
        , type: 'fortress'
        , rangeMinMax: []
        , originalRangeMinMax: []
        , textMin: 'Fortress from: '
        , textMax: 'Fortress up to: '
    }
];
// Создание ползунковых регуляторов и установка обработчиков событий для каждого


// заполняем исходными фильтрами
function addingOriginalDataInOriginalArray(isWork) {

    if (isWork) {

        originalSeriesCigarArray = getOriginalArray('cigar', 'series', allItemsOriginal);
        originalBrandsCigarArray = getOriginalArray('cigar', 'brand', allItemsOriginal);
        originalFactoryNamesCigarArray = getOriginalArray('cigar', 'factoryName', allItemsOriginal);
        originalBrandsCigarillosArray = getOriginalArray('cigarillo', 'brand', allItemsOriginal);
        originalBrandsCoffeeArray = getOriginalArray('coffee', 'brand', allItemsOriginal);
        originalBrandsAccessoryArray = getOriginalArray('accessory', 'typeOfAccessory', allItemsOriginal);

        originalRangeAllPriceMinMax = [getMinOrMaxByTypeRangeCurrentArray('price', 'min'), getMinOrMaxByTypeRangeCurrentArray('price', 'max')]

        sliders[0].originalRangeMinMax = originalRangeAllPriceMinMax
        originalRangCigarPriceMinMax = [getMinOrMaxByTypeRangeOriginalArray('cigar', 'price', 'min'), getMinOrMaxByTypeRangeOriginalArray('cigar', 'price', 'max')]
        originalRangeCigarillosPriceMinMax = [getMinOrMaxByTypeRangeOriginalArray('cigarillo', 'price', 'min'), getMinOrMaxByTypeRangeOriginalArray('cigarillo', 'price', 'max')]
        originalRangeCoffeePriceMinMax = [getMinOrMaxByTypeRangeOriginalArray('coffee', 'price', 'min'), getMinOrMaxByTypeRangeOriginalArray('coffee', 'price', 'max')]
        originalRangeAccessoryPriceMinMax = [getMinOrMaxByTypeRangeOriginalArray('accessory', 'price', 'min'), getMinOrMaxByTypeRangeOriginalArray('accessory', 'price', 'max')]
        originalRangeRingGaugeMinMax = [getMinOrMaxByTypeRangeOriginalArray('cigar', 'ringGauge', 'min'), getMinOrMaxByTypeRangeOriginalArray('cigar', 'ringGauge', 'max')]

        sliders[1].originalRangeMinMax = originalRangeRingGaugeMinMax
        originalRangeSizeMinMax = [getMinOrMaxByTypeRangeOriginalArray('cigar', 'size', 'min'), getMinOrMaxByTypeRangeOriginalArray('cigar', 'size', 'max')]
        sliders[2].originalRangeMinMax = originalRangeSizeMinMax
        originalRangeFortressMinMax = [getMinOrMaxByTypeRangeOriginalArray('cigar', 'fortress', 'min'), getMinOrMaxByTypeRangeOriginalArray('cigar', 'fortress', 'max')]
        sliders[3].originalRangeMinMax = originalRangeFortressMinMax


        sliders.forEach(function (slider) {
            let rangeSlider = $('#' + slider.id)[0];
            createSlider(slider);

            rangeSlider.noUiSlider.on('update', function (values) {
                updateText(slider.id);
                updateNavFilter(slider, values);
                slider.rangeMinMax[0] = parseInt(values[0]);
                slider.rangeMinMax[1] = parseInt(values[1]);
            });
        });
    }
}


//работа с чекбоксами серий, брендов и типов аксессуаров
$('.filters-checkbox').on('change', '[name="series"], [name="brand"], [name="factoryName"], [name="typeOfAccessory"]', function (event) {
    handleCheckboxChange(event);
});

// метод обработки чекбоктов типа
function handleCheckboxChange(event) {

    let isChecked = $(event.target).is(':checked');
    let selectedValue = $(event.target).data('name').toLowerCase();
    let selectedOption = $(event.target).data('option').toLowerCase();

    let selectedId = selectedValue.replace(/\s/g, "_");
    if (isChecked) {
        let htmlToAppend = `
                <div id="${selectedId}" class="d-flex justify-content-between align-items-center me-5 underline-one filter-remove" data-option="${selectedOption}" data-name="${selectedValue}">
                  <div class="text-nowrap">${selectedValue}</div>
                  <button class="pe-0"><img src="/img/cross_black.svg" alt="cross_black"></button>
                </div>
              `;
        // Используем метод append() для добавления HTML-кода в элемент с классом "filters"
        $('.filters').append(htmlToAppend);

        addOrUpdateFilters(typeOfFilter.TEXT, selectedOption, selectedValue, selectedId)
    } else {

        $(`#${selectedId}`).remove()

        deleteFilters(selectedId)
    }
}

//сортировка
$(document).ready(function () {
    $('.new-select__item').on('click', function () {
        let selectedValue = $(this).attr('data-value');
        sortingItems(allItemsCurrent, selectedValue)
    });
});
//работа с чекбоксами типов
$('.filters-main').on('change', '.checkbox-type-filter input', function () {
    checkboxType($(this))
});

function checkboxType(el) {

    let allUnchecked = $('.checkbox-type-filter input').filter(':not(:checked)').length === $('.checkbox-type-filter input').length;


    if (allUnchecked) {
        let htmlToAppend = `
                <div id="allType" class="d-flex justify-content-between align-items-center me-5 underline-one filter-remove" data-option="type">
                  <div class="text-nowrap me-1">Все товары</div>
                </div>
              `;
        $('.filters').prepend(htmlToAppend);
        if ($(`#type`).length) {
            $(`#type`).remove();
        }
        window.location.hash = ''

        $('#filterSeries, #filterBrands, #filterFactoryNames, #filterRingGuage, #filterSize, #filterFortress, #filterTypeOfAccessory').css('display', 'none')
        arrayFilters = [] //очистка от всех фильтров

        if (typeof allItemsOriginal === 'object') {
            sortingItems(allItemsOriginal, currentTypeSorting)
            updateRangeMinMax(getMinOrMaxByTypeRangeCurrentArray('price', 'min'), getMinOrMaxByTypeRangeCurrentArray('price', 'max'), 'price')
        }

    } else {

        // filterRemoveTrigger('rangePrice');
        $(`#allType`).remove();
        let dataName = $(el).data('name');


        if ($(`#type`).length) {
            $(`#type`).find('.type-name').text(dataName);

        } else {
            // idFilter = Math.floor(Math.random() * (max - min + 1)) + min
            let htmlToAppend = `
                <div id="type" class="d-flex justify-content-between align-items-center me-5 underline-one filter-remove" data-option="type" data-name="${dataName}">
                  <div class="text-nowrap me-1">Type:</div>
                  <div class="text-nowrap type-name" data-idfilter="product" >${dataName}</div>
                  <button class="pe-0"><img src="/img/cross_black.svg" alt="cross_black"></button>
                </div>
              `;
            $('.filters').prepend(htmlToAppend);
        }

        switch (dataName) {
            case 'cigar':
                $('#filterSeries, #filterBrands, #filterFactoryNames, #filterRingGuage, #filterSize, #filterFortress, #brandsCigar').css('display', 'block')
                $('#brandsCoffee, #brandsCigarillo, #filterTypeOfAccessory').css('display', 'none')
                break;
            case 'cigarillo':
                $('#filterBrands, #brandsCigarillo').css('display', 'block')
                $('#filterSeries, #brandsCigar, #brandsCoffee, #filterFactoryNames, #filterRingGuage, #filterSize, #filterFortress, #filterTypeOfAccessory').css('display', 'none')
                break;
            case 'coffee':
                $('#filterBrands, #brandsCoffee').css('display', 'block')
                $('#filterSeries, #brandsCigar, #brandsCigarillo, #filterFactoryNames, #filterRingGuage, #filterSize, #filterFortress, #filterTypeOfAccessory').css('display', 'none')
                break;
            case 'accessory':
                $('#filterTypeOfAccessory').css('display', 'block')
                $('#filterSeries, #filterBrands, #filterFactoryNames, #filterRingGuage, #filterSize, #filterFortress').css('display', 'none')
                break;
            default:
                $('#filterSeries, #filterBrands, #filterFactoryNames, #filterRingGuage, #filterSize, #filterFortress, #filterTypeOfAccessory').css('display', 'none')
                break;
        }

        arrayFilters = [] //очистка от всех фильтров
        allItemsCurrent = allItemsOriginal // после выбора типа, необходимо сначала привести текущий массив в оригинальный, а потом его фильтровать
        addOrUpdateFilters(typeOfFilter.TEXT, nameFilter.TYPE, dataName, 'product') // idFilter у Типа всегда product

        updateRangeMinMax(getMinOrMaxByTypeRangeCurrentArray('price', 'min'), getMinOrMaxByTypeRangeCurrentArray('price', 'max'), 'price')

    }

    filterRemoveTrigger('noAllEl')

}


//удаление фильтров
$('.filters').on('click', '.filter-remove', function () {

    let id = $(this).attr('id')
    let name = $(this).attr('data-name')
    let option = $(this).attr('data-option')

    if (option === 'type') {
        $('.checkbox-type-filter').removeClass('checkbox-type-filter-checked');
        $('.checkbox-type-filter input').not(this).prop('checked', false);
        $(this).remove();
        checkboxType($('.checkbox-type-filter input'))

    } else if (option === 'series' || option === 'brand' || option === 'factoryname' || option === 'typeofaccessory') {
        let element = $(`input[data-name="${name}"]`)
        element.prop('checked', false);
        let index = currentSeriesArray.indexOf(name);
        if (index > -1) {
            currentSeriesArray.splice(index, 1);
        }
        index = currentBrandsArray.indexOf(name);
        if (index > -1) {
            currentBrandsArray.splice(index, 1);
        }
        $(this).remove()
    } else {
        let currentSlider;

        sliders.forEach(function (slider) {
            if (slider.type === option) {
                currentSlider = slider;
                return
            }
        });

        let element = $(`#${currentSlider.id}`)
        let [fromValue, toValue] = element[0].noUiSlider.get();
        if ('from' === name) {
            element[0].noUiSlider.set([currentSlider.originalRangeMinMax[0], null])
            $(currentSlider.textFrom).text(currentSlider.originalRangeMinMax[0]);
            currentSlider.rangeMinMax = [currentSlider.originalRangeMinMax[0], toValue]
        }
        if ('to' === name) {
            element[0].noUiSlider.set([null, currentSlider.originalRangeMinMax[1]])
            $(currentSlider.textTo).text(currentSlider.originalRangeMinMax[1]);
            currentSlider.rangeMinMax = [fromValue, currentSlider.originalRangeMinMax[1]]
        }
    }

    deleteFilters(id)
});
$('#resetFilters').click(function () {
    filterRemoveTrigger('allEl')
    window.location.hash = ''
})

//функция для удаления всех фильтров, удаляет либо сразу все фильтры, либо все, кроме "все товары"
function filterRemoveTrigger(switcher) {
    if (switcher === 'allEl') {
        $('.filter-remove').trigger('click');
    } else if (switcher === 'rangePrice') {
        if (!($(this).attr('data-option') === 'price')) $(this).trigger('click');
    } else $('.filter-remove').each(function () {
        if (!($(this).attr('data-option') === 'type')) $(this).trigger('click');
    })

}

// сортировка и вывод элементов
function sortingItems(items, bySort) {


    if (currentTypeSorting !== bySort) {

        currentTypeSorting = bySort // изменяем текущий вид сортировки

        if (bySort === "desc") { // сортировка по убыванию
            items.sort(function (a, b) {
                return b.price - a.price;
            });
        } else if (bySort === "asc") { // сортировка по возрастанию
            items.sort(function (a, b) {
                return a.price - b.price;
            });
        } else {
            items.sort(function (a, b) { // сортировка по алфавиту
                let nameA = a.name.toUpperCase();
                let nameB = b.name.toUpperCase();
                return nameA.localeCompare(nameB);
            });
        }
    }

    allItemsCurrent = items
    let container = $('#containerForItems');

    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let pageSizeItem = screenWidth < 978 ? 10 : 9;


    $('#pagination-catalog').pagination({
        dataSource: allItemsCurrent
        , pageSize: pageSizeItem
        , callback: function (data) {
            gsap.to(window, {
                duration: 0.2,
                scrollTo: {y: "#scrollToCatalog", offsetY: 50}
            });

            container.children(':not(#nav-filter, #pagination-footer)').remove()

            if (data.length === 0) {
                let itemDiv = document.createElement('div');
                itemDiv.classList.add('col-md-4', 'col-6', 'mt-sm-5', 'mt-3', 'catalog__card');
                itemDiv.innerHTML = `
                    <div class="catalog__card_padding_text">
                        <div class="mt-2 catalog__card_name justify-content-center h5">
                            <div>По данным фильтрам товаров нет</div>
                        </div>
                        
                    </div>
                `;
                container.append(itemDiv);
            }
            // Отображение элементов на текущей странице
            else {
                for (let i = 0; i < data.length; i++) {
                    createItem(container, data[i]);
                }
                // настройка высоты, чтобы линия соприкосалась снизом
                window.autoWidthImgInCardItems()
            }
            $("#pagination-footer").appendTo(container);

            window.autoHeightCenterColumn()
        }
    });
}


// { образец элемента
//     type: "typeOfFilter.TEXT",
//     itemName: "nameFilter.PRICEMIN",
//     value: 66
// }

// enum Тип фильтра
// typeOfFilter - тип фильтра "text" , "rangeFrom" , "rangeTo"
const typeOfFilter = {
    TEXT: 'TEXT',
    RANGEMIN: 'RANGEMIN',
    RANGEMAX: 'RANGEMAX'
};

// enum название фильтра
// nameFilter - название фильтра "series" , "brand"  ect.
const nameFilter = {
    TYPE: 'TYPE',
    SERIES: 'SERIES',
    BRAND: 'BRAND',
    FACTORYNAME: 'FACTORYNAME',
    TYPESOFACCESSOTY: 'TYPESOFACCESSOTY',
    PRICE: 'PRICE',
    RINGGAUGE: 'RINGGAUGE',
    SIZE: 'SIZE',
    FORTRESS: 'FORTRESS'
};

// метод, который фильтрует массив данных при обновлении фильтров
function addOrUpdateFilters(typeOfFilter, nameFilter, filter, idFilter) {
    let filters = {};


    //перевод на нижний регистр, если текст
    idFilter = typeof idFilter === "string" ? idFilter.toLowerCase() : idFilter;
    typeOfFilter = typeof typeOfFilter === "string" ? typeOfFilter.toLowerCase() : typeOfFilter;
    nameFilter = typeof nameFilter === "string" ? nameFilter.toLowerCase() : nameFilter;
    filter = typeof filter === "string" ? filter.replace(/_/g, ' ').toLowerCase() : filter;

    filters = {
        type: typeOfFilter,
        itemName: nameFilter,
        value: filter
    };

    // Если элемент с заданным ключом не был найден, можно добавить его в массив
    if (!arrayFilters.some(item => item.key === idFilter)) {
        arrayFilters.push({key: idFilter, value: filters});
    } else {
        // Перебираем массив arrayFilters
        for (let i = 0; i < arrayFilters.length; i++) {
            // Проверяем, есть ли элемент с заданным ключом
            if (arrayFilters[i].key === idFilter) {
                // Найден элемент с заданным ключом, обновляем его значение
                arrayFilters[i].value = filters;
                break; // Можно завершить цикл, так как элемент найден
            }
        }
    }

    updateDataWithCurrentFilters()
}

// метод, который фильтрует массив данных при удалении фильтров
function deleteFilters(idFilter) {

    for (let i = 0; i < arrayFilters.length; i++) {

        if (arrayFilters[i].key === idFilter.toLowerCase()) {
            arrayFilters.splice(i, 1);
            break; // Для прекращения цикла после удаления объекта
        }
    }
    updateDataWithCurrentFilters()
}

function updateDataWithCurrentFilters() {
    let newArrayAllItems = allItemsOriginal;

    if (arrayFilters.length > 0) {

        arrayFilters.forEach(function (filter) {
            if (filter.value.itemName === 'type') {
                // первое сортировка по фильтру ТИПА
                newArrayAllItems = updateDataWithUsingTypeOfFilterOnText(newArrayAllItems, filter.value.itemName, filter.value.value);
                allItemsCurrent = newArrayAllItems;

            }
        })


        if (arrayFilters.length > 1) {

            let combinedArray = []
            arrayFilters.forEach(function (filter) {
                if (filter.value.itemName === 'series') {
                    let newArraySeries = updateDataWithUsingTypeOfFilterOnText(newArrayAllItems, filter.value.itemName, filter.value.value);
                    combinedArray.push(newArraySeries)
                }
            })
            if (combinedArray.length !== 0)
                newArrayAllItems = [].concat(...combinedArray); // Используем спред-оператор для объединения

            combinedArray = []
            arrayFilters.forEach(function (filter) {
                if (filter.value.itemName === 'brand') {
                    let newArraySeries = updateDataWithUsingTypeOfFilterOnText(newArrayAllItems, filter.value.itemName, filter.value.value);
                    combinedArray.push(newArraySeries)
                }
            })
            if (combinedArray.length !== 0)
                newArrayAllItems = [].concat(...combinedArray); // Используем спред-оператор для объединения

            combinedArray = []
            arrayFilters.forEach(function (filter) {
                if (filter.value.itemName === 'factoryname') {
                    let newArraySeries = updateDataWithUsingTypeOfFilterOnText(newArrayAllItems, filter.value.itemName, filter.value.value);
                    combinedArray.push(newArraySeries)
                }
            })
            if (combinedArray.length !== 0)
                newArrayAllItems = [].concat(...combinedArray); // Используем спред-оператор для объединения

            combinedArray = []
            arrayFilters.forEach(function (filter) {
                if (filter.value.itemName === 'typeofaccessory') {
                    let newArraySeries = updateDataWithUsingTypeOfFilterOnText(newArrayAllItems, filter.value.itemName, filter.value.value);
                    combinedArray.push(newArraySeries)
                }
            })
            if (combinedArray.length !== 0)
                newArrayAllItems = [].concat(...combinedArray); // Используем спред-оператор для объединения

            allItemsCurrent = newArrayAllItems;

        }

        arrayFilters.forEach(function (filter) {
            if (filter.value.type === 'rangemin') {

                newArrayAllItems = updateDataWithUsingTypeOfFilterOnRange(newArrayAllItems, filter.value.itemName, filter.value.value, 'min');
            }
        })

        arrayFilters.forEach(function (filter) {
            if (filter.value.type === 'rangemax') {
                newArrayAllItems = updateDataWithUsingTypeOfFilterOnRange(newArrayAllItems, filter.value.itemName, filter.value.value, 'max');
            }
        })

        allItemsCurrent = newArrayAllItems;

        // обновление ранджей в зависимости от типа
        arrayFilters.forEach(function (filter) {
            if (filter.value.itemName === 'type') {
                switch (filter.value.itemName) {
                    case 'cigarillo':
                    case 'coffee':
                    case 'accessory':
                        updateRangeMinMax(getMinOrMaxByTypeRangeCurrentArray('price', 'min'), getMinOrMaxByTypeRangeCurrentArray('price', 'max'), 'price');
                        break;

                    case 'cigar':
                        updateRangeMinMax(getMinOrMaxByTypeRangeCurrentArray('price', 'min'), getMinOrMaxByTypeRangeCurrentArray('price', 'max'), 'price');
                        updateRangeMinMax(getMinOrMaxByTypeRangeCurrentArray('ringGauge', 'min'), getMinOrMaxByTypeRangeCurrentArray('ringGauge', 'max'), 'ringGauge');
                        updateRangeMinMax(getMinOrMaxByTypeRangeCurrentArray('size', 'min'), getMinOrMaxByTypeRangeCurrentArray('size', 'max'), 'size');
                        updateRangeMinMax(getMinOrMaxByTypeRangeCurrentArray('fortress', 'min'), getMinOrMaxByTypeRangeCurrentArray('fortress', 'max'), 'fortress');
                        break;
                }
                return;
            }
        })

        updateURL()
    }


    allItemsCurrent = newArrayAllItems; // после фильтрации обновляем текущий массив
    sortingItems(allItemsCurrent, currentTypeSorting); // сортируем его и обновляем на странице
}


// фильтр по чекбоксам (тексту)
function updateDataWithUsingTypeOfFilterOnText(currentArray, nameFilter, filter) {
    return currentArray.filter(function (item) {  // берем каждый элемент и проверяем по фильтрам
        if (nameFilter === 'typeofaccessory') nameFilter = 'typeOfAccessory'
        if (nameFilter === 'factoryname') nameFilter = 'factoryName'


        let itemValue = item[nameFilter].toLowerCase(); // кидаем в отдельную переменную текст по которому идет фильтрация
        return itemValue === filter; // проверяем
    });
}

// фильтр по диапазону от до (значение)

function updateDataWithUsingTypeOfFilterOnRange(currentArray, nameFilter, filter, minOrMax) {

    return currentArray.filter(function (item) { // берем каждый элемент и проверяем по фильтрам
        if (nameFilter === 'ringgauge') nameFilter = 'ringGauge'
        const itemValue = item[nameFilter];// кидаем в отдельную переменную значение по которому идет фильтрация
        return (minOrMax === 'min' && itemValue >= filter) || (minOrMax === 'max' && itemValue <= filter); // проверяем, с учетом , что есть макс и мин значения
    });
}

function getOriginalArray(type, category, arrayItems) {
    let array = []

    arrayItems.forEach(function (item) {
        if (item[type] === 'cigar' && item[category]) {
        }
        let itemValue = item[category].toLowerCase(); // кидаем в отдельную переменную имя чекбокса
        array.push(itemValue)
    })
    return array;
}


function updateURL() {
    let hashString = arrayFilters.map(function (item) {
        // Создаем строку для каждой записи
        let values = Object.values(item.value).join('=');
        return item.key + '?' + values.replace(/\s/g, "_").toLowerCase();
        ;
    }).join('&');

    // Теперь у вас есть строка, которую вы можете вставить в хэш адресной строки
    window.location.hash = hashString;

}

// открытие и закрытие мобильных фильтров
$('#closeMobileFilters').click(function () {
    let mobileFilters = $('.border-right-black');
    mobileFilters.css({
        'z-index': -10,
        'opacity': 0
    })
})
$('#openMobileFilters').click(function () {
    let mobileFilters = $('.border-right-black');
    mobileFilters.css({
        'z-index': 6,
        'opacity': 1
    })
})


// при изменении рендже, обновляется цифра на ренджем мин или макс
function updateText(el) {
    let [from, to] = $(`#${el}`)[0].noUiSlider.get();
    $(`#${el}-from`).text(parseInt(from));
    $(`#${el}-to`).text(parseInt(to));
}

// при изменении рендже, обновляется цифра в навигационных фильтра
function updateNavFilter(el, values) {
    let value0 = parseInt(values[0])
    let value1 = parseInt(values[1])
    let idFrom = el.id + '-from-filter'
    let idTo = el.id + '-to-filter'

    if (el.originalRangeMinMax[0] !== value0) {
        if ($(`#${idFrom}`).length) {
            $(`#${idFrom}`).find('.ff-lato').text(value0);
        } else {
            let htmlToAppend = `
                <div id="${idFrom}" class="d-flex justify-content-between align-items-center me-5 underline-one filter-remove" data-option="${el.type}" data-name="from">
                  <div class="text-nowrap me-1">${el.textMin}</div>
                  <div class="text-nowrap ff-lato">${value0}</div>
                  <button class="pe-0"><img src="/img/cross_black.svg" alt="cross_black"></button>
                </div>
              `;
            $('.filters').append(htmlToAppend);
        }
        addOrUpdateFilters(typeOfFilter.RANGEMIN, el.type, value0, idFrom)
    } else {
        if ($(`#${idFrom}`).length) {
            $(`#${idFrom}`).remove();
            deleteFilters(idFrom)
        }
    }
    if (el.originalRangeMinMax[1] !== value1) {
        if ($(`#${idTo}`).length) {
            $(`#${idTo}`).find('.ff-lato').text(value1);
        } else {
            let htmlToAppend = `
                <div id="${idTo}" class="d-flex justify-content-between align-items-center me-5 underline-one filter-remove" data-option="${el.type}" data-name="to">
                  <div class="text-nowrap me-1">${el.textMax}</div>
                  <div class="text-nowrap ff-lato">${value1}</div>
                  <button class="pe-0"><img src="/img/cross_black.svg" alt="cross_black"></button>
                </div>
              `;
            $('.filters').append(htmlToAppend);
        }
        addOrUpdateFilters(typeOfFilter.RANGEMAX, el.type, value1, idTo)
    } else {
        if ($(`#${idTo}`).length) {
            $(`#${idTo}`).remove();
            deleteFilters(idTo)

        }
    }
}

//функция меняет сам ползунок ренджа , выставляя новые мин и макс
function updateRangeMinMax(minOriginal, maxOriginal, typeRange) {
    let currentSlider;

    sliders.forEach(function (slider) {
        if (slider.type === typeRange) {
            currentSlider = slider;
            return
        }
    });

    let element = $(`#range-${currentSlider.type}`)
    currentSlider.originalRangeMinMax = [minOriginal, maxOriginal]
    currentSlider.rangeMinMax = [minOriginal, maxOriginal]
    element[0].noUiSlider.updateOptions({
        start: [minOriginal, maxOriginal]
        , range: {
            min: minOriginal
            , max: maxOriginal
        }
    });
    updateText('range-price')
}

// функция просматривает все элементы в текущем массиве и нахидит минимальное или максимальное значение определенных типов реджей
function getMinOrMaxByTypeRangeCurrentArray(type, minOrMax) {
    if (typeof allItemsCurrent === 'object') {

        let numbers = [];

        allItemsCurrent.forEach(function (item) {
            numbers.push(item[type])
        })
        numbers.sort(function (a, b) {
            if (minOrMax === 'min') return a - b;
            else return b - a;
        });
        return numbers[0]
    }
}

// функция просматривает все элементы в оригинальном массиве с определенным типом и находит минимальное или максимальное значение определенных типов реджей
function getMinOrMaxByTypeRangeOriginalArray(currentType, category, minOrMax) {
    if (typeof allItemsCurrent === 'object') {

        let numbers = [];

        allItemsOriginal.forEach(function (item) {

            if (currentType === item['type'].toLowerCase()) {
                numbers.push(item[category])
            }

        })
        numbers.sort(function (a, b) {
            if (minOrMax === 'min') return a - b;
            else return b - a;
        });

        return numbers[0]
    }
}

//создание ренджей
function createSlider(slider) {
    let [from, to] = [
        slider.originalRangeMinMax[0]
        , slider.originalRangeMinMax[1]
    ];
    let rangeSlider = $(`#${slider.id}`);
    noUiSlider.create(rangeSlider[0], {
        start: [from, to]
        , connect: true
        , range: {
            min: from
            , max: to
        }
    });
}

//создание карточки товара
function createItem(container, item) {
    let itemDiv = document.createElement('div');
    itemDiv.classList.add('col-md-4', 'col-6', 'mt-sm-5', 'mt-3', 'mb-3', 'mb-sm-5', 'catalog__card');
    itemDiv.setAttribute("data-id", item.id);
    itemDiv.setAttribute("data-type", item.type);
    itemDiv.setAttribute("data-name", item.name);
    itemDiv.setAttribute("data-series", item.series);
    itemDiv.setAttribute("data-brand", item.brand);
    itemDiv.setAttribute("data-factoryname", item.factoryName);
    itemDiv.setAttribute("data-typesofaccessory", item.typeOfAccessory);
    itemDiv.setAttribute("data-price", item.price);
    itemDiv.setAttribute("data-size", item.size);
    itemDiv.setAttribute("data-fortress", item.fortress);
    itemDiv.setAttribute("data-ringgauge", item.ringGauge);
    itemDiv.setAttribute("data-option", JSON.stringify(item.option))


    let option = item.option
    let optionLink = ''
    if (Object.keys(item.option).length > 1) {
        option = 'more'
        optionLink = 'data-bs-toggle="modal" data-bs-target="#modal"'
    } else option = Object.keys(option)[0]; // Получаем первый (единственный) ключ объекта
    // else option = Object.keys(item.option[0])[0]; // Получаем первый (единственный) ключ объекта


    // я закончил на том, что если опция МОРЕ то выскакиет плашка с выбором опции (если элемент с одной опцией, то нихуя не происходит)
    itemDiv.innerHTML = `
            <a href="item/${item.id}" class="catalog__card_img_div">
                <img class="catalog__card_img" src="${item.photo}" alt="catalog__img_card_1">
            </a>
            <div class="catalog__card_padding_text">
                <div class="mt-2 catalog__card_name h5">
                    <a href="item/${item.id}">${item.brand} ${item.name}</a>
                </div>
                <div class="border-top-black"></div>
                <div class="h5 pe-1 text-uppercase d-flex justify-content-between">
                    <div class="ff-lato">${item.price} r.</div>
                    <div class="d-flex justify-content-between">
                        <div class="box_count" id="box_count_${item.id}" style="display: none">
                            <a class="box_img_minus" onclick="minusItemInBasketFromCatalog(${item.id})">
                                <svg class="plus_minus_basket" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.53516 15.1045H24.4629C24.9633 15.1045 25.3691 14.6987 25.3691 14.1982C25.3691 13.6978 24.9633 13.292 24.4629 13.292H4.53516C4.03464 13.292 3.62891 13.6978 3.62891 14.1982C3.62891 14.6987 4.03464 15.1045 4.53516 15.1045Z" fill="#817878"/>
                                </svg>
                            </a>
                            <div class="ff-lato">(<span id="count_${item.id}">0</span>)</div>
                        </div> 
                        <a class="underline-one d-flex align-items-center" onclick="addItemInBasket(${item.id}, '${option}')" ${optionLink}>Into a basket</a></div>
                </div>
            </div>
        `;
    container.append(itemDiv);

}

//функция следит за изменением в div class = "filters" чтобы при удалении/добавлении элементов можно было осуществлять логику
$(document).ready(function () {
    // Выбираем элемент, за которым будем следить
    const target = $('.filters')[0];
    // Конфигурация наблюдателя (следим за добавлением и удалением элементов)
    const config = {
        childList: true
    };
    // Функция обратного вызова, которая будет вызываться при изменениях в .filters
    const callback = function (mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                hiddenBTNResetFilters()
            }
        }
    };
    // Создаем экземпляр Mutation Observer
    const observer = new MutationObserver(callback);
    // Начинаем отслеживать изменения в .filters с заданной конфигурацией
    observer.observe(target, config);
    hiddenBTNResetFilters()
});

// скрытие кнопки "сбросить фильтры" , если нет ни одного фильтра и появление если есть
function hiddenBTNResetFilters() {
    let $filters = $('.filters');
    let $resetFilters = $('#resetFilters');
    let countChildren = $filters.children().length;
    let countChildrenWithIdAllType = $filters.children('#allType');
    if (countChildren == 1 && countChildrenWithIdAllType.length > 0) {
        $resetFilters.css('opacity', 0)
        $('#countFilters').empty();
    } else {
        $resetFilters.css('opacity', 1)
        $('#countFilters').empty();
        $('#countFilters').append('(' + countChildren + ')');
    }

}



//добавить товары в корзину
function addItemInBasket(idItem, optionItem) {

    if (optionItem === 'more') {
        openModal(idItem, optionItem)

    } else {


        if (localStorage.getItem("basket") !== null) {

            let jsonBasket = localStorage.getItem("basket");

            // Преобразование JSON-строки в массив пар ключ-значение and Восстановление Map из массива
            let myArrayRestored = JSON.parse(jsonBasket);

            myArrayRestored.push({
                id: idItem,
                option: optionItem
            })

            jsonBasket = JSON.stringify(myArrayRestored);

            localStorage.setItem("basket", jsonBasket);

        } else {

            let myArrayRestored = []

            myArrayRestored.push({
                id: idItem,
                option: optionItem
            })

            // Преобразование Map в JSON-строку и сохранение в LocalStorage
            let jsonBasket = JSON.stringify(myArrayRestored);


            localStorage.setItem("basket", jsonBasket);
        }

        updateBasket()
    }

}

function minusItemInBasketFromCatalog(idItem) {

    let jsonBasket = localStorage.getItem("basket");

    // Преобразование JSON-строки в массив пар ключ-значение and Восстановление Map из массива
    let basket = JSON.parse(jsonBasket);

    let numberDeleteItem = -1;

    for (let i = 0; i < basket.length; i++) {

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

// в этом методе прописать, чтобы в модале обновлялись данные по выбору опции и добавлялось в корзину
function openModal(idItem, optionItem) {

    $('#selectOptionItem').children().remove()
    $('#addItemInBasketLinkModal').attr('onclick', `addItemInBasket(${idItem}, getValueFromRadio())`);

    let item = window.globalAllItemsOriginalMap.get(idItem)

    // Предположим, что item.option - это массив объектов
    $.each(item.option, function (index, option) {

        // Получаем ключ и значение из объекта option
        const key = index;
        const value = option[key];

        // Создаем радиокнопку и метку с помощью jQuery
        const $label = $(`<label class="radio-main mt-2"></label>`);
        const $text = $(`<span class="underline-one"></span>`);
        const $input = $(`<input type="radio">`);
        const $div = $(`<div class="radio-main-checkmark me-xxl-4 me-2">
                            <div></div>
                        </div>`);

        // Устанавливаем атрибуты для радиокнопки
        $input.attr("name", `radio-select-option-item`);
        $input.val(key); // Используем ключ в качестве значения радиокнопки

        $text.text(key);

        // Добавляем радиокнопку в метку и метку в контейнер
        $label.append($input);
        $label.append($div);
        $label.append($text);
        // Добавляем текстовое содержание метки
        $(`#selectOptionItem`).append($label);
    });
    addOrRemoveClassDisableLink()
}

function getValueFromRadio() {
    return  $(`input[type="radio"][name="radio-select-option-item"]:checked`).val();
}

$('.modal-select-option-item').on('change', `input[name="radio-select-option-item"]`, addOrRemoveClassDisableLink);

function addOrRemoveClassDisableLink() {
    if ($(`.modal-select-option-item input[name="radio-select-option-item"]:checked`).length === 0) {

        if (!($('#addItemInBasketLinkModal').hasClass('disable-link')))
            $('#addItemInBasketLinkModal').addClass('disable-link');
    } else {
        $('#addItemInBasketLinkModal').removeClass('disable-link');
    }
}