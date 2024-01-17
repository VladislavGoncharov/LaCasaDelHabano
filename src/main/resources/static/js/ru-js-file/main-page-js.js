$(document).ready(function () {
    let element = $('#img_text');
    element.addClass('rotating');
    //    $('.main__our_mug_div').css('height', $('#our_mug_img_1').height());
    $('#img_mousemove').css('height', $('#img_div').height());
    $('#img_mousemove').css('width', $('#img_div').width());
});
$(window).resize(function () {
    //    $('.main__our_mug_div').css('height', $('#our_mug_img_1').height());
    $('#img_mousemove').css('height', $('#img_div').height());
    $('#img_mousemove').css('width', $('#img_div').width());
});
////паралакс брендов от движения мыши
let scene = document.getElementById('container_for_img_brands');
let parallax = new Parallax(scene, {
    relativeInput: true
    , hoverOnly: true
    , inputElement: document.getElementById('container_for_img_brands')
    , calibrateX: false
    , calibrateY: false
    , scalarX: 5
    , scalarY: 5
    , frictionX: 0.1
    , frictionY: 0.1
});
// показать/скрыть инфу о других проектах
$('#button_information_show_o_cuba').click(function (event) {
    buttonInformationShow('o_cuba', event);
})
$('#button_information_show_cuba_day').click(function (event) {
    buttonInformationShow('cuba_day', event);
})

function buttonInformationShow(elName, event) {
    event.preventDefault()
    if ($(`#button_information_show_${elName}`).find($('.transform_up')).hasClass('transform_show')) {
        $(`#border_top_information_show_${elName} .transform_right_line`).toggleClass('transform_show'); //выдвигается линия
        $(`#border_top_information_show_${elName} .position-absolute`).toggleClass('transform_show'); // уходит текст под фото
        $(`#border_top_information_show_${elName} .col-3`).removeClass('overflow-hidden'); // уходит скрытие кодга при скроле я скрывал линию
        setTimeout(function () {
            $(`#button_information_show_${elName}`).find($('.transform_up')).toggleClass('transform_show'); // далее выходит текст
            $(`#button_information_show_${elName}`).find($('.transform_down')).toggleClass('transform_show');
            $(`#text_information_show_${elName} .transform_down`).toggleClass('transform_show');
            setTimeout(function () {
                $(`#border_top_information_show_${elName} .col-6`).toggleClass('ps-3'); //убираем падинг, чтобы линия была прямая
            }, 300)
        }, 500)
    }
    else {
        $(`#button_information_show_${elName}`).find($('.transform_up')).toggleClass('transform_show'); // далее уходит текст
        $(`#button_information_show_${elName}`).find($('.transform_down')).toggleClass('transform_show');
        $(`#text_information_show_${elName} .transform_down`).toggleClass('transform_show');
        setTimeout(function () {
            $(`#border_top_information_show_${elName} .transform_right_line`).toggleClass('transform_show'); // уходит линия
            $(`#border_top_information_show_${elName} .position-absolute`).toggleClass('transform_show'); // появляется текст под фото
            setTimeout(function () {
                $(`#border_top_information_show_${elName} .col-6`).toggleClass('ps-3'); //добавляем падинг, чтобы линия была прямая
            }, 300)
        }, 500)
    }
}
$('.our-mug__img-content--kuz').click(function () {

    let nameImg = $(this).data('img-name')

    $('#our_mug_img_1').attr('src', 'img/' + nameImg);
    $('.our-mug__img-content--kuz').each(function () {
        $(this).removeClass('our-mug__img-content--focused')
    })
    $(this).addClass('our-mug__img-content--focused')
})
$('.our-mug__img-content--petr').click(function () {

    let nameImg = $(this).data('img-name')

    $('#our_mug_img_2').attr('src', 'img/' + nameImg); // Исправление 1: использование .attr() вместо .src()
    $('.our-mug__img-content--petr').each(function () {
        $(this).removeClass('our-mug__img-content--focused');
    });
    $(this).addClass('our-mug__img-content--focused');
});
horizontalTransitionTo($('#little_img_1'))
horizontalTransitionFrom($('#little_img_2'))
verticalTransitionTo($('#selectors-images-on-kuz'))
$('#selectors-images-on-kuz').css('z-index', '0')
verticalTransitionFrom($('#selectors-images-on-petr'))
$('#selectors-images-on-petr').css('z-index', '1')
horizontalTransitionTo($('#our_mug_img_2'))
horizontalTransitionFrom($('#our_mug_img_1'))
$('.our_shop_on_kuznechnoye').each(function () {
    verticalTransitionTo($(this))
});
$('.our_shop_on_petrogradskaya').each(function () {
    verticalTransitionFrom($(this))
});
let onKuznechnoye = false
let enable = false

