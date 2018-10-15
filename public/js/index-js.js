$(document).ready(function () {

    if($(window).width() <= 600) {
        $(".feature-card .fa").css("font-size", "xx-large");
        $(".feature-card .feature-text").css("font-size", "large");
        $(".carousel-container , .carousel , .carousel-inner , .carousel-item , .carousel-item img")
            .height($(".feature-container").height() * .55)
    }

    $(window).on('resize', function () {

        if ($(".navbar-sticky-container").css("display").toString() == "block") {
            $(".carousel-container").css('margin-top', $(".fixed-navbar-top").outerHeight() + 4)
        }

        if ($(window).width() >= 975) {
            $(".navbar-sticky").css("right", "105%");
            $(".navbar-sticky-bg").css("display", "none");
        }//large screen
    });

    $(window).on('load', function () {
        if ($(".navbar-sticky-container").css("display").toString() == "block") {
            $(".carousel-container").css('margin-top', $(".fixed-navbar-top").outerHeight() + 4)
        }
    });
});