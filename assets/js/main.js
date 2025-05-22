(function($) {

    "use strict";

    // Mobile menu
    $(document).on('click', '.mobile-button', function() {
        $(this).toggleClass('active');
        $('.header-wrap').toggleClass('active');
    });
    // close mobile menu on anchor click
    $(document).on('click', '.header a[href^="#"]', function () {
        $('.mobile-button').removeClass('active');
        $('.header-wrap').removeClass('active');
    });

    // Anchor link
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
        var target = $($.attr(this, 'href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 87
            }, 500);
        }
    });

    // Scroll function
    let scrollToTop = function() {
        $(window).scroll(function() {
            // header
            if ( $(this).scrollTop() > 100 ) {
                $('.header').addClass('dark');
            } else {
                $('.header').removeClass('dark');
            }

            //Scroll Top
            if ( $(this).scrollTop() > 300 ) {
                $('#scroll-top').addClass('show');
            } else {
                $('#scroll-top').removeClass('show');
            }
        });

        $('#scroll-top').on('click', function() {
            $('html, body').animate({ scrollTop: 0 } , 'easeInOutExpo');
            return false;
        });
    }

    // validation
    var ajaxContactForm = function() {
        $('#contactform').each(function() {
            $(this).validate({
                submitHandler: function(form) {
                    var $form = $(form),
                        str = $form.serialize(),
                        loading = $('<div />', { 'class': 'loading' });

                    $.ajax({
                        type: "POST",
                        url: $form.attr('action'),
                        data: str,
                        beforeSend: function() {
                            $form.find('.form-submit').append(loading);
                        },
                        success: function(msg) {
                            var result, cls;
                            if (msg === 'Success') {
                                result = 'Message Sent Successfully To Email Administrator. ( You can change the email management a very easy way to get the message of customers in the user manual )';
                                cls = 'msg-success';
                            } else {
                                result = 'Error sending email.';
                                cls = 'msg-error';
                            }

                            $form.prepend(
                                $('<div />', {
                                    'class': 'flat-alert ' + cls,
                                    'text': result
                                }).append(
                                    $('<a class="close" href="#"><i class="fa fa-close"></i></a>')
                                )
                            );

                            $form.find(':input').not('.submit').val('');
                        },
                        complete: function(xhr, status, error_thrown) {
                            $form.find('.loading').remove();
                        }
                    });
                }
            });
        }); // each contactform
    };


    // Dom Ready
    $(function() {
        scrollToTop();
        ajaxContactForm();
    });
})(jQuery);



