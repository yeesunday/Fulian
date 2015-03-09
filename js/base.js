$(function () {
    resize();
    $(window).resize(resize);
    function resize() {
        $('.content').css('top',
            ($('.wrapper').height() - $('.header').height() - $('.footer').height() - $('.content').height()) / 2);
    }

    $('.cycle').cyclotron();
    $('#mPreface').click(function () {
        showPanel('prefacePanel');
    });
    $('#mCatalog').click(function () {
        showPanel('boardPanel');
    });
    $('#mBook').click(function () {
        showPanel('bookPanel');
    });

    function showPanel (panel) {
        console.log(222);
        $('#' + panel).show().siblings().hide();
    }
})