var LANG = getUrlParameter('lang') || 'zh'; //语言设置

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
    $('#' + panel).show().siblings().hide();
}

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