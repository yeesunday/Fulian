function loadApp() {
    // Create the flipbook
    $('.flipbook').turn({
        width:922,
        height:600,
        elevation: 50,
        //acceleration: !isChrome(),
        autoCenter: true,
        gradients: true,
        duration: 1000,
        pages: 6,
        when: {
            turning: function(e, page, view) {

                var book = $(this),
                    currentPage = book.turn('page'),
                    pages = book.turn('pages');

                if (currentPage>3 && currentPage<pages-3) {

                    if (page==1) {
                        book.turn('page', 2).turn('stop').turn('page', page);
                        e.preventDefault();
                        return;
                    } else if (page==pages) {
                        book.turn('page', pages-1).turn('stop').turn('page', page);
                        e.preventDefault();
                        return;
                    }
                } else if (page>3 && page<pages-3) {
                    if (currentPage==1) {
                        book.turn('page', 2).turn('stop').turn('page', page);
                        e.preventDefault();
                        return;
                    } else if (currentPage==pages) {
                        book.turn('page', pages-1).turn('stop').turn('page', page);
                        e.preventDefault();
                        return;
                    }
                }

                //updateDepth(book, page);

                if (page>=2)
                    $('.flipbook .p2').addClass('fixed');
                else
                    $('.flipbook .p2').removeClass('fixed');

                if (page<book.turn('pages'))
                    $('.flipbook .p111').addClass('fixed');
                else
                    $('.flipbook .p111').removeClass('fixed');

                //Hash.go('page/'+page).update();

            },

            turned: function(e, page, view) {

                var book = $(this);

                if (page==2 || page==3) {
                    book.turn('peel', 'br');
                }

                //updateDepth(book);

                //$('#slider').slider('value', getViewNumber(book, page));

                book.turn('center');

            },
            missing: function (e, pages) {
                console.log(0);
                for (var i = 0; i < pages.length; i++) {
                    addPage(pages[i], $(this));
                }

            }
        }

    });


    initView();
}
/*
 * 通用方法
 * */
BOOKID = 1;
function loadPage(page) {

    $.ajax({url: 'src/' + LANG + '/books/' + BOOKID + '/' + page + '.html'}).
        done(function(pageHtml) {
            console.log(pageHtml);
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

// Load the HTML4 version if there's not CSS transform

yepnope({
    test : Modernizr.csstransforms,
    yep: ['js/lib/turn.min.js'],
    nope: ['js/lib/turn.html4.min.js', 'css/jquery.ui.html4.css', 'css/book-html4.css'],
    both: ['css/jquery.ui.css', 'css/book.css'],
    complete: loadApp
});