document.addEventListener('DOMContentLoaded', function() {
    //dropdown
    const dropdown = document.getElementById('langDropdown');
    const selectedLang = document.getElementById('selectedLang');
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const options = document.querySelectorAll('.dropdown-option');
    dropdownBtn.addEventListener('click', () => {
        dropdown.classList.toggle('active');
    });
    options.forEach(option => {
        option.addEventListener('click', () => {
            selectedLang.textContent = option.dataset.lang;
            dropdown.classList.remove('active');
        });
    });
    // Close the dropdown when clicking outside
    window.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
    //End dropdown

    // reviews-slider
    const swiper = new Swiper('.reviews-slider', {
        slidesPerView: 2,
        spaceBetween: 0,
        centeredSlides: true,
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 400,
            modifier: 1,
            slideShadows: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        loop: true
    });

    // why-slider
    const swiper2 = new Swiper('.why-slider', {
        slidesPerView: 2,
        spaceBetween: 0,
        loop: true,
        speed: 3000,
        autoplay: {delay: 0},
        freeMode: true,
        breakpoints: {
            640: {
                slidesPerView: 3,
            },    
            768: {
                slidesPerView: 4,
            },
            1199: {
                slidesPerView: 6,
            },
        }
    });

    // cases-slider
    let swiper3 = null;
    let init = false;
    function swiperMode() {
        let mobile = window.matchMedia('(min-width: 0px) and (max-width: 767px)');
        let desktop = window.matchMedia('(min-width: 768px)');
    
        // For desktop - initialize swiper if not already initialized
        if (desktop.matches) {
            if (!init) {
                init = true;
                swiper3 = new Swiper('.cases-slider', {
                    slidesPerView: 2,
                    spaceBetween: 15,
                    loop: true,
                    breakpoints: {
                        991: {
                            slidesPerView: 2.9,
                        },
                    }
                });
            }
        }
        // For mobile - destroy swiper if it was initialized
        else if (mobile.matches && init) {
            if (swiper3 !== null && typeof swiper3.destroy === 'function') {
                swiper3.destroy(true, true); // true, true means destroy both instance and DOM elements
                swiper3 = null;
            }
            init = false;
        }
    }
    
    // Initialize on page load
    window.addEventListener('load', swiperMode);
    
    // Update on window resize with debounce to improve performance
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(swiperMode, 250); // Wait 250ms after resize finishes
    });


    // play for cases-slider 
    let currentActiveWrapper = null;

    function createThumbnailContent(wrapper) {
        const originalImage = wrapper.getAttribute('data-original-image');
        return `
            <img src="${originalImage}" alt="Thumbnail">
            <button class="play-button">
                <div class="play-icon"></div>
            </button>
        `;
    }

    function setupVideoWrapper(wrapper) {
        const playButton = wrapper.querySelector('.play-button');
        const img = wrapper.querySelector('img');
        const videoId = wrapper.getAttribute('data-video-id');

        playButton.addEventListener('click', () => {
            if (wrapper.classList.contains('playing')) return;

            if (currentActiveWrapper && currentActiveWrapper !== wrapper) {
                currentActiveWrapper.innerHTML = createThumbnailContent(currentActiveWrapper);
                currentActiveWrapper.classList.remove('playing');

                setupVideoWrapper(currentActiveWrapper);
            }

            wrapper.setAttribute('data-original-image', img.src);

            const iframe = document.createElement('iframe');
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            iframe.title = 'YouTube video player';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;

            wrapper.innerHTML = '';
            wrapper.appendChild(iframe);
            
            wrapper.classList.add('playing');
            currentActiveWrapper = wrapper;
        });
    }

    document.querySelectorAll('.thumbnail-wrapper').forEach(setupVideoWrapper);
    // End cases-slider

    // faq
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const parent = question.parentElement;
            // If this item is already active, just close it
            if (parent.classList.contains('active')) {
                parent.classList.remove('active');
                question.querySelector('.toggle-icon').textContent = '+';
                return;
            }
            // Close all items and change icons to +
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active', 'first-item');
                item.querySelector('.toggle-icon').textContent = '+';
            });
            // Open clicked item and change icon to -
            parent.classList.add('active');
            question.querySelector('.toggle-icon').textContent = '−';
        });
    });




    // form validate
    const forms = document.querySelectorAll('form.form');
  
    forms.forEach(function(form) {
        const nameInput = form.querySelector('input[placeholder="Ім\'я"]');
        const phoneInput = form.querySelector('input[placeholder="Телефон"]');
        const emailInput = form.querySelector('input[placeholder="Імейл"]');
        const submitButton = form.querySelector('button.btn-transparent');
    
        // Перевіряємо наявність всіх необхідних елементів
        if (!nameInput || !phoneInput || !emailInput || !submitButton) {
            console.error('Форма не містить всіх необхідних елементів', form);
            return; // Пропускаємо цю форму і переходимо до наступної
        }
    
        // Додаємо обробник події для кнопки відправки
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Скидаємо помилки перед кожною перевіркою
            clearErrors(form);
            
            // Перевіряємо валідність всіх полів
            let isValid = true;
            
            // Перевірка імені - не може бути порожнім
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Будь ласка, введіть ваше ім\'я');
                isValid = false;
            }
            
            // Перевірка телефону - український формат (приклад: +380501234567)
            const phoneRegex = /^\+?3?8?(0\d{9})$/;
            if (!phoneInput.value.trim()) {
                showError(phoneInput, 'Будь ласка, введіть ваш номер телефону');
                isValid = false;
            } else if (!phoneRegex.test(phoneInput.value.trim())) {
                showError(phoneInput, 'Введіть правильний формат телефону (наприклад, +380501234567)');
                isValid = false;
            }
            
            // Перевірка електронної пошти
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Будь ласка, введіть вашу електронну пошту');
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, 'Введіть правильний формат електронної пошти');
                isValid = false;
            }
            
            // Якщо форма валідна, надсилаємо дані
            if (isValid) {
                // Тут можна додати функціонал для відправки форми
                alert('Форма успішно відправлена!');
                form.reset();
            }
        });
    
        // Додаємо обробники події для очищення повідомлення про помилку при вводі
        const inputs = form.querySelectorAll('input');
        inputs.forEach(function(input) {
            input.addEventListener('input', function() {
                const errorElement = input.parentElement.querySelector('.error-message');
                if (errorElement) {
                    errorElement.remove();
                    input.style.borderColor = '';
                }
            });
        });
    });
  
    // Функція для відображення помилки під полем
    function showError(inputElement, message) {
        // Перевіряємо, чи вже існує повідомлення про помилку
        const parent = inputElement.parentElement;
        let errorElement = parent.querySelector('.error-message');
        
        // Якщо елемент помилки не існує, створюємо його
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            parent.appendChild(errorElement);
        }
        
        // Додаємо червону рамку до поля з помилкою
        inputElement.style.borderColor = 'red';

        // Встановлюємо текст помилки
        errorElement.textContent = message;
    }
  
    // Функція для очищення всіх помилок у конкретній формі
    function clearErrors(form) {
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(function(element) {
            element.remove();
        });
        
        // Відновлюємо стандартні стилі для полів
        const inputs = form.querySelectorAll('input');
        inputs.forEach(function(input) {
            input.style.borderColor = '';
        });
    }



});