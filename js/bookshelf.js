/**
 * name: bookshelf.js
 * intro: 处理书架事件
 * author: Rain yeesunday@gmail.com
 * date: 2015/03/17
 */

(function($) {
    var bookshelf,
        currentBook,
        lastBook = -1,
        status = {
            'unloaded' : 0,
            'loading' : 1,
            'loaded' : 2
        };

    bookshelf = {

        show: function() {
            if (Modernizr.csstransforms) {
                var thumbnail = $('.shelf .book[book="' + currentBook + '"]');
                var scaleFrom = thumbnail.height() / $('#book-zoom').height();
                $('#book-zoom').
                    removeClass('animate').
                    transform('scale(' + scaleFrom + ',' + scaleFrom + ')');
                $('.bookshelf').fadeOut(500);
                $('#book-zoom').show();
                $FILPBOOK.turn('page', 2);
                $('#book-zoom').
                    addClass('animate').
                    transform('scale(' + 1 + ',' + 1 + ')');
            } else {
                $('#book-zoom').show();
                $FILPBOOK.turn('page', 2);
            }
            $('.btn-book-close').show();
        },

        close: function() {
            if (Modernizr.csstransforms) {
                var thumbnail = $('.shelf .book[book="' + currentBook + '"]');
                var scaleFrom = thumbnail.height() / $('#book-zoom').height();
                $('.bookshelf').fadeIn(500);
                $('#book-zoom').
                    addClass('animate').
                    transform('scale(' + scaleFrom + ',' + scaleFrom + ')');
                $('#book-zoom').fadeOut(500);
                $FILPBOOK.turn('page', 1);
            } else {
                $FILPBOOK.turn('page', 1);
                $('#book-zoom').hide();
                $('.bookshelf').fadeIn(500);
            }
            $('.btn-book-close').hide();
            //if (Modernizr.csstransforms) {
            //
            //    thumbnail.removeClass('hover');
            //    $('.splash').removeClass('no-transition');
            //    $('.bookshelf').addClass('no-transition no-transform');
            //    $('.splash').removeClass('show-bar');
            //
            //    sample.flipbook.turn('page', 1);
            //
            //    var bookWidth = $('#book-zoom').width()/2,
            //        bookHeight = $('#book-zoom').height()/2,
            //        targetPosition = thumbnail.offset(),
            //        position = $('#book-zoom').offset(),
            //        scaleFrom = $('#book-zoom').height() / thumbnail.height(),
            //        posX = (-bookWidth + sample.flipbook.width()/4)*scaleFrom +  bookWidth + position.left,
            //        posY = -bookHeight*scaleFrom +  bookHeight + position.top,
            //        moveX = targetPosition.left - posX,
            //        moveY = targetPosition.top - posY;
            //
            //    $('.bookshelf').removeClass('no-transform');
            //
            //    setTimeout(function(){
            //        $('.bookshelf').removeClass('no-transition');
            //        $('.splash').removeClass('preview');
            //        $('#book-zoom').
            //            addClass('animate').
            //            transform('translate(' + moveX + 'px, ' + moveY + 'px) ' +
            //            'scale3d(' + scaleFrom + ',' + scaleFrom + ',1)');
            //    }, 0);
            //
            //    setTimeout(function(){
            //        if (!currentDemo) {
            //            $('.splash').removeClass('show-samples sample-'+smpl);
            //            thumbnail.css({visibility: 'visible'});
            //        }
            //    }, 1000);
            //
            //} else {
            //    $('.splash').removeClass('preview show-samples show-bar sample-'+smpl);
            //}

        },
        open: function (id) {
            currentBook = id;
            if (lastBook != -1) {
                if (lastBook != currentBook) {
                    $FILPBOOK.turn('destroy').remove();
                    $FILPBOOK = null;
                    $('#book-zoom').html('<div class="flipbook"></div>');
                    $FILPBOOK = $('.flipbook');
                    lastBook = currentBook;
                    BOOKID = currentBook;
                    $FILPBOOK.turn({
                        width: 920,
                        height: 582,
                        elevation: 50,
                        //acceleration: !isChrome(),
                        autoCenter: true,
                        gradients: true,
                        duration: 1000,
                        pages: 6,
                        when: {
                            missing: function (e, pages) {
                                for (var i = 0; i < pages.length; i++) {
                                    addPage(pages[i], $(this));
                                }

                            }
                        }

                    });
                    bookshelf.show();
                } else {
                    bookshelf.show();
                }
            } else {
                BOOKID = id;
                lastBook = currentBook = BOOKID;
                $FILPBOOK.turn({
                    width: 920,
                    height: 582,
                    elevation: 50,
                    //acceleration: !isChrome(),
                    autoCenter: true,
                    gradients: true,
                    duration: 1000,
                    pages: 6,
                    when: {
                        missing: function (e, pages) {
                            for (var i = 0; i < pages.length; i++) {
                                addPage(pages[i], $(this));
                            }

                        }
                    }

                });
                bookshelf.show();
            }
        }
    }

    /*
     * 通用方法
     * */
    function loadPage(page) {

        $.ajax({url: 'src/' + LANG + '/books/' + BOOKID + '/' + page + '.html'}).
            done(function(pageHtml) {
                $('.flipbook .p' + page).html(pageHtml.replace('samples/steve-jobs/', ''));
            });
    }

    function addPage(page, book) {

        var id, pages = book.turn('pages');

        if (!book.turn('hasPage', page)) {

            var element = $('<div />',
                {'class': 'own-size',
                    css: {width: 460, height: 582}
                }).
                html('<div class="loader"></div>');

            if (book.turn('addPage', element, page)) {
                loadPage(page);
            }

        }
    }

    //打开一本书
    $('.book').click(function(e){
        var id = $(e.target).attr('book');
        bookshelf.open(id);
    });
    $('.btn-book-close').click(function () {
        bookshelf.close();
    });
})(jQuery);

function clickElement(element, func) {
    if ($.isTouch) {
        element.bind($.mouseEvents.up, func);
    } else {
        element.click(func);
    }
}

function isIE() {
    return navigator.userAgent.indexOf('MSIE')!=-1;
}

// Why this?  Chrome has the fault:
// http://code.google.com/p/chromium/issues/detail?id=128488
function isChrome() {
    return navigator.userAgent.indexOf('Chrome')!=-1;
}


function numberOfViews(book) {
    return book.turn('pages') / 2 + 1;
}

function getViewNumber(book, page) {
    return parseInt((page || book.turn('page'))/2 + 1, 10);
}

yepnope({
    test : Modernizr.csstransforms,
    yep: ['js/lib/turn.min.js'],
    nope: ['js/lib/turn.html4.min.js', 'css/jquery.ui.html4.css', 'css/book-html4.css'],
    both: ['css/jquery.ui.css', 'css/book.css']
});