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

document.addEventListener('DOMContentLoaded', () => {
    const productAccordionItems = document.querySelectorAll('.product-accordion__item');

    if (productAccordionItems.length > 0) {
        productAccordionItems.forEach(item => {
            const header = item.querySelector('.product-accordion__header');
            const answerWrapper = item.querySelector('.product-accordion__answer-wrapper');

            header.addEventListener('click', () => {
                const wasActive = item.classList.contains('is-active');

                productAccordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('is-active');
                        otherItem.querySelector('.product-accordion__answer-wrapper').style.maxHeight = '0';
                    }
                });

                if (!wasActive) {
                    item.classList.add('is-active');
                    answerWrapper.style.maxHeight = (answerWrapper.scrollHeight + 20) + 'px';
                } else {
                    item.classList.remove('is-active');
                    answerWrapper.style.maxHeight = '0';
                }
            });
        });
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const catalogWrapper = document.querySelector('.catalog-dropdown-wrapper');
    const siteBackdrop = document.querySelector('.site-backdrop');

    if (!catalogWrapper || !siteBackdrop) return;

    let closeTimer;

    const catalogButton = catalogWrapper.querySelector('#catalog-button');
    const catalogDropdown = catalogWrapper.querySelector('#catalog-dropdown-menu');
    const mainItems = catalogDropdown.querySelectorAll('.catalog-dropdown__main-item');
    const subPanel = catalogDropdown.querySelector('.catalog-dropdown__sub');
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

        // Reset state
        catalogDropdown.classList.remove('sub-is-active');
        mainItems.forEach(i => i.classList.remove('is-active'));
        subLists.forEach(list => list.classList.remove('is-active'));
    };

    // Toggle on button click
    catalogButton.addEventListener('click', function (e) {
        e.preventDefault();
        clearTimeout(closeTimer);
        if (catalogWrapper.classList.contains('is-open')) {
            closeDropdown();
        } else {
            openDropdown();
        }
    });

    // Open on hover
    catalogWrapper.addEventListener('mouseenter', function () {
        clearTimeout(closeTimer);
        openDropdown();
    });

    // Start close timer on leave
    catalogWrapper.addEventListener('mouseleave', function () {
        closeTimer = setTimeout(closeDropdown, 300);
    });

    // Close when clicking backdrop
    siteBackdrop.addEventListener('click', function () {
        closeDropdown();
    });

    // Handle main item interactions
    mainItems.forEach(item => {
        const handler = function (e) {
            e.preventDefault();
            const isActive = item.classList.contains('is-active');

            // If already active, hide sub-panel
            if (isActive) {
                catalogDropdown.classList.remove('sub-is-active');
                mainItems.forEach(i => i.classList.remove('is-active'));
                subLists.forEach(list => list.classList.remove('is-active'));
                return;
            }

            // Otherwise, show relevant sub-list
            catalogDropdown.classList.add('sub-is-active');
            mainItems.forEach(i => i.classList.remove('is-active'));
            subLists.forEach(list => list.classList.remove('is-active'));
            item.classList.add('is-active');

            const category = item.dataset.category;
            const activeSubList = catalogDropdown.querySelector(`.catalog-dropdown__sub-list[data-category="${category}"]`);
            if (activeSubList) {
                activeSubList.classList.add('is-active');
            }
        };

        item.addEventListener('click', handler);
        item.addEventListener('mouseover', handler);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && catalogWrapper.classList.contains('is-open')) {
            closeDropdown();
        }
    });
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



