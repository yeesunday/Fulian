resize();
$(window).resize(resize);
function resize() {
    $('.wrapper').css('top',
        ($(window).height() - $('.wrapper').height()) / 2);
}

var LANG = getUrlParameter('lang') || 'zh'; //语言设置
function getUrlParameter (sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
    return null;
}