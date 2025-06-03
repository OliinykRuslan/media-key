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

    // Dom Ready
    $(function() {
        scrollToTop();
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
    // let currentActiveWrapper = null;

    // function createThumbnailContent(wrapper) {
    //     const originalImage = wrapper.getAttribute('data-original-image');
    //     return `
    //         <img src="${originalImage}" alt="Thumbnail">
    //         <button class="play-button">
    //             <div class="play-icon"></div>
    //         </button>
    //     `;
    // }

    // function setupVideoWrapper(wrapper) {
    //     const playButton = wrapper.querySelector('.play-button');
    //     const img = wrapper.querySelector('img');
    //     const videoId = wrapper.getAttribute('data-video-id');

    //     playButton.addEventListener('click', () => {
    //         if (wrapper.classList.contains('playing')) return;

    //         if (currentActiveWrapper && currentActiveWrapper !== wrapper) {
    //             currentActiveWrapper.innerHTML = createThumbnailContent(currentActiveWrapper);
    //             currentActiveWrapper.classList.remove('playing');

    //             setupVideoWrapper(currentActiveWrapper);
    //         }

    //         wrapper.setAttribute('data-original-image', img.src);

    //         const iframe = document.createElement('iframe');
    //         iframe.width = '100%';
    //         iframe.height = '100%';
    //         iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    //         iframe.title = 'YouTube video player';
    //         iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    //         iframe.allowFullscreen = true;

    //         wrapper.innerHTML = '';
    //         wrapper.appendChild(iframe);
            
    //         wrapper.classList.add('playing');
    //         currentActiveWrapper = wrapper;
    //     });
    // }

    // document.querySelectorAll('.cases-slider .swiper-slide').forEach(slide => {
    //     const playButton = slide.querySelector('.play-button');
    //     const slideButton = slide.querySelector('.btn-slide');

    //     if (playButton && slideButton) {
    //         slideButton.addEventListener('click', (e) => {
    //             e.preventDefault();
    //             playButton.click();
    //         });
    //     }
    // });

    // document.querySelectorAll('.thumbnail-wrapper').forEach(setupVideoWrapper);




    const watchButtons = document.querySelectorAll('.btn-slide');
    const videos = document.querySelectorAll('.thumbnail-wrapper iframe');
    videos.forEach(video => {
        let src = video.getAttribute('src');
        video.setAttribute('data-src', src);
        src = src.replace('autoplay=1', '');
        if (src.includes('?')) {
            src = src + '&mute=1&enablejsapi=1';
        } else {
            src = src + '?mute=1&enablejsapi=1';
        }
        video.setAttribute('src', src);
    });

    watchButtons.forEach(button => {
        button.addEventListener('click', function() {
            const slide = this.closest('.swiper-slide');
            const iframe = slide.querySelector('iframe');
            if (iframe) {
                let src = iframe.getAttribute('data-src');
                if (src.includes('?')) {
                    src = src + '&autoplay=1';
                } else {
                    src = src + '?autoplay=1';
                }
                iframe.setAttribute('src', src);
            }
        });
    });
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

});