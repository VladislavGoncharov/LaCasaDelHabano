$(document).ready(function () {
    window.autoHeightCenterColumn()
})
$(window).resize(function () {
    window.autoHeightCenterColumn()
});
// настройка высоты центральной колонки 
window.autoHeightCenterColumn = function () {
    setTimeout(function () {
        $('.central-column').css('height', $('#containerForItems').height())
        $('.height-along-central-column').css('height', $('#containerForItems').height())

    }, 20)
}

// открывается описание этапов работы
function openFilter(number) {
    $(`#filters_${number}`).slideToggle();
    $(`#jackdaw_${number}`).toggleClass('rotate-180');
}

$('.checkbox-type-filter input').on('change', function () {
    $('.checkbox-type-filter').removeClass('checkbox-type-filter-checked');

    if ($(this).prop('checked')) {
        $(this).parent().addClass('checkbox-type-filter-checked');
        $('.checkbox-type-filter input').not(this).prop('checked', false);
    }
});

//стили
//функция горизонтального скрола
$('#nav-filter').on('mousewheel', function (event) {
    event.preventDefault();

    const scrollAmount = event.deltaY * 50;
    const $filters = $('.filters');
    const scrollLeft = $filters.scrollLeft();
    const targetScrollLeft = scrollLeft - scrollAmount;

    gsap.to($filters, {
        scrollLeft: targetScrollLeft,
        duration: 0.4, // Длительность анимации в секундах (настройте по вашему усмотрению)
        ease: 'power2.out' // Вид временной функции для плавности анимации (настройте по вашему усмотрению)
    });
});

function updateHeightFiltersMain() {
    const $filtersMain = $('.filters-main');
    const $navFilter = $('#nav-filter');
    const $footer = $('footer');

    const bottomOfViewport = $(window).height() + $(window).scrollTop();
    const visibleHeight = Math.min((bottomOfViewport - 10), $footer.offset().top) - $navFilter.offset().top;
    $filtersMain.height(visibleHeight);
}

// Вызываем функцию обновления высоты при загрузке страницы и при изменении размера окна
$(window).on('load resize scroll', function () {
    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (screenWidth < 978) {
        $('.filters-main').height(window.innerHeight)
    } else {
        updateHeightFiltersMain();
    }
});

//попап сортировки
$('.select').each(function () {
    const _this = $(this),
        selectOption = _this.find('option'),
        selectOptionLength = selectOption.length,
        selectedOption = selectOption.filter(':selected'),
        duration = 450; // длительность анимации

    _this.hide();
    _this.wrap('<div class="select"></div>');
    $('<div>', {
        class: 'new-select',
        text: _this.children('option:disabled').text()
    }).insertAfter(_this);

    const selectHead = _this.next('.new-select');
    $('<div>', {
        class: 'new-select__list'
    }).insertAfter(selectHead);

    const selectList = selectHead.next('.new-select__list');
    for (let i = 0; i < selectOptionLength; i++) {
        $('<div>', {
            class: 'new-select__item',
            html: $('<span>', {
                text: selectOption.eq(i).text()
            })
        })
            .attr('data-value', selectOption.eq(i).val())
            .appendTo(selectList);
    }

    const selectItem = selectList.find('.new-select__item');
    selectList.slideUp(0);
    selectHead.on('click', function () {
        if (!$(this).hasClass('on')) {
            $(this).addClass('on');
            selectList.slideDown(duration);

            selectItem.on('click', function () {
                let chooseItem = $(this).data('value');

                $('select').val(chooseItem).attr('selected', 'selected');
                selectHead.text($(this).find('span').text());

                selectList.slideUp(duration);
                selectHead.removeClass('on');
            });

        } else {
            $(this).removeClass('on');
            selectList.slideUp(duration);
        }
    });
});

window.autoWidhtImgInCardItems = function () {
    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    let cardImg = $('.catalog__card_img_div')
    cardImg.css('width', 'initial')

    if (screenWidth > 2000) {
        cardImg.css('height', '450px')
    } else {
        cardImg.css('height', cardImg.css('width'))
    }
}

$(document).ready(function () {
    window.autoWidthImgInCardItems()
})
$(window).resize(function () {

    window.autoWidthImgInCardItems()
});

$('#pagination-footer').on('click', '.paginationjs-page a', function () {
    console.log("scroll to catalog")
    // gsap.to(window, { duration: 2, scrollTo: 400 });

})
