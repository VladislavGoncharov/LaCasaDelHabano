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


