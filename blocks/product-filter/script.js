"use strict";

$(function(){
    let productFilter = "";
    $("[data-filter-type]").on("click", function () {
        productFilter = $(this).attr("data-filter-type");
        const filterBlock = $(this).closest('.product-filter');
        const sectionId = filterBlock.attr("data-section-id");
        const productBlock = $('.js-product-list[data-section-id='+sectionId+']');

        productBlock.slick('slickUnfilter');

        if ($(this).hasClass('-is-active')) {
            filterBlock.find('[data-filter-type]').removeClass("-is-active");

        } else {
            filterBlock.find('[data-filter-type]').removeClass("-is-active");
            productBlock.slick("slickFilter", "[data-product-type*="+productFilter+"]")
            $(this).addClass("-is-active");
        }
    });

    $(".js-product-filter").slick({
        dots: false,
        infinite: false,
        mobileFirst: true,
        variableWidth: true,
        prevArrow: '<button type="button" class="product-filter__arrow product-filter__arrow--prev"></button>',
        nextArrow: '<button type="button" class="product-filter__arrow product-filter__arrow--next"></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: "unslick"
            }
        ]
    });
});