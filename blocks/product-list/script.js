"use strict";

$(function(){
    $(document).on("click", "[data-product-id]", function() {
        $.fancybox.close();
        $.fancybox.open({
            baseClass: 'site-popup site-popup--form',
            type: 'ajax',
            //src: app.pathToTemplate + 'ajax/product-card.php?PRODUCT_ID=' + this.dataset.productId
            src: 'ajax/product-card.html'
        });
        return false;
    });

    $('.js-product-list').each(function(index) {
        if ($(this).hasClass('product-list--big')) {
            $(this).slick({
                dots: false,
                mobileFirst: true,
                slidesToShow: 1,
                prevArrow: '<button type="button" class="product-list__arrow product-list__arrow--prev"><svg width="47" height="16" viewBox="0 0 47 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.292892 7.29289C-0.0976295 7.68342 -0.0976295 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41422 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM47 7L1 7V9L47 9V7Z" fill="#32B197"/></svg></button>',
                nextArrow: '<button type="button" class="product-list__arrow product-list__arrow--next"><svg width="47" height="16" viewBox="0 0 47 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.292892 7.29289C-0.0976295 7.68342 -0.0976295 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41422 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM47 7L1 7V9L47 9V7Z" fill="#32B197"/></svg></button>',
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
                            slidesToShow: 3
                        }
                    }
                ]
            });
        } else {
            $(this).slick({
                dots: false,
                mobileFirst: true,
                slidesToShow: 1,
                prevArrow: '<button type="button" class="product-list__arrow product-list__arrow--prev"><svg width="47" height="16" viewBox="0 0 47 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.292892 7.29289C-0.0976295 7.68342 -0.0976295 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41422 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM47 7L1 7V9L47 9V7Z" fill="#32B197"/></svg></button>',
                nextArrow: '<button type="button" class="product-list__arrow product-list__arrow--next"><svg width="47" height="16" viewBox="0 0 47 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.292892 7.29289C-0.0976295 7.68342 -0.0976295 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41422 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM47 7L1 7V9L47 9V7Z" fill="#32B197"/></svg></button>',
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
                            slidesToShow: 4
                        }
                    }
                ]
            });
        }
    });
});