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

    var ajaxCommentForm = function() {
        $('#commentform').each(function() {
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
                            $form.find('.comment-form').append(loading);
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
        }); // each commentform
    };


    // Dom Ready
    $(function() {
        scrollToTop();
        ajaxContactForm();
        ajaxCommentForm();
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
        slidesPerView: 7,
        spaceBetween: 0,
        loop: true,
        // centeredSlides: true,
        autoplay: {
          delay: 5000,
        },
    });

    // cases-slider
    const swiper3 = new Swiper('.cases-slider', {
        slidesPerView: 2.9,
        spaceBetween: 15,
        loop: true
    });

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

});