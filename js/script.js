document.addEventListener('DOMContentLoaded', function () {

    // --- Burger Menu Logic ---
    const burgerMenu = document.getElementById('burger-menu');
    const burgerButton = document.querySelector('.btn--burger');
    const burgerCloseButtonMob = document.getElementById('burger-menu-close-mob');
    const burgerCloseButtonLap = document.getElementById('burger-menu-close-laptop');
    const siteBackdrop = document.querySelector('.site-backdrop');
    const body = document.body;

    if (burgerMenu && burgerButton && burgerCloseButtonLap && burgerCloseButtonMob && siteBackdrop) {
        const openMenu = () => {
            // Remove 'hidden' attribute to make the element visible
            burgerMenu.hidden = false;

            // A tiny delay (requestAnimationFrame is best) to allow the 'display' property to change before starting the CSS transition.
            requestAnimationFrame(() => {
                body.classList.add('no-scroll');
                siteBackdrop.classList.add('is-active');
                burgerMenu.classList.add('is-open');
            });
        };

        const closeMenu = () => {
            body.classList.remove('no-scroll');
            siteBackdrop.classList.remove('is-active');
            burgerMenu.classList.remove('is-open');

            // Wait for the CSS transition to finish before hiding the element completely for accessibility.
            burgerMenu.addEventListener('transitionend', () => {
                burgerMenu.hidden = true;
            }, { once: true });
        };

        burgerButton.addEventListener('click', (e) => {
            e.preventDefault();
            openMenu();
        });

        burgerCloseButtonMob.addEventListener('click', closeMenu);
        burgerCloseButtonLap.addEventListener('click', closeMenu);
        siteBackdrop.addEventListener('click', closeMenu);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && burgerMenu.classList.contains('is-open')) {
                closeMenu();
            }
        });
    }


    // --- Fixed Block Buttons Logic ---
    const fixedPhone = document.querySelector(".fixed-block__phone");
    if (fixedPhone) {
        const fixedPhoneBtn = fixedPhone.querySelector(".fixed-block__btn");
        fixedPhoneBtn.addEventListener("click", (() => {
            fixedPhone.classList.toggle("open");
        }));
    }

    const fixedMessangers = document.querySelector(".fixed-block__messangers");
    if (fixedMessangers) {
        const fixedMessangersBtn = fixedMessangers.querySelector(".fixed-block__btn");
        fixedMessangersBtn.addEventListener("click", (() => {
            fixedMessangers.classList.toggle("open");
        }));
    }

    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const header = item.querySelector('.faq-item__header');
            header.addEventListener('click', () => {
                const wasActive = item.classList.contains('is-active');
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('is-active');
                });
                if (!wasActive) {
                    item.classList.add('is-active');
                }
            });
        });
    }
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

        // =================================================================
        // NEW: Switch to CLICK event for main category activation
        // This ensures the menu works on touch devices (mobile/tablet)
        // =================================================================
        mainItems.forEach(item => {
            var eventList = ["click", "mouseover"];
            for (even of eventList) {
                item.addEventListener(even, function (e) {
                    e.preventDefault(); // Prevent page jump from <a> tag

                    // Remove 'is-active' from all main items
                    mainItems.forEach(i => i.classList.remove('is-active'));

                    // Add 'is-active' to the clicked item
                    this.classList.add('is-active');

                    // Get the category from the data-attribute
                    const category = this.dataset.category;

                    // Hide all sub-lists
                    subLists.forEach(list => list.classList.remove('is-active'));

                    // Show the corresponding sub-list
                    const activeSubList = catalogDropdown.querySelector(`.catalog-dropdown__sub-list[data-category="${category}"]`);
                    if (activeSubList) {
                        activeSubList.classList.add('is-active');
                    }
                });

            }

        });

        // Close dropdown on 'Escape' key press for accessibility
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && catalogWrapper.classList.contains('is-open')) {
                closeDropdown();
            }
        });
    }


});




