document.addEventListener('DOMContentLoaded', function () {

    // ----- FAQ Accordion -----
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const header = item.querySelector('.faq-item__header');

        header.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.is-active');

            // Если есть уже активный элемент и это не тот, по которому кликнули, - закрываем его
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('is-active');
            }

            // Переключаем класс для текущего элемента
            item.classList.toggle('is-active');
        });
    });

});

const heartButtons = document.querySelectorAll('.product-card__actions .btn:first-child');

heartButtons.forEach(button => {
    const heartIcon = button.querySelector('img');
    const originalSrc = heartIcon.src;
    const hoverSrc = 'img/icons/heart-white.svg'; // Убедитесь, что этот путь правильный

    button.addEventListener('mouseenter', () => {
        heartIcon.src = hoverSrc;
    });

    button.addEventListener('mouseleave', () => {
        heartIcon.src = originalSrc;
    });
});
