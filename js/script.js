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


document.addEventListener('DOMContentLoaded', function () {
    // Находим все контейнеры, которые могут быть открыты
    const toggleContainers = document.querySelectorAll('.fixed-block__phone, .fixed-block__messangers');

    toggleContainers.forEach(container => {
        const button = container.querySelector('.fixed-block__btn');

        if (button) {
            button.addEventListener('click', (event) => {
                // Предотвращаем "всплытие" события, чтобы клик по кнопке не закрыл меню сразу же
                event.stopPropagation();

                // Проверяем, было ли это меню уже открыто
                const isAlreadyOpen = container.classList.contains('open');

                // Сначала закрываем все открытые меню
                toggleContainers.forEach(c => c.classList.remove('open'));

                // Если меню не было открыто, открываем его.
                // Это создает эффект "toggle": повторный клик по открытой кнопке просто закроет ее.
                if (!isAlreadyOpen) {
                    container.classList.add('open');
                }
            });
        }
    });

    // Добавляем обработчик клика на весь документ для закрытия меню
    document.addEventListener('click', (event) => {
        // Проверяем, был ли клик сделан вне всего блока .fixed-block
        const fixedBlock = document.querySelector('.fixed-block');
        if (fixedBlock && !fixedBlock.contains(event.target)) {
            // Если да, то закрываем все открытые меню
            toggleContainers.forEach(container => {
                container.classList.remove('open');
            });
        }
    });
});