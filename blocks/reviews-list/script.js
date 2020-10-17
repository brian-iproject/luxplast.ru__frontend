"use strict";

$(function(){
    $('.js-reviews-list').slick({
        dots: true,
        dotsClass: 'reviews-list__dots',
        arrows: false,
        mobileFirst: true,
        slidesToShow: 1,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1199,
                settings: {
                    arrows: false,
                    slidesToShow: 4
                }
            }
        ]
    });
});