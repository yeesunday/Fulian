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
    $("#tbn").hide();
    $("#Index_Box").hide();
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
    if (Modernizr.csstransforms) {
        var sources = [
            'thumbnails/1.jpg',
            'thumbnails/2.jpg',
            'thumbnails/3.jpg',
            'thumbnails/4.jpg',
            'thumbnails/5.jpg',
            'thumbnails/6.jpg',
            'thumbnails/7.jpg',
            'thumbnails/8.jpg',
            'thumbnails/9.jpg',
            'thumbnails/10.jpg',
            'thumbnails/11.jpg',
            'thumbnails/12.jpg',
            'thumbnails/13.jpg',
            'thumbnails/14.jpg',
            'thumbnails/15.jpg',
            'thumbnails/16.jpg',
            'thumbnails/17.jpg',
            'thumbnails/18.jpg',
            'thumbnails/19.jpg',
            'thumbnails/20.jpg',
            'thumbnails/21.jpg',
            'thumbnails/22.jpg',
            'thumbnails/23.jpg',
            'thumbnails/24.jpg',
            'thumbnails/25.jpg',
            'thumbnails/26.jpg',
            'thumbnails/27.jpg',
            'thumbnails/28.jpg',
            'thumbnails/29.jpg',
            'thumbnails/30.jpg',
            'thumbnails/31.jpg'
        ]
        loadImg(sources, showPhotoWall);

        function loadImg(sources, callback) {
            var _imgList = [], _img = null;
            var loadedCount = 0;
            var totalCount = sources.length;
            for (var i = 0; i < totalCount; i++) {
                _img = sources[i];
                _imgList[i] = new Image();
                _imgList[i].src = _img;

                //当一张图片加载完成时执行
                _imgList[i].onload = function () {
                    //console.log(loadedCount);
                    //当所有图片加载完成时，执行回调函数callback
                    if (++loadedCount >= totalCount) {
                        callback && callback();
                    }
                };
            }
        }
    } else {
        showPhotoWall();
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