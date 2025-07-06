document.addEventListener('DOMContentLoaded', function () {
    // --- Dropdown for Sorting ---
    const sortToggle = document.getElementById('sort-toggle');
    const sortMenu = document.getElementById('sort-menu');

    if (sortToggle && sortMenu) {
        sortToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = sortToggle.getAttribute('aria-expanded') === 'true';
            sortToggle.setAttribute('aria-expanded', String(!isExpanded));
            sortMenu.hidden = isExpanded;
            sortToggle.parentElement.classList.toggle('is-open');
        });
    }

    // --- Accordion for Filter Groups ---
    document.querySelectorAll('.filter-group__toggle').forEach(button => {
        button.addEventListener('click', () => {
            const group = button.parentElement;
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', String(!isExpanded));
            group.classList.toggle('is-open', !isExpanded);
        });
    });

    // --- Show/Hide Filter Panel (Tablet/Mobile) ---
    const filterToggleBtn = document.getElementById('filter-toggle');
    const sidebar = document.getElementById('catalog-sidebar');
    const sidebarCloseBtn = document.getElementById('filter-sidebar-close');

    if (filterToggleBtn && sidebar) {
        filterToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = filterToggleBtn.getAttribute('aria-expanded') === 'true';
            filterToggleBtn.setAttribute('aria-expanded', String(!isExpanded));
            sidebar.classList.toggle('is-active');
        });
    }

    if (sidebarCloseBtn) {
        sidebarCloseBtn.addEventListener('click', () => {
            filterToggleBtn.setAttribute('aria-expanded', 'false');
            sidebar.classList.remove('is-active');
        });
    }


    // --- Close Dropdowns on Outside Click ---
    document.addEventListener('click', function (event) {
        // Close Sort Dropdown
        if (sortToggle && !sortToggle.parentElement.contains(event.target)) {
            sortToggle.setAttribute('aria-expanded', 'false');
            sortMenu.hidden = true;
            sortToggle.parentElement.classList.remove('is-open');
        }

        // Close Filter Panel on Tablet/Mobile
        if (sidebar && filterToggleBtn && sidebar.classList.contains('is-active')) {
            if (!sidebar.contains(event.target) && !filterToggleBtn.contains(event.target)) {
                filterToggleBtn.setAttribute('aria-expanded', 'false');
                sidebar.classList.remove('is-active');
            }
        }
    });
});