//全局变量
BOOKID = 1; //正在阅读的书籍 ID
$FILPBOOK = $('.flipbook'); //翻书插件绑定对象


var wh = window.innerHeight;
$('.loading-page img').css('margin-top', (wh - 397) / 2);

$('#mPreface').html(i18n[LANG].prefaceTitle);
$('#mCatalog').html(i18n[LANG].catalogTitle);
$('#mBook').html(i18n[LANG].bookTitle);

$('#mPreface').click(function () {
    showPanel('prefacePanel');
});
$('#mCatalog').click(function () {
    showPanel('boardPanel');
    $(".zpmenu").show().width(0).animate({
        width:958
        },500,function(){
    });
});
$('#mBook').click(function () {
    showPanel('bookPanel');
});

function showPanel (panel) {
    $('#' + panel).show().siblings().hide();
}

function initView () {
    var sources = [
        'thumbnails/euro2008_001.jpg',
        'thumbnails/euro2008_002.jpg',
        'thumbnails/euro2008_003.jpg',
        'thumbnails/euro2008_004.jpg',
        'thumbnails/euro2008_005.jpg',
        'thumbnails/euro2008_006.jpg',
        'thumbnails/euro2008_007.jpg',
        'thumbnails/euro2008_008.jpg',
        'thumbnails/euro2008_009.jpg',
        'thumbnails/euro2008_010.jpg',
        'thumbnails/euro2008_011.jpg',
        'thumbnails/euro2008_012.jpg',
        'thumbnails/euro2008_013.jpg',
        'thumbnails/euro2008_014.jpg',
        'thumbnails/euro2008_015.jpg',
        'thumbnails/euro2008_016.jpg',
        'thumbnails/euro2008_017.jpg'
    ]
    loadImg(sources, showPhotoWall);

    function loadImg(sources,callback){
        var _imgList = [], _img = null;
        var loadedCount = 0;
        var totalCount = sources.length;
        for (var i = 0; i < totalCount; i++) {
            _img = sources[i];
            _imgList[i] = new Image();
            _imgList[i].src = _img;

            //当一张图片加载完成时执行
            _imgList[i].onload = function(){
                //当所有图片加载完成时，执行回调函数callback
                if (++loadedCount >= totalCount) {
                    callback && callback();
                }
            };
        }
    }
    function showPhotoWall() {
        $('.panel').hide();
        $('#photoWallPanel').show();
        $('.loading-page').hide();
    }
}
//$(function(){
//   initView();
//});