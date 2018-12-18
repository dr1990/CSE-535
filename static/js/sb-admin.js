(function ($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle").on('click', function (e) {
    e.preventDefault();
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function (e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function (event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
  });

  // Collapsible image change
  $("#collapseClick").on('click', function () {
    var ico = document.getElementById("collapseImage");
    if (ico.className == 'fa fa-chevron-circle-left') {
      ico.className = 'fa fa-chevron-circle-down';
    } else if (ico.className == 'fa fa-chevron-circle-down') {
      ico.className = 'fa fa-chevron-circle-left';
    }
  });

  $("#resultCollapseClick").on('click', function () {
    var ico = document.getElementById("resultCollapseImage");
    if (ico.className == 'fa fa-chevron-circle-left') {
      ico.className = 'fa fa-chevron-circle-down';
    } else if (ico.className == 'fa fa-chevron-circle-down') {
      ico.className = 'fa fa-chevron-circle-left';
    }
  });

  $("#analyticsCollapseButton").on('click', function () {
    var ico = document.getElementById("analyticsCollapseImage");
    if (ico.className == 'fa fa-chevron-circle-left') {
      ico.className = 'fa fa-chevron-circle-down';
    } else if (ico.className == 'fa fa-chevron-circle-down') {
      ico.className = 'fa fa-chevron-circle-left';
    }
  });

  $("#sameNameInJS").on('click', function () {
    var ico = document.getElementById("sameImageNameInJS");
    if (ico.className == 'fa fa-chevron-circle-left') {
      ico.className = 'fa fa-chevron-circle-down';
    } else if (ico.className == 'fa fa-chevron-circle-down') {
      ico.className = 'fa fa-chevron-circle-left';
    }
  });

  // Multiselect dropdown
  $('select').selectpicker();



  $(function () {
    $('input[name="datetimes"]').daterangepicker({
      timePicker: false,
      startDate: moment().startOf('hour'),
      endDate: moment().startOf('hour').add(32, 'hour'),
      locale: {
        format: 'MM/DD/YYYY'
      }
    });
  });

  $(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

})(jQuery); // End of use strict
