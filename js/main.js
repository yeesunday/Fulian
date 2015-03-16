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