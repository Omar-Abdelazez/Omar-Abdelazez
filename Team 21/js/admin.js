
$(document).ready(function(){
  "use strict";

  $('.nav-list li a').click(function() {
    $('.nav-list li').addClass('active').siblings().removeClass('active');
  });


})



