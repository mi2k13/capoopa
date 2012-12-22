$(document).ready(function(){
  toggleMenu();
  $('li').click( function(){
    showItem($(this).data("item"));
  })
  $('.back').click( function(){
    hideItem();
  });
});