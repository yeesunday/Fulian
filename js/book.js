//$('#sample-viewer a').click(function() {
//    $(this).hide();
//    yepnope({
//        test : Modernizr.csstransforms,
//        load: ['samples/basic/js/basic.js', 'samples/basic/css/basic.css'],
//        nope: 'samples/basic/css/basic.html4.css?'+Math.round(Math.random()*100)
//    });
//});
function loadApp() {
    // Create the flipbook
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

// Load the HTML4 version if there's not CSS transform

//yepnope({
//    test : Modernizr.csstransforms,
//    yep: ['js/lib/turn.min.js'],
//    nope: ['js/lib/turn.html4.min.js', 'css/jquery.ui.html4.css', 'css/book-html4.css'],
//    both: ['css/jquery.ui.css', 'css/book.css'],
//    complete: loadApp
//});