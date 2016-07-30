/**
 * Created by pogor on 21-Jul-16.
 */
$(document).ready(function () {

  setTimeout(function () {
    $('#preloader').fadeOut();
    $('.preloader-wrapper').removeClass('active');
  }, 1000);

  // Initialize collapse button
  $(".button-collapse").sideNav();
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  //$('.collapsible').collapsible();

  $('button').click(function () {

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
            var questionDiv = $('.question');
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
  })
});
