$(document).ready(function() {
    $('.nav-bar').on('click', function() {
      $('.nav_header').toggleClass('hidden-nav_header');
      $('.space').toggleClass('hidden-space');
      $('nav').toggleClass('hidden-nav');
      $('.nav-bar').toggleClass('nav-bar-white');
    });
});

if (window.matchMedia('(max-width: 800px)').matches) {
  $('.nav_header').addClass('hidden-nav_header');
  $('.space').addClass('hidden-space');
  $('nav').addClass('hidden-nav');
  $('.nav-bar').addClass('nav-bar-white');
  $('header').addClass('header-onclick');
};