function nextMug() {
    if (enable) return
    enable = true;
    onKuznechnoye = !onKuznechnoye
    if (onKuznechnoye) {
        horizontalTransitionTo($('#little_img_2'))
        horizontalTransitionFrom($('#little_img_1'))
        verticalTransitionTo($('#selectors-images-on-petr'))
        $('#selectors-images-on-petr').css('z-index', '0')
        verticalTransitionFrom($('#selectors-images-on-kuz'))
        $('#selectors-images-on-kuz').css('z-index', '1')
        horizontalTransitionTo($('#our_mug_img_1'))
        horizontalTransitionFrom($('#our_mug_img_2'))
        $('.our_shop_on_petrogradskaya').each(function () {
            $(this).css('z-index', '0')
            verticalTransitionTo($(this))
        });
        $('.our_shop_on_kuznechnoye').each(function () {
            verticalTransitionFrom($(this))
            $(this).css('z-index', '1')
        });
    }
    else {
        horizontalTransitionTo($('#little_img_1'))
        horizontalTransitionFrom($('#little_img_2'))
        verticalTransitionTo($('#selectors-images-on-kuz'))
        $('#selectors-images-on-kuz').css('z-index', '0')
        verticalTransitionFrom($('#selectors-images-on-petr'))
        $('#selectors-images-on-petr').css('z-index', '1')
        horizontalTransitionTo($('#our_mug_img_2'))
        horizontalTransitionFrom($('#our_mug_img_1'))
        $('.our_shop_on_kuznechnoye').each(function () {
            verticalTransitionTo($(this))
            $(this).css('z-index', '0')
        });
        $('.our_shop_on_petrogradskaya').each(function () {
            verticalTransitionFrom($(this))
            $(this).css('z-index', '1')
        });
    }
    setTimeout(function () {
        enable = false;
    }, 3000)
}

function reserveBtnMainPage() {
    openPopUp('reserve',event);
    if (!onKuznechnoye) $(`input[type="radio"][name="reserve-mug"][value="kuznechny"]`).prop('checked', true);
    else $(`input[type="radio"][name="reserve-mug"][value="petrogradskaya"]`).prop('checked', true);
}

function horizontalTransitionTo(el) {
    gsap.fromTo(el, {
        x: 0
    }, {
        x: "-100%"
        , duration: 3
        , ease: 'power1.out'
    });
}

function horizontalTransitionFrom(el) {
    gsap.fromTo(el, {
        x: "100%"
    }, {
        x: 0
        , duration: 3
        , ease: 'power1.out'
    });
}

function verticalTransitionTo(el) {
    gsap.to(el, {
        y: 0
        , duration: 0
    });
}

function verticalTransitionFrom(el) {
    gsap.fromTo(el, {
        y: 0
    }, {
        y: "100%"
        , duration: 1
    });
}
//плавное увеличение и движение большой картинки под Наши магазины при скроле
let arrayEl = ['#our_mug_img_1', '#our_mug_img_2'];
let translateYGSAP = -350
let endGSAP = '-30% top'
let screenWidth = document.documentElement.clientWidth;
if (screenWidth < 978) {
    arrayEl = ['#our_mug_img_1', '#our_mug_img_2', '.main__our_mug_card_right_inner_div'];
    translateYGSAP = -300
    endGSAP = '-70% top'
}
gsap.registerPlugin(ScrollTrigger);

// Используем ScrollTrigger только на не-мобильных устройствах
if (screenWidth > 768) {
    gsap.from(arrayEl, {
        scrollTrigger: {
            trigger: '.main__our_mug_div',
            start: (window.innerHeight * (-1.2)) + 'px top',
            end: endGSAP,
            scrub: true,
            // markers: true
        },
        scale: 1.15,
        translateY: translateYGSAP
    });
}

let length = document.querySelectorAll(".layer").length;
let circles = document.querySelectorAll(".layer");
function mousePos(e) {
    return {
        x: e.pageX - $('#main__img_div').offset().left - 87
        , y: e.pageY - $('#main__img_div').offset().top - 62
    };
}




$(document).ready(function () {
    let video = document.getElementById('video-anim');
    // if (screenWidth > 768) {
    //     document.addEventListener('click', function () {
    //         // Воспроизводим видео при клике
    //         video.play();
    //     });
    // }

    video.addEventListener('canplay', function () {
        video.play();
    });

    video.load();
});