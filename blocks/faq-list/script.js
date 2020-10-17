"use strict";

const faqList = document.querySelector('.faq-list');
faqList.addEventListener('click', function (event) {
    const question = event.target.closest('.faq-list__question-title');

    if (!question) return;

    const answer = question.closest('.faq-list__question').nextElementSibling;
    question.classList.toggle('-is-active');
    answer.classList.toggle('-is-active');
});