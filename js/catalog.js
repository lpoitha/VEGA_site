document.addEventListener('DOMContentLoaded', function () {
    // === ЛОГИКА ДЛЯ ВЫПАДАЮЩИХ ФИЛЬТРОВ ===

    // 1. Находим все необходимые элементы
    const filterToggleBtn = document.getElementById('filter-toggle');
    const sidebar = document.getElementById('catalog-sidebar');

    // Проверяем, существуют ли элементы, чтобы избежать ошибок
    if (filterToggleBtn && sidebar) {
        const closeBtn = sidebar.querySelector('.filter-close-btn');

        // 2. Функция для открытия фильтров
        const openFilter = () => {
            sidebar.classList.add('is-active');
            filterToggleBtn.setAttribute('aria-expanded', 'true');
        };

        // 3. Функция для закрытия фильтров
        const closeFilter = () => {
            sidebar.classList.remove('is-active');
            filterToggleBtn.setAttribute('aria-expanded', 'false');
        };

        // 4. Назначаем обработчики событий

        // Клик на основную кнопку "Фільтр"
        filterToggleBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Важно: останавливаем "всплытие" события, чтобы не сработало закрытие по клику вне окна

            if (sidebar.classList.contains('is-active')) {
                closeFilter();
            } else {
                openFilter();
            }
        });

        // Клик на кнопку "крестик" внутри фильтров
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                closeFilter();
            });
        }

        // Клик вне области фильтров для их закрытия
        document.addEventListener('click', (event) => {
            // Закрываем, только если сайдбар открыт и клик был НЕ по сайдбару и НЕ по кнопке открытия
            if (sidebar.classList.contains('is-active') && !sidebar.contains(event.target) && !filterToggleBtn.contains(event.target)) {
                closeFilter();
            }
        });

        // Закрытие по нажатию клавиши 'Escape' для доступности
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && sidebar.classList.contains('is-active')) {
                closeFilter();
            }
        });
    }

});