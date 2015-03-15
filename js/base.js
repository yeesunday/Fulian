resize();
$(window).resize(resize);
function resize() {
    $('.wrapper').css('top',
        (window.innerHeight - $('.wrapper').height()) / 2);
}
