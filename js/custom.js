// JavaScript Document

$(window).load(function () {
    "use strict";
    // makes sure the whole site is loaded
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({
        'overflow': 'visible'
    });
})

$(document).ready(function () {
    "use strict";

    // scroll menu
    var sections = $('.section'),
        nav = $('.navbar-fixed-top,footer'),
        nav_height = nav.outerHeight();

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();

        sections.each(function () {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');

                $(this).addClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    });

    nav.find('a').on('click', function () {
        var $el = $(this),
            id = $el.attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top - nav_height + 2
        }, 600);

        return false;
    });


    // Menu opacity
    if ($(window).scrollTop() > 80) {
        $(".navbar-fixed-top").addClass("bg-nav");
    } else {
        $(".navbar-fixed-top").removeClass("bg-nav");
    }
    $(window).scroll(function () {
        if ($(window).scrollTop() > 80) {
            $(".navbar-fixed-top").addClass("bg-nav");
        } else {
            $(".navbar-fixed-top").removeClass("bg-nav");
        }
    });



    // Parallax
    var parallax = function () {
        $(window).stellar();
    };

    $(function () {
        parallax();
    });

    // AOS
    AOS.init({
        duration: 1200,
        once: true,
        disable: 'mobile'
    });

    //  isotope
    $('#projects').waitForImages(function () {
        var $container = $('.portfolio_container');
        $container.isotope({
            filter: '*',
        });

        $('.portfolio_filter a').click(function () {
            $('.portfolio_filter .active').removeClass('active');
            $(this).addClass('active');

            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 500,
                    animationEngine: "jquery"
                }
            });
            return false;
        });

    });

    //animatedModal
    $("#demo01,#demo02,#demo03,#demo04,#demo05,#demo06,#demo07,#demo08,#demo09").animatedModal();

    // View All functionality
    $('#viewAllBtn').click(function() {
        var $container = $('.portfolio_container');
        var $btn = $(this);
        
        if ($container.hasClass('show-all')) {
            $container.removeClass('show-all');
            $btn.text('View All');
            // Scroll back to portfolio section
            $('html, body').animate({
                scrollTop: $('#projects').offset().top - 100
            }, 600);
        } else {
            $container.addClass('show-all');
            $btn.text('Show Less');
        }
        
        // Re-trigger isotope layout after showing/hiding items
        setTimeout(function() {
            $container.isotope('layout');
        }, 100);
    });

    // Contact Form 	

    // validate contact form
    $(function () {
        $('#contact-form').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true
                },
                phone: {
                    required: false
                },
                message: {
                    required: true
                }

            },
            messages: {
                name: {
                    required: "This field is required",
                    minlength: "your name must consist of at least 2 characters"
                },
                email: {
                    required: "This field is required"
                },
                message: {
                    required: "This field is required"
                }
            },
            submitHandler: function (form) {
                $(form).ajaxSubmit({
                    type: "POST",
                    data: $(form).serialize(),
                    url: "process.php",
                    success: function () {
                        $('#contact :input').attr('disabled', 'disabled');
                        $('#contact').fadeTo("slow", 1, function () {
                            $(this).find(':input').attr('disabled', 'disabled');
                            $(this).find('label').css('cursor', 'default');
                            $('#success').fadeIn();
                        });
                    },
                    error: function () {
                        $('#contact').fadeTo("slow", 1, function () {
                            $('#error').fadeIn();
                        });
                    }
                });
            }
        });

    });
});

document.addEventListener('DOMContentLoaded', function () {
    const portfolioItems = document.querySelectorAll('.portfolio_item');
    const modalTitle = document.querySelector('.modal-content h2');
    const modalDescription = document.querySelector('.modal-content p');
    const modalImage = document.querySelector('.modal-content img');
    const modalExtraContent = document.querySelector('#extra-content');
    const pdfViewer = document.querySelector('#pdf-viewer');
    const videoViewer = document.querySelector('#video-viewer');

    portfolioItems.forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            const image = this.getAttribute('data-image');
            const extraContent = this.getAttribute('data-extra');
            const pdf = this.getAttribute('data-pdf');
            const video = this.getAttribute('data-video');

            // Update modal content
            modalTitle.innerHTML = title;
            modalDescription.innerHTML = description;
            
            // Handle image display
            if (image) {
                modalImage.setAttribute('src', image);
                modalImage.style.display = 'block';
            } else {
                modalImage.style.display = 'none';
            }
            
            modalExtraContent.innerHTML = extraContent || '';

            // Handle PDF display
            if (pdf) {
                pdfViewer.setAttribute('src', pdf);
                pdfViewer.style.display = 'block';
            } else {
                pdfViewer.style.display = 'none';
                pdfViewer.setAttribute('src', '');
            }

            // Handle YouTube Video display
            if (video) {
                // Check if it's a YouTube URL
                if (video.includes('youtube.com/embed/') || video.includes('youtu.be/')) {
                    // Create YouTube iframe
                    const youtubeIframe = `<iframe width="100%" height="400" src="${video}" frameborder="0" allowfullscreen></iframe>`;
                    modalExtraContent.innerHTML = (extraContent || '') + '<br><br>' + youtubeIframe;
                    videoViewer.style.display = 'none';
                } else {
                    // Handle regular video files
                    videoViewer.querySelector('source').setAttribute('src', video);
                    videoViewer.style.display = 'block';
                    videoViewer.load();
                }
            } else {
                videoViewer.style.display = 'none';
                videoViewer.querySelector('source').setAttribute('src', '');
            }
        });
    });
});