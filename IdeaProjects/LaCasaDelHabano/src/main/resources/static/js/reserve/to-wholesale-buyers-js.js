
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
