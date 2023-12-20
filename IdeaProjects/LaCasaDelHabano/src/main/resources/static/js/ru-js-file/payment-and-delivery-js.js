


$(window).on('load resize', function () {
    let screenSize = document.documentElement.clientWidth
    if (screenSize < 460) $('.payment_and_delivery__foreground_picture').css('max-width', screenSize)
});

if (document.documentElement.clientWidth < 460) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo('.payment_and_delivery__foreground_picture', {
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
    gsap.fromTo('.payment_and_delivery__foreground_picture', {
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