document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('contact-popup-modal');
    if (!modal) return;

    const openModalButtons = document.querySelectorAll('.btn--contact');
    const closeModalButton = modal.querySelector('.popup-close-btn');
    const formView = modal.querySelector('#popup-modal-form');
    const successView = modal.querySelector('#popup-modal-success');

    const focusableElementsString = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    let focusableElements;
    let firstFocusableElement;
    let lastFocusableElement;

    const updateFocusableElements = () => {
        const visibleView = formView.classList.contains('is-visible') ? formView : successView;
        focusableElements = visibleView.querySelectorAll(focusableElementsString);
        firstFocusableElement = focusableElements[0];
        lastFocusableElement = focusableElements[focusableElements.length - 1];
    };

    const openModal = () => {
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        modal.classList.add('is-open');
        updateFocusableElements();
        setTimeout(() => firstFocusableElement.focus(), 100);
    };

    const closeModal = () => {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
        setTimeout(() => {
            modal.hidden = true;
            // Возвращаем в начальное состояние
            formView.classList.add('is-visible');
            successView.classList.remove('is-visible');
            formView.reset();
        }, 400);
    };

    const showSuccess = () => {
        formView.classList.remove('is-visible');
        successView.classList.add('is-visible');
        updateFocusableElements();
        setTimeout(() => {
            // Фокус на первую кнопку в success view
            const firstSuccessButton = successView.querySelector('.btn');
            if (firstSuccessButton) firstSuccessButton.focus();
        }, 100);
    };

    openModalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    closeModalButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });

    formView.addEventListener('submit', (e) => {
        e.preventDefault();
        showSuccess();
    });

    modal.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab' || !modal.classList.contains('is-open')) return;

        if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                e.preventDefault();
            }
        }
    });
});



document.addEventListener('DOMContentLoaded', function () {

    // --- Accordion for Desktop Filters ---
    const filterToggles = document.querySelectorAll('.catalog-sidebar .filter-group__toggle');
    filterToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const group = toggle.parentElement;
            const content = toggle.nextElementSibling;
            const isExpanded = group.classList.contains('is-open');

            toggle.setAttribute('aria-expanded', !isExpanded);
            group.classList.toggle('is-open');

            // This is crucial for the animation to work
            if (group.classList.contains('is-open')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // --- Dropdown for Mobile Filters ---
    const mobileFilterToggle = document.getElementById('filter-toggle');
    const mobileFiltersPanel = document.getElementById('mobile-filters-panel');

    if (mobileFilterToggle) {
        mobileFilterToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent document click listener from closing it immediately
            const isExpanded = mobileFilterToggle.getAttribute('aria-expanded') === 'true';
            mobileFilterToggle.setAttribute('aria-expanded', !isExpanded);
            mobileFiltersPanel.hidden = isExpanded;
        });
    }

    // --- Dropdown for Sorting ---
    const sortToggle = document.getElementById('sort-toggle');
    const sortMenu = document.getElementById('sort-menu');
    if (sortToggle) {
        sortToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent document click listener from closing it immediately
            const isExpanded = sortToggle.getAttribute('aria-expanded') === 'true';
            sortToggle.setAttribute('aria-expanded', !isExpanded);
            sortMenu.hidden = isExpanded;
            sortToggle.parentElement.classList.toggle('is-open');
        });
    }

    // --- Close dropdowns on outside click ---
    document.addEventListener('click', function (event) {
        // Close sort dropdown
        if (sortToggle && !sortToggle.parentElement.contains(event.target)) {
            sortToggle.setAttribute('aria-expanded', 'false');
            sortMenu.hidden = true;
            sortToggle.parentElement.classList.remove('is-open');
        }

        // Close mobile filter panel
        if (mobileFiltersPanel && !mobileFiltersPanel.contains(event.target) && !mobileFilterToggle.contains(event.target)) {
            mobileFilterToggle.setAttribute('aria-expanded', 'false');
            mobileFiltersPanel.hidden = true;
        }
    });
});