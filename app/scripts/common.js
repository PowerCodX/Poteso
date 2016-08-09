/**
 * Created by pogor on 21-Jul-16.
 */
$(document).ready(function () {
  const $preloader = $('.preloader-wrapper');
  const questionDiv = $('.question');

  // Preloader
  $('#preloader').fadeOut();
  $preloader.removeClass('active');

  // Initialize collapse button
  $(".button-collapse").sideNav();
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  //$('.collapsible').collapsible();

  $('.submit-button').click(function () {

    var body = $("html, body");
    body.stop().animate({scrollTop: 0}, '300', 'swing').queue(function () {
      // Shift slides after 'scrollTop' animation finished
      shiftSlides();
      $(this).dequeue();
    });

    function shiftSlides() {
      //$('.current-question').text('8');
      var maincontainer__inner = $('.main-container__inner');
      // Add class 'shift-slides' to current div for apply 'translate3d'
      maincontainer__inner.addClass('shift-slides');
      // OnTransitionEnd Event
      maincontainer__inner.on(
        "transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd",
        function () {
          $(this).delay(1000).queue(function () {  // Wait for 1 second.
            // Insert new empty div with class 'question' after last div element with same class
            $('<div class="question"></div>').insertAfter(questionDiv.last());
            // Delete first div element (slide that contain answered question)
            questionDiv.first().remove();
            // Remove class 'shift-slide' from current div for reset 'translate3d'
            $(this).removeClass("shift-slides");
          });
        }
      );
    }
  });

  function toggleFullscreen(elem) {
    elem = elem || document.documentElement;
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
      !document.webkitFullscreenElement && !document.msFullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  $('.toggle-fullscreen').click(function () {
    toggleFullscreen();
  });

  $('.md-editor').each(function () {
    var simplemde = new SimpleMDE({
      element: this,
      placeholder: "Introduceți informația aici...",
      status: false
    });
  });

  $('#add-question').click(function () {
    $(this).velocity({translateY: '-200%'}, {duration: 225, queue: false, easing: 'easeInCubic'});
  });
});
