

$('#link-on-kuznechny-or-petrogradskoy').on('mouseenter', function () {
    let cursor = $('.custom-cursor')
    gsap.to(cursor, {
        scaleX: 0
        , scaleY: 0
        , duration: 0.2 // 0.5 секунды для плавного уменьшения
    });
    setTimeout(function () {
        cursor.css('background-image', 'none')
        cursor.append('<div id="reserve-cursor"><div class="round-button round-button-big d-flex justify-content-center align-items-center">Резерв</div></div>');
        gsap.to(cursor, {
            scaleX: 1
            , scaleY: 1
            , duration: 0.2 // 0.5 секунды для плавного уменьшения
        });
    }, 200)
});
$('#link-on-kuznechny-or-petrogradskoy').on('mouseleave', function () {
    let cursor = $('.custom-cursor')
    gsap.to(cursor, {
        scaleX: 0
        , scaleY: 0
        , duration: 0.2 // 0.5 секунды для плавного уменьшения
    });
    setTimeout(function () {
        $('#reserve-cursor').remove();
        cursor.css('background-image', `url('/img/custom_cursor.png')`)
        gsap.to(cursor, {
            scaleX: 1
            , scaleY: 1
            , duration: 0.2 // 0.5 секунды для плавного уменьшения
        });
    }, 200)
})
$('.link-on-kuznechny').prev('.position-relative').add('.link-on-kuznechny').hover(function () {
    $('.link-on-kuznechny-img').css('opacity', 1);
    $('.link-on-kuznechny-text').css('opacity', 0.2);
}, function () {
    $('.link-on-kuznechny-img').css('opacity', 0);
    $('.link-on-kuznechny-text').css('opacity', 1);
});
$('.link-on-petrogradskoy').prev('.position-relative').add('.link-on-petrogradskoy').hover(function () {
    $('.link-on-petrogradskoy-img').css('opacity', 1);
    $('.link-on-petrogradskoy-text').css('opacity', 0.2);
}, function () {
    $('.link-on-petrogradskoy-img').css('opacity', 0);
    $('.link-on-petrogradskoy-text').css('opacity', 1);
});

$(window).on('load resize', function () {
    let screenSize = document.documentElement.clientWidth
    if (screenSize < 460) $('.about_us__foreground_picture').css('max-width', screenSize)
});

if (document.documentElement.clientWidth < 460) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo('.about_us__foreground_picture', {
        scrollTrigger: {
            trigger: '.bg_transparent'
            , start: (window.innerHeight * (-1)) + 'px top'
            , scrub: true
            , }
        , translateY: -150
    }, {
        scrollTrigger: {
            trigger: '.bg_transparent'
            , start: (window.innerHeight * (-1.1)) + 'px top'
            , scrub: true
            , }
        , translateY: 100
    })
}
else {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo('.about_us__foreground_picture', {
        scrollTrigger: {
            trigger: '.bg_transparent'
            , start: (window.innerHeight * (-1.2)) + 'px top'
            , scrub: true
            , }
        , translateY: -350
    }, {
        scrollTrigger: {
            trigger: '.bg_transparent'
            , start: (window.innerHeight * (-1.2)) + 'px top'
            , scrub: true
            , }
        , translateY: 100
    })
}
function reserveBtnAboutUsPage(mug) {
    openPopUp('reserve',event);
    if (mug === 'kuznechny') $(`input[type="radio"][name="reserve-mug"][value="kuznechny"]`).prop('checked', true);
    else $(`input[type="radio"][name="reserve-mug"][value="petrogradskaya"]`).prop('checked', true);
}