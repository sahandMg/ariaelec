$(document).ready(function () {
   
    $('.iconbar-container').click(function () {

        $(this).toggleClass('change');

        $(".navbar-sticky-bg").fadeIn('slow',function () {
            $("body").css({overflow : "hidden"});
            $('.navbar-sticky').animate({'left' : $(window).outerWidth()-$(".navbar-sticky").outerWidth()},'fast');

        });

    });

    $("body").click(function (e) {
        if(e.target.classList.contains('navbar-sticky-bg')){

            $('.navbar-sticky')
                .animate({"left": "100%"}, 'fast');

            $('.navbar-sticky-bg').fadeOut('slow',function () {
                $("body").css({overflow : "visible"});
                $('.iconbar-container').toggleClass('change');
            });
        }
    })

});