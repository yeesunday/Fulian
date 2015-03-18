//全局变量
BOOKID = 1; //正在阅读的书籍 ID
$FILPBOOK = $('.flipbook'); //翻书插件绑定对象



$('#mPreface').html(i18n[LANG].prefaceTitle);
$('#mCatalog').html(i18n[LANG].catalogTitle);
$('#mBook').html(i18n[LANG].bookTitle);

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

function initView () {
    $('.panel').hide();
    $('#photoWallPanel').show();
}