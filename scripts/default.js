$(document).ready(function() {
    $('.nav-bar').on('click', function() {
      $('.space').toggleClass('hidden-space');
      $('nav').toggleClass('hidden-nav');
      $('.nav-bar').toggleClass('nav-bar-white');
    });
});

if (window.matchMedia('(max-width: 600px)').matches) {
  $('.space').addClass('hidden-space');
  $('nav').addClass('hidden-nav');
  $('.nav-bar').addClass('nav-bar-white');
  $('header').addClass('header-onclick');
};

$(window).bind("load", function(){
  if(location.href == "https://cachalot792.github.io/") {
    $('nav li:nth-of-type(1) a').addClass('nav-highlight');
  }else if(document.URL.match("/document/profile/")){
    $('nav li:nth-of-type(2) a').addClass('nav-highlight');
  }else if(document.URL.match("/document/log/")){
    $('nav li:nth-of-type(3) a').addClass('nav-highlight');
  }else if(document.URL.match("/documents/economics/daalgorithm/")){
    $('nav li:nth-of-type(4) a').addClass('nav-highlight');
  }else if(document.URL.match("/documents/economics/ttc/")){
    $('nav li:nth-of-type(5) a').addClass('nav-highlight');
  }
});