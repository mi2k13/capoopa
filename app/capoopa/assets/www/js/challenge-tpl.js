$(document).ready(function(){
  toggleMenu();
  $('li').click( function(){
    showItem($(this).data('item'), 'challenge');
  })
  $('.back').click( function(){
    hideItem();
  });
});