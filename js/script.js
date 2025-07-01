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

document.addEventListener('DOMContentLoaded', function () {

    // Header Catalog Dropdown Logic
    const catalogWrapper = document.querySelector('.catalog-dropdown-wrapper');
    const siteBackdrop = document.querySelector('.site-backdrop');

    if (catalogWrapper && siteBackdrop) {
        const catalogButton = catalogWrapper.querySelector('#catalog-button');
        const catalogDropdown = catalogWrapper.querySelector('#catalog-dropdown-menu');
        const mainItems = catalogDropdown.querySelectorAll('.catalog-dropdown__main-item');
        const subLists = catalogDropdown.querySelectorAll('.catalog-dropdown__sub-list');

        const openDropdown = () => {
            catalogWrapper.classList.add('is-open');
            catalogButton.setAttribute('aria-expanded', 'true');
            siteBackdrop.classList.add('is-active');
        };

        const closeDropdown = () => {
            catalogWrapper.classList.remove('is-open');
            catalogButton.setAttribute('aria-expanded', 'false');
            siteBackdrop.classList.remove('is-active');
        };

        // Toggle dropdown visibility on button click
        catalogButton.addEventListener('click', function (e) {
            e.preventDefault();
            const isOpen = catalogWrapper.classList.contains('is-open');
            if (isOpen) {
                closeDropdown();
            } else {
                openDropdown();
            }
        });

        // Close dropdown when clicking on the backdrop
        siteBackdrop.addEventListener('click', closeDropdown);

        // Prevent clicks inside the dropdown from closing it
        catalogDropdown.addEventListener('click', function (e) {
            e.stopPropagation();
        });

        // Handle hover to switch between sub-menus
        mainItems.forEach(item => {
            item.addEventListener('mouseover', function () {
                mainItems.forEach(i => i.classList.remove('is-active'));
                this.classList.add('is-active');

                const category = this.dataset.category;

                subLists.forEach(list => list.classList.remove('is-active'));

                const activeSubList = catalogDropdown.querySelector(`.catalog-dropdown__sub-list[data-category="${category}"]`);
                if (activeSubList) {
                    activeSubList.classList.add('is-active');
                }
            });
        });

        // Close dropdown on 'Escape' key press for accessibility
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && catalogWrapper.classList.contains('is-open')) {
                closeDropdown();
            }
        });
    }

});