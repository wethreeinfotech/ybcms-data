/**
 * @file
 * yb-pre-login.js
 *
 * YonoB WCM Theme – main frontend behaviour file.
 * Wraps all custom JS in Drupal.behaviors for proper attach/detach support.
 */
(function ($, Drupal) {

  'use strict';

  // ─── 1. Accessibility: Font-size controls & Contrast toggle ───────────────
  Drupal.behaviors.yonobAccessibility = {
    attach: function (context, settings) {
      var $html = $('html');
      var baseSize = 14;

      // Select the buttons and attach events once
      once('yonob-font-btns', '#increaseFont, #decreaseFont, #resetFont', context).forEach(function (el) {
        $(el).on('click', function (e) {
          e.preventDefault();
          var current = parseFloat($html.css('font-size')) || baseSize;
          var id = $(this).attr('id');

          if (id === 'increaseFont') {
            if (current < 20) {
              $html.css('font-size', (current + 1) + 'px');
            }
          } else if (id === 'decreaseFont') {
            if (current > 10) {
              $html.css('font-size', (current - 1) + 'px');
            }
          } else if (id === 'resetFont') {
            $html.css('font-size', baseSize + 'px');
          }
        });
      });
    }
  };

  // ─── 2. Contrast / Dark-mode toggle ───────────────────────────────────────
  window.Contrast_theme = function () {
    if ($('.du-header').hasClass('dark-mode')) {
      $('.du-header').removeClass('dark-mode');
      //$('.du-footer').removeClass('dark-mode');
      //$('body').removeClass('dark-mode');
      $('.Main-header_cta_logo img').attr('src', drupalSettings.path.themeUrl + '/images/yono_logo.png');
    } else {
      $('.du-header').addClass('dark-mode');
      //$('.du-footer').addClass('dark-mode');
      //$('body').addClass('dark-mode');
      $('.Main-header_cta_logo img').attr('src', drupalSettings.path.themeUrl + '/images/header/WCAG_yono_logo.svg');
    }

    if ($('.du-main-section').hasClass('dark-mode')) {
      $('.du-main-section').removeClass('dark-mode');
    } else {
      $('.du-main-section').addClass('dark-mode');
    }
  };

  // ─── 3. Skip-to-content toggle ────────────────────────────────────────────
  /**
   * Called from the Skip button onclick in page.html.twig.
   */
  window.test = function () {
    if ($('.login-open').hasClass('show')) {
      $('.login-open').removeClass('show');
      $('.grow-your-wealth').removeClass('show');
    } else {
      $('.grow-your-wealth').removeClass('show');
      $('.login-open').addClass('show');
    }
  };

  // ─── 4. Sticky header / scroll shadow ─────────────────────────────────────
  Drupal.behaviors.yonobStickyHeader = {
    attach: function (context, settings) {
      once('yonob-sticky-header', '#revamp_topHeader', context).forEach(function (el) {
        $(window).on('scroll.yonob', function () {
          if ($(window).scrollTop() > 50) {
            $(el).addClass('scrolled');
          } else {
            $(el).removeClass('scrolled');
          }
        });
      });
    }
  };

  // ─── 5. Knowledge Hub Owl Carousel initialisation ─────────────────────────
  Drupal.behaviors.yonobKnowledgeHubCarousel = {
    attach: function (context, settings) {
      once('yonob-kh-carousel', '#knowledge-hub-owl-coursel', context).forEach(function (el) {
        var $owl = $(el).find('.owl-carousel');
        var itemCount = $(el).find('.item').length;

        $owl.owlCarousel({
          items: 3,
          loop: false, // Prevents looping and natively disables 'owl-prev' on page 1
          rewind: false,
          margin: 30,
          nav: true,
          navText: [
            '<span class="owl-prev-icon">&#10094;</span>',
            '<span class="owl-next-icon">&#10095;</span>'
          ],
          dots: true,
          autoplay: false,
          autoplayTimeout: 4000,
          autoplayHoverPause: true,
          responsive: {
            0: { items: 1, nav: itemCount > 1, dots: itemCount > 1 },
            768: { items: 2, slideBy: 2, nav: itemCount > 2, dots: itemCount > 2 },
            992: { items: 3, slideBy: 3, nav: itemCount > 3, dots: itemCount > 3 }
          }
        });

      });
    }
  };

  // ─── 6. Masonry / card-columns load-more plugin ───────────────────────────
  $.fn.loadMore = function (options) {
    var settings = $.extend({
      cardsToShow: 3,
      mobCardsToShow: 0,
      shownCards: 0,
      cards: '.card',
      loadMoreEl: '[data-load-more]',
      loadLessEl: '[data-show-less]'
    }, options);

    return this.each(function () {
      var cardsList = $(settings.cards);
      var totalCards = cardsList.length;
      var cardsToShow = settings.cardsToShow;
      var shownCards = settings.shownCards;
      var loadMoreCnt = $(settings.loadMoreEl);
      var loadLessCnt = $(settings.loadLessEl);

      function setResponsiveCards() {
        if ($(window).width() <= 576) {
          cardsToShow = settings.mobCardsToShow;
        }
      }

      function updateButtons() {
        loadMoreCnt.toggle(shownCards < totalCards);
        loadLessCnt.toggle(totalCards <= shownCards);
      }

      setResponsiveCards();
      cardsList.slice(0, cardsToShow).show();
      shownCards += cardsToShow;
      updateButtons();

      loadMoreCnt.on('click', function (e) {
        e.preventDefault();
        $(settings.cards + ':hidden').slice(0, cardsToShow).slideDown();
        shownCards += cardsToShow;
        updateButtons();
      });

      loadLessCnt.on('click', function (e) {
        e.preventDefault();
        $(settings.cards + ':visible').slice(cardsToShow).slideUp();
        shownCards = cardsToShow;
        updateButtons();
      });
    });
  };

  // ─── 7. Card-filter by tab ────────────────────────────────────────────────
  $.fn.filterCardsByTab = function (options) {
    var settings = $.extend({
      itemsSelector: '.card',
      tabSelector: '.category-list-btn',
      cardTxtSelector: '.category-btn',
      loadMoreSelector: '[data-load-more]',
      showLessSelector: '[data-show-less]',
      cardsToShow: 3
    }, options);

    var $container = this;
    var $items = $container.find(settings.itemsSelector);
    var totalCards = $items.length;
    var $loadMoreBtn = $(settings.loadMoreSelector);
    var $showLessBtn = $(settings.showLessSelector);
    var cardTxtSel = $(settings.cardTxtSelector);
    var $tabSelector = $(settings.tabSelector);
    var $currentFilter = 'all';
    var $filteredItems;

    function filterAndShowItems(filter) {
      $currentFilter = filter;
      $items.hide();
      $filteredItems = ($currentFilter === 'all') ? $items : $items.filter('.' + $currentFilter);
      $filteredItems.slice(0, settings.cardsToShow).show();
      $loadMoreBtn.toggle($filteredItems.length > settings.cardsToShow);
    }

    function updateButtons() {
      var shownCardsList = $(settings.itemsSelector + ':visible').length;
      $loadMoreBtn.toggle(shownCardsList < totalCards);
      $showLessBtn.toggle(totalCards <= shownCardsList);
      if (totalCards > shownCardsList) {
        $showLessBtn.hide();
        $loadMoreBtn.show();
      }
    }

    $tabSelector.on('click', function (e) {
      e.preventDefault();
      var filter = $(this).data('filter').trim().toLowerCase().replace(/\s/g, '');
      $tabSelector.removeClass('active');
      $(this).addClass('active');
      $items.each(function () {
        var cardTxt = $(this).find(cardTxtSel).text().toLowerCase().replace(/\s/g, '');
        $(this).toggle(cardTxt === filter).toggleClass(filter, cardTxt === filter);
      });
      filterAndShowItems(filter);
    });

    $loadMoreBtn.on('click', function (e) {
      e.preventDefault();
      $filteredItems.filter(':hidden').slice(0, settings.cardsToShow).slideDown();
      if ($filteredItems.filter(':hidden').length === 0) { $loadMoreBtn.fadeOut('slow'); }
      updateButtons();
    });

    $showLessBtn.on('click', function (e) {
      e.preventDefault();
      $items.not(':lt(' + settings.cardsToShow + ')').slideUp();
      $loadMoreBtn.show();
      $showLessBtn.hide();
    });

    filterAndShowItems($currentFilter);
    return this;
  };


  $(document).ready(function () {
    var $nav = $('.fs-nav');
    var scrollAmount = 200;

    $('.nav-scroll.right').click(function () {
      $nav.animate({
        scrollLeft: "+=200"
      }, 400, checkButtons);
    });

    $('.nav-scroll.left').click(function () {
      $nav.animate({
        scrollLeft: "-=200"
      }, 400, checkButtons);
    });

    function checkButtons() {
      var scrollLeft = $nav.scrollLeft();
      var maxScroll = $nav[0].scrollWidth - $nav.outerWidth();

      $('.nav-scroll.left').toggle(scrollLeft > 0);
      $('.nav-scroll.right').toggle(scrollLeft < maxScroll);
    }

    $nav.on('scroll', checkButtons);
    checkButtons();
  });
  $(document).ready(function () {
    $('.fs-nav-inner a').on('click', function () {
      $('.fs-nav-inner a').removeClass('active-nav');
      $('.fs-nav-inner a img').each(function () {
        var oldSrc = $(this).attr('src');
        $(this).attr('src', oldSrc.replace('_active_fs', '_fs'));
      });
      $(this).addClass('active-nav');
      $(this).removeClass('dashed-border');
      var currentSrc = $('a.active-nav img').attr('src');
      $('a.active-nav img').attr('src', currentSrc.replace('_fs', '_active_fs'));

      $('.carousel').addClass('d-none');
      var target = $(this).data('target');
      $(target).removeClass('d-none');

    });

  });


  $(document).ready(function () {
    $('.filter-btn').click(function (e) {
      e.preventDefault();
      // Trigger the 'to.owl.carousel' event to go to the first item (index 0)
      // The parameters are: [position, speed, trigger_by_click]
      $('.owl-carousel').trigger('to.owl.carousel', [0, 300, true]);
    });
  });


  $(document).ready(function () {
    /*var count = $("#carouselAccounts .item").length;
    var windowWidth = $(window).width();
    if(windowWidth<=768 && windowWidth>576){
        if(count%2!=0){
            $("#carouselAccounts .owl-carousel").append('<div class="item item--dummy"></div>');
        }
    }*/
    var count = $("#carouselAccounts .item").length;
    var windowWidth = $(window).width();
    var requiredCount = 9;
    if (windowWidth <= 768 && windowWidth > 576) {
      if (count % 2 != 0) {
        $("#carouselAccounts .owl-carousel").append('<div class="item item--dummy"></div>');
      }
    } else if (windowWidth <= 576) {
    } else {
      while (count < requiredCount) {
        $("#carouselAccounts .owl-carousel").append('<div class="item item--dummy"></div>');
        count++;
      }
    }
    /*var requiredCount = 6;

    if (count < requiredCount) {
      while (count < requiredCount) {
        $(".owl-carousel").append('<div class="item item--dummy"></div>');
        count++;
      }
    }*/

    var owl = $('#carouselAccounts .owl-carousel');
    owl.owlCarousel({
      items: 3,
      loop: true,
      margin: 30,
      nav: true,
      navText: [ // Optional: use icons or custom text
        '<span class="owl-prev-icon">&#10094;</span>',
        '<span class="owl-next-icon">&#10095;</span>'
      ],
      dots: true,
      autoplay: true,
      //slideTransition: 'linear',
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2,
          slideBy: 2,
        },
        992: {
          items: 3,
          slideBy: 3,
        }
      }
    })
  })


  $(document).ready(function () {
    /*var count = $("#carouselDS .item").length;
    var windowWidth = $(window).width();
    if(windowWidth<=768 && windowWidth>576){
        if(count%2!=0){
            $("#carouselDS .owl-carousel").append('<div class="item item--dummy"></div>');
        }
    }*/
    var count = $("#carouselDS .item").length;
    var requiredCount = 6;
    var windowWidth = $(window).width();
    if (windowWidth > 576 && windowWidth <= 768) { // alert("ss");
      if (count % 2 !== 0) {
        requiredCount = count + 1;
      }
      while (count < requiredCount) {
        $("#carouselDS .owl-carousel").append('<div class="item item--dummy"></div>');
        count++;
      }
    } else if (windowWidth <= 576) {
    } else {
      while (count < requiredCount) {
        $("#carouselDS .owl-carousel").append('<div class="item item--dummy"></div>');
        count++;
      }
    }
    /*var requiredCount = 6;

    if (count < requiredCount) {
      while (count < requiredCount) {
        $("#carouselDS .owl-carousel").append('<div class="item item--dummy"></div>');
        count++;
      }
    }*/


    var owl = $('#carouselDS .owl-carousel');
    owl.owlCarousel({
      items: 3,
      loop: true,
      margin: 30,
      nav: true,
      navText: [ // Optional: use icons or custom text
        '<span class="owl-prev-icon">&#10094;</span>',
        '<span class="owl-next-icon">&#10095;</span>'
      ],
      dots: true,
      autoplay: true,
      //slideTransition: 'linear',
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2,
          slideBy: 2,
        },
        992: {
          items: 3,
          slideBy: 3,
        }
      }
    })
    //$(".owl-carousel").owlCarousel({ autoplay: true, autoplayTimeout: 6000, animateOut: 'fadeOut', lazyload: true, nav: false, items: 3 });
  })





  $(document).ready(function () {
    /*var count = $("#carouselTrade .item").length;
    var windowWidth = $(window).width();
    if(windowWidth<=768 && windowWidth>576){
        if(count%2!=0){
            $("#carouselTrade .owl-carousel").append('<div class="item item--dummy"></div>');
        }
    }*/
    var count = $("#carouselTrade .item").length;
    var windowWidth = $(window).width();
    var requiredCount = 9;
    if (windowWidth <= 768 && windowWidth > 576) {
      if (count % 2 != 0) {
        $("#carouselTrade .owl-carousel").append('<div class="item item--dummy"></div>');
      }
    } else if (windowWidth <= 576) {
    } else {
      while (count < requiredCount) {
        $("#carouselTrade .owl-carousel").append('<div class="item item--dummy"></div>');
        count++;
      }
    }
    /*var requiredCount = 6;

    if (count < requiredCount) {
      while (count < requiredCount) {
        $("#carouselTrade .owl-carousel").append('<div class="item item--dummy"></div>');
        count++;
      }
    }*/

    var owl = $('#carouselTrade .owl-carousel');
    owl.owlCarousel({
      items: 3,
      loop: true,
      margin: 30,
      nav: true,
      navText: [ // Optional: use icons or custom text
        '<span class="owl-prev-icon">&#10094;</span>',
        '<span class="owl-next-icon">&#10095;</span>'
      ],
      dots: true,
      autoplay: true,
      //slideTransition: 'linear',
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2,
          slideBy: 2,
        },
        992: {
          items: 3,
          slideBy: 3,
        }
      }
    })

  })

  $(document).ready(function () {
    /*var count = $("#carouselForex .item").length;
    var windowWidth = $(window).width();
    if(windowWidth<=768 && windowWidth>576){
        if(count%2!=0){
            $("#carouselForex .owl-carousel").append('<div class="item item--dummy"></div>');
        }
    }
    var requiredCount = 6;

    if (count < requiredCount) {
      while (count < requiredCount) {
        $("#carouselForex .owl-carousel").append('<div class="item item--dummy"></div>');
        count++;
      }
    }*/
    var count = $("#carouselForex .item").length;
    var windowWidth = $(window).width();
    var requiredCount = 9;
    if (windowWidth <= 768 && windowWidth > 576) {
      if (count % 2 != 0) {
        $("#carouselForex .owl-carousel").append('<div class="item item--dummy"></div>');
      }
    } else if (windowWidth <= 576) {
    } else {
      while (count < requiredCount) {
        $("#carouselForex .owl-carousel").append('<div class="item item--dummy"></div>');
        count++;
      }
    }

    var owl = $('#carouselForex .owl-carousel');
    owl.owlCarousel({
      items: 3,
      loop: true,
      margin: 30,
      nav: true,
      navText: [ // Optional: use icons or custom text
        '<span class="owl-prev-icon">&#10094;</span>',
        '<span class="owl-next-icon">&#10095;</span>'
      ],
      dots: true,
      autoplay: true,
      //slideTransition: 'linear',
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2,
          slideBy: 2,
        },
        992: {
          items: 3,
          slideBy: 3,
        }
      }
    })

  })


  $(document).ready(function () {
    /*var count = $("#carouselLoans .item").length;
    var windowWidth = $(window).width();
    if(windowWidth<=768 && windowWidth>576){
        if(count%2!=0){
            $("#carouselLoans .owl-carousel").append('<div class="item item--dummy"></div>');
        }
    }
    var requiredCount = 6;

    if (count < requiredCount) {
      while (count < requiredCount) {
        $("#carouselLoans .owl-carousel").append('<div class="item item--dummy"></div>');
        count++;
      }
    }*/
    var count = $("#carouselLoans .item").length;
    var windowWidth = $(window).width();
    var requiredCount = 6;
    if (windowWidth <= 768 && windowWidth > 576) {
      if (count % 2 != 0) {
        $("#carouselLoans .owl-carousel").append('<div class="item item--dummy"></div>');
      }
    } else if (windowWidth <= 576) {
    } else {
      while (count < requiredCount) {
        $("#carouselLoans .owl-carousel").append('<div class="item item--dummy"></div>');
        count++;
      }
    }

    var owl = $('#carouselLoans .owl-carousel');
    owl.owlCarousel({
      items: 3,
      loop: true,
      margin: 30,
      nav: true,
      navText: [ // Optional: use icons or custom text
        '<span class="owl-prev-icon">&#10094;</span>',
        '<span class="owl-next-icon">&#10095;</span>'
      ],
      dots: true,
      autoplay: true,
      //slideTransition: 'linear',
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2,
          slideBy: 2,
        },
        992: {
          items: 3,
          slideBy: 3,
        }
      }
    })

  })



  $(document).ready(function () {
    /*var count = $("#carouselCash .item").length;
    var windowWidth = $(window).width();
    if(windowWidth<=768 && windowWidth>576){
        if(count%2!=0){
            $("#carouselCash .owl-carousel").append('<div class="item item--dummy"></div>');
        }
    }*/
    var count = $("#carouselCash .item").length;
    var windowWidth = $(window).width();
    var requiredCount = 9;
    if (windowWidth <= 768 && windowWidth > 576) {
      if (count % 2 != 0) {
        $("#carouselCash .owl-carousel").append('<div class="item item--dummy"></div>');
      }
    } else if (windowWidth <= 576) {
    } else {
      while (count < requiredCount) {
        $("#carouselCash .owl-carousel").append('<div class="item item--dummy"></div>');
        count++;
      }
    }
    /*  var requiredCount = 8;

        if (count <= requiredCount) {
          while (count <= requiredCount) {
            $("#carouselCash .owl-carousel").append('<div class="item item--dummy"></div>');
            count++;
          }
        }
    */

    var owl = $('#carouselCash .owl-carousel');
    owl.owlCarousel({
      items: 3,
      loop: true,
      margin: 30,
      nav: true,
      navText: [ // Optional: use icons or custom text
        '<span class="owl-prev-icon">&#10094;</span>',
        '<span class="owl-next-icon">&#10095;</span>'
      ],
      dots: true,
      autoplay: true,
      //slideTransition: 'linear',
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2,
          slideBy: 2,
        },
        992: {
          items: 3,
          slideBy: 3,
        }
      }
    })

  })

  $(document).ready(function () {
    /*var count = $("#carouselSupply .item").length;
    var windowWidth = $(window).width();
    if(windowWidth<=768 && windowWidth>576){
        if(count%2!=0){
            $("#carouselSupply .owl-carousel").append('<div class="item item--dummy"></div>');
        }
    }*/
    var count = $("#carouselSupply .item").length;
    var windowWidth = $(window).width();
    var requiredCount = 6;
    if (windowWidth <= 768 && windowWidth > 576) {
      if (count % 2 != 0) {
        $("#carouselSupply .owl-carousel").append('<div class="item item--dummy"></div>');
      }
    } else if (windowWidth <= 576) {
    } else {
      while (count < requiredCount) {
        $("#carouselSupply .owl-carousel").append('<div class="item item--dummy"></div>');
        count++;
      }
    }
    /*  var requiredCount = 6;

        if (count < requiredCount) {
          while (count < requiredCount) {
            $("#carouselSupply .owl-carousel").append('<div class="item item--dummy"></div>');
            count++;
          }
        }
    */

    var owl = $('#carouselSupply .owl-carousel');
    owl.owlCarousel({
      items: 3,
      loop: true,
      margin: 30,
      nav: true,
      navText: [ // Optional: use icons or custom text
        '<span class="owl-prev-icon">&#10094;</span>',
        '<span class="owl-next-icon">&#10095;</span>'
      ],
      dots: true,
      autoplay: true,
      //slideTransition: 'linear',
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2,
          slideBy: 2,
        },
        992: {
          items: 3,
          slideBy: 3,
        }
      }
    })

  })


  $(document).ready(function () {
    var count = $("#carouselAPI .item").length;
    var windowWidth = $(window).width();
    var requiredCount = 6;
    if (windowWidth <= 768 && windowWidth > 576) {
      if (count % 2 != 0) {
        $("#carouselAPI .owl-carousel").append('<div class="item item--dummy"></div>');
      }
    } else if (windowWidth <= 576) {
    } else {
      while (count < requiredCount) {
        $("#carouselAPI .owl-carousel").append('<div class="item item--dummy"></div>');
        count++;
      }
    }
    /*  var requiredCount = 6;

        if (count < requiredCount) {
          while (count < requiredCount) {
            $("#carouselAPI .owl-carousel").append('<div class="item item--dummy"></div>');
            count++;
          }
        }
    */

    var owl = $('#carouselAPI .owl-carousel');
    owl.owlCarousel({
      items: 3,
      loop: true,
      margin: 30,
      nav: true,
      navText: [ // Optional: use icons or custom text
        '<span class="owl-prev-icon">&#10094;</span>',
        '<span class="owl-next-icon">&#10095;</span>'
      ],
      dots: true,
      autoplay: true,
      //slideTransition: 'linear',
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2,
          slideBy: 2,
        },
        992: {
          items: 3,
          slideBy: 3,
        }
      }
    })

  })


  $(document).ready(function () {
    var count = $("#carouselCBank .item").length;
    var requiredCount = 6;
    var windowWidth = $(window).width();
    if (windowWidth > 576 && windowWidth <= 768) { // alert("ss");
      if (count % 2 !== 0) {
        requiredCount = count + 1;
      }
    }
    if (windowWidth <= 576) {
    } else {
      while (count < requiredCount) {
        $("#carouselCBank .owl-carousel").append('<div class="item item--dummy"></div>');
        count++;
      }
    }


    /*if (count < requiredCount) { alert("ss");
        if(windowWidth<=768 && windowWidth>576){ alert("ss");
            if(count%2!=0){
                while (count < requiredCount) {
        
                    $("#carouselCBank .owl-carousel").append('<div class="item item--dummy"></div>');
                    count++;
                }
            }
        }else{ alert("ss1");
            if(windowWidth<=576){
                
            }else{
                if (count < requiredCount) {
                  while (count < requiredCount) {
                    $("#carouselCBank .owl-carousel").append('<div class="item item--dummy"></div>');
                    count++;
                  }
                }
            }
        }
    }*/


    /*if(windowWidth<=768 && windowWidth>=576){
        if(count%2!=0){
            $("#carouselCBank .owl-carousel").append('<div class="item item--dummy"></div>');
        }
    }else{
        

        
    }*/

    var owl = $('#carouselCBank .owl-carousel');
    owl.owlCarousel({
      items: 3,
      loop: true,
      margin: 30,
      nav: true,
      navText: [ // Optional: use icons or custom text
        '<span class="owl-prev-icon">&#10094;</span>',
        '<span class="owl-next-icon">&#10095;</span>'
      ],
      dots: true,
      autoplay: true,
      //slideTransition: 'linear',
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2,
          slideBy: 2,
        },
        992: {
          items: 3,
          slideBy: 3,
        }
      }
    })

  })


  $('.filter-btn').click(function (e) {
    e.preventDefault();

    // Hide all containers
    $('.carousel-container').hide();

    // Show target container
    var target = $(this).data('target');
    $(target).show();
  });

  $(document).ready(function () {
    // Hide all content sections on page load (if not hidden by CSS)
    // $('.content-section').hide();

    // Add a click event listener to all elements with the class 'toggle-btn'
    $('.toggle-btn').on('click', function (e) {
      e.preventDefault(); // Prevent default link behavior if using anchor tags

      var targetDivId = $(this).data('target'); // Get the target div ID from the data attribute

      // Hide all content sections first
      $('.content-section').hide(); // or use .slideUp() or .fadeOut()

      // Show only the specific target div
      $('#' + targetDivId).show(); // or use .slideDown() or .fadeIn()
    });
  });

  $(document).ready(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('.Scroll_Top').fadeIn(100);
      } else {
        $('.Scroll_Top').fadeOut(100);
      }
    });
    $('.Scroll_Top').click(function (e) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: 0 }, 100);
      return false;
    });
  });

}(jQuery, Drupal));