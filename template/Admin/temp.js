const $body = $("body"),
const $wrapper = $("#wrapper"),
const $btnFullScreen = $("#btn-fullscreen"),
const $leftMenuButton = $('.button-menu-mobile'),
const $menuItem = $('.has_sub > a')



//scroll
$('.slimscrollleft').slimscroll({
    height: 'auto',
    position: 'right',
    size: "10px",
    color: '#9ea5ab'
});

$leftMenuButton.on('click', function (event) {
    event.preventDefault();
    $this.$body.toggleClass("fixed-left-void");
    $this.$wrapper.toggleClass("enlarged");
});

$('[data-toggle="tooltip"]').tooltip();
$('[data-toggle="popover"]').popover();

$btnFullScreen.on("click", function (e) {
    e.preventDefault();

    if (!document.fullscreenElement && /* alternative standard method */ !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
});

$menuItem.on('click', function () {
    var parent = $(this).parent();
    var sub = parent.find('> ul');

    if (!$body.hasClass('sidebar-collapsed')) {
        if (sub.is(':visible')) {
            sub.slideUp(300, function () {
                parent.removeClass('nav-active');
                $('.body-content').css({height: ''});
                adjustMainContentHeight();
            });
        } else {
            visibleSubMenuClose();
            parent.addClass('nav-active');
            sub.slideDown(300, function () {
                adjustMainContentHeight();
            });
        }
    }
    return false;
});

//inner functions
function visibleSubMenuClose() {
    $('.has_sub').each(function () {
        var t = $(this);
        if (t.hasClass('nav-active')) {
            t.find('> ul').slideUp(300, function () {
                t.removeClass('nav-active');
            });
        }
    });
}

function adjustMainContentHeight() {
    // Adjust main content height
    var docHeight = $(document).height();
    if (docHeight > $('.body-content').height())
        $('.body-content').height(docHeight);
}


$("#sidebar-menu a").each(function () {
    if (this.href == window.location.href) {
        $(this).addClass("active");
        $(this).parent().addClass("active"); // add active to li of the current link
        $(this).parent().parent().prev().addClass("active"); // add active class to an anchor
        $(this).parent().parent().parent().addClass("active"); // add active class to an anchor
        $(this).parent().parent().prev().click(); // click the item to make it drop
    }
});

$('#status').fadeOut();
$('#preloader').delay(350).fadeOut('slow');
$('body').delay(350).css({
    'overflow': 'visible'
});

$('.toggle-search').on('click', function () {
    var targetId = $(this).data('target');
    var $searchBar;
    if (targetId) {
        $searchBar = $(targetId);
        $searchBar.toggleClass('open');
    }
});