document.addEventListener('DOMContentLoaded', () => {
    const phoneBtn = document.querySelector('[data-btn="phone"]');
    const messageBtn = document.querySelector('[data-btn="message"]');

    // Сохраняем оригинальные SVG как строки
    const originalPhoneIcon = phoneBtn.querySelector('svg').outerHTML;
    const originalMessageIcon = messageBtn.querySelector('svg').outerHTML;

    // Новая иконка телефона (вертикальная черта с закруглениями)
    const phoneIconAlt = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24">
  <rect x="4" y="11" width="16" height="3" rx="1" fill="currentColor"/>
</svg>`;

    // Крестик для message
    const closeIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
        <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`;

    // Переключение иконки телефона
    phoneBtn.addEventListener('click', () => {
        const currentSVG = phoneBtn.querySelector('svg');
        if (currentSVG.outerHTML.trim() === originalPhoneIcon.trim()) {
            phoneBtn.innerHTML = phoneIconAlt;
        } else {
            phoneBtn.innerHTML = originalPhoneIcon;
        }
    });

    // Переключение иконки сообщений
    messageBtn.addEventListener('click', () => {
        const currentSVG = messageBtn.querySelector('svg');
        if (currentSVG.outerHTML.trim() === originalMessageIcon.trim()) {
            messageBtn.innerHTML = closeIcon;
        } else {
            messageBtn.innerHTML = originalMessageIcon;
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    // --- Сортировка (без изменений) ---
    const sortToggle = document.getElementById('sort-toggle');
    const sortMenu = document.getElementById('sort-menu');
    if (sortToggle && sortMenu) {
        sortToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = sortToggle.parentElement.classList.toggle('is-open');
            sortToggle.setAttribute('aria-expanded', isOpen);
            sortMenu.hidden = !isOpen;
        });
    }

    // --- Аккордеон для групп фильтров (для обеих версий) ---
    document.querySelectorAll('.filter-group__toggle').forEach(button => {
        button.addEventListener('click', () => {
            const group = button.parentElement;
            const body = button.nextElementSibling;
            const isExpanded = button.getAttribute('aria-expanded') === 'true';

            button.setAttribute('aria-expanded', !isExpanded);
            group.classList.toggle('is-open', !isExpanded);
            // Для плавного раскрытия на мобильных
            if (!isExpanded) {
                body.style.maxHeight = (body.scrollHeight + 20) + "px";
            } else {
                body.style.maxHeight = 0;
            }
        });
    });

    // --- НОВАЯ ЛОГИКА: Выпадающие фильтры на мобильных/планшетах ---
    const filterToggleBtn = document.getElementById('filter-toggle');
    const filterWrapper = document.querySelector('.filter-dropdown-wrapper');
    const mobileSidebar = document.getElementById('catalog-sidebar-mobile');
    const filterCloseBtn = mobileSidebar.querySelector('.filter-close-btn');

    if (filterToggleBtn && filterWrapper && mobileSidebar) {
        // Открытие по клику на кнопку "Фильтр"
        filterToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = filterWrapper.classList.toggle('is-open');
            filterToggleBtn.setAttribute('aria-expanded', isOpen);
            mobileSidebar.hidden = !isOpen;
        });

        // Закрытие по клику на крестик внутри
        filterCloseBtn.addEventListener('click', () => {
            filterWrapper.classList.remove('is-open');
            filterToggleBtn.setAttribute('aria-expanded', 'false');
            mobileSidebar.hidden = true;
        });
    }

    // --- Закрытие выпадающих списков при клике вне их ---
    document.addEventListener('click', function (event) {
        // Сортировка
        if (sortToggle && !sortToggle.parentElement.contains(event.target)) {
            sortToggle.parentElement.classList.remove('is-open');
            sortMenu.hidden = true;
            sortToggle.setAttribute('aria-expanded', 'false');
        }

        // Фильтры
        if (filterWrapper && !filterWrapper.contains(event.target)) {
            filterWrapper.classList.remove('is-open');
            mobileSidebar.hidden = true;
            filterToggleBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Инициализация высоты для уже открытых аккордеонов
    document.querySelectorAll('.filter-group.is-open .filter-group__body').forEach(body => {
        body.style.maxHeight = (body.scrollHeight + 100) + "px";
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const stars = form.querySelectorAll('.custom-rate__label');
    const inputs = form.querySelectorAll('.custom-rate__input');

    stars.forEach(star => {
        star.addEventListener('mouseenter', function () {
            const currentIndex = Array.from(stars).indexOf(this);
            stars.forEach((s, index) => {
                s.querySelector('svg').style.opacity = index >= currentIndex ? '1' : '0.3';
            });
        });

        star.addEventListener('mouseleave', function () {
            const checkedInput = form.querySelector('.custom-rate__input:checked');
            if (!checkedInput) {
                stars.forEach(s => s.querySelector('svg').style.opacity = '0.3');
                return;
            }
            const checkedIndex = Array.from(inputs).indexOf(checkedInput);
            stars.forEach((s, index) => {
                s.querySelector('svg').style.opacity = index >= checkedIndex ? '1' : '0.3';
            });
        });
    });

    inputs.forEach(input => {
        input.addEventListener('change', function () {
            const index = Array.from(inputs).indexOf(this);
            stars.forEach((s, i) => {
                s.querySelector('svg').style.opacity = i >= index ? '1' : '0.3';
            });
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const testimonialsContainer = document.querySelector('.testimonials-container');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    if (!testimonialsContainer || !leftArrow || !rightArrow) {
        return;
    }

    const updateArrowStates = () => {
        const { scrollLeft, scrollWidth, clientWidth } = testimonialsContainer;

        leftArrow.disabled = scrollLeft <= 5;

        rightArrow.disabled = (scrollLeft + clientWidth) >= (scrollWidth - 5);
    };

    const getScrollAmount = () => {
        const firstCard = testimonialsContainer.querySelector('.testimonial-card');
        if (firstCard) {
            const nextCard = firstCard.nextElementSibling;
            if (nextCard) {
                return nextCard.offsetLeft - firstCard.offsetLeft;
            } else {
                return firstCard.offsetWidth;
            }
        }
        return testimonialsContainer.clientWidth / 2;
    };

    leftArrow.addEventListener('click', () => {
        testimonialsContainer.scrollBy({
            left: -getScrollAmount(),
            behavior: 'smooth'
        });
    });

    rightArrow.addEventListener('click', () => {
        testimonialsContainer.scrollBy({
            left: getScrollAmount(),
            behavior: 'smooth'
        });
    });

    testimonialsContainer.addEventListener('scroll', updateArrowStates);

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateArrowStates, 150);
    });

    updateArrowStates();
});