"use strict";

const app = {
    pathToTemplate: '/local/templates/luxplast.ru/', // Абсолютный путь до шаблона сайта

    /**
     * Для подгрузки svg-спрайта на сервере
     */
    svgLoad: function() {
        const ajax = new XMLHttpRequest();

        ajax.open("GET", app.pathToTemplate+"images/icons.svg", true);
        ajax.send();
        ajax.onload = function(e) {
            const svgDiv = document.createElement("div");
            svgDiv.style.display = "none";
            svgDiv.innerHTML = ajax.responseText;
            document.body.insertBefore(svgDiv, document.body.childNodes[0]);
        };
    },

    /**
     * Обернуть элемент в тэг
     * @param el
     * @param tagWrap
     * @param tagClass
     */
    wrapElement: function(el, tagWrap, tagClass) {
        const wrapper = document.createElement(tagWrap);
        if (tagClass)
            wrapper.classList.add(tagClass);

        el.parentNode.insertBefore(wrapper, el);
        wrapper.append(el);
    },

    /**
     * Смещающийся placeholder
     * @param selector
     */
    movingPlaceholder: function(selector, classInit) {
        const inputs = document.querySelectorAll(selector);
        for (let input of inputs) {
            if (!input.placeholder)
                continue;
            this.wrapElement(input, 'div', classInit);
            const label = document.createElement('span');
            label.classList.add(classInit+'__label');
            label.innerText = input.placeholder;
            input.after(label);
            input.removeAttribute('placeholder');
            input.classList.add(classInit+'__field');
        }
        document.addEventListener('blur', function (e) {
            if (e.target.classList.contains(classInit+'__field')) {
                const el = e.target;

                if (el.value !== '') {
                    el.classList.add('--focus');
                } else {
                    el.classList.remove('--focus');
                }
            }
        }, true);
    },

    /**
     * Функция плавного скролла
     */
    smoothScroll: (function () {
        let timer, start, factor;

        return function (target, duration) {
            let offset = window.pageYOffset,
                delta  = target - window.pageYOffset; // Y-offset difference
            duration = duration || 1000;              // default 1 sec animation
            start = Date.now();                       // get start time
            factor = 0;

            if (timer) {
                clearInterval(timer); // stop any running animations
            }

            function step() {
                let y;
                factor = (Date.now() - start) / duration; // get interpolation factor
                if( factor >= 1 ) {
                    clearInterval(timer); // stop animation
                    factor = 1;           // clip to max 1.0
                }
                y = factor * delta + offset;
                window.scrollBy(0, y - window.pageYOffset);
            }

            timer = setInterval(step, 10);
            return timer;
        };
    }()),

    /**
     * Плавный скролл до элемента
     * @param selector
     */
    scrollTo: function(selector) {
        const offsetTop = document.querySelector(selector).offsetTop;
        app.smoothScroll(offsetTop);
    },

    init: function() {
        //this.svgLoad();
        this.movingPlaceholder('.js-moving-placeholder', 'moving-placeholder');

        document.addEventListener('click', function (e) {
            const scrollToSelector = e.target.dataset.scrollTo;
            if (scrollToSelector !== undefined) {
                e.preventDefault();
                app.scrollTo(scrollToSelector);
            }
        });

        $(document).on("click", "[data-form]", function () {
            $.fancybox.close();
            $.fancybox.open({
                baseClass: 'site-popup site-popup--form',
                type: 'ajax',
                //src: app.pathToTemplate + 'ajax/' + this.dataset.form + '.php',
                src: 'ajax/' + this.dataset.form + '.html',
                afterShow: function () {
                    $('[name*=PHONE]').maskInput("+7 (999) 999-99-99");
                    app.movingPlaceholder('.js-moving-placeholder', 'moving-placeholder');
                    $('input[type=file]').styler();
                }
            });
            return false;
        });
        if (typeof BX == 'function') {
            BX.addCustomEvent('onAjaxSuccess', function () {
                app.movingPlaceholder('.js-moving-placeholder', 'moving-placeholder');
                $('[name*=PHONE]').maskInput("+7 (999) 999-99-99");
                $('input[type=file]').styler();
            });
        }
    }
};

app.init();

class Tabs {
    constructor(tabContainer, tabPanelContainer) {
        this.tabContainer = document.querySelector(tabContainer);
        this.tabPanelContainer = document.querySelector(tabPanelContainer);

        if (this.tabContainer === null || this.tabPanelContainer === null )
            return false

        this.setTabIndex();
        this.openTab(0);

        this.tabContainer.addEventListener('click', event => {
            const tab = event.target.closest('[data-tab-index]');
            if (tab === null)
                return false;
            const index = tab.dataset.tabIndex;

            this.openTab(index);
        });
    }

    /**
     * Проставляем индексы табов
     */
    setTabIndex() {
        const tabList = this.tabContainer.children;
        const tabPanelList = this.tabPanelContainer.children;
        let tabIndex = 0;

        for (let tab of tabList) {
            tab.setAttribute('data-tab-index', tabIndex);
            if (tabPanelList[tabIndex])
                tabPanelList[tabIndex].setAttribute('data-tabpanel-index', tabIndex);
            tabIndex ++;
        }
    }

    /**
     * Открываем таб с выбранным индексом
     * @param index
     */
    openTab(index) {
        const tabActive = this.tabContainer.querySelector('.-is-active');
        const tabPanelActive = this.tabPanelContainer.querySelector('.-is-active');

        if (tabActive)
            tabActive.classList.remove('-is-active');
        if (tabPanelActive)
            tabPanelActive.classList.remove('-is-active');

        this.tabContainer.querySelector(`[data-tab-index = "${index}"]`).classList.add('-is-active');
        this.tabPanelContainer.querySelector(`[data-tabpanel-index = "${index}"]`).classList.add('-is-active');
    }
}