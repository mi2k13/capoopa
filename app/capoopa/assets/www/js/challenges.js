$(document).ready(function(){
  $('.inner-slide').hide();
  toggleMenu();
  /*type = $('.page').data('type');
  loadData(type + '/', type + 's', true);*/
});

function showItem(id, type) {
  loadData(type + '/' + id, type + '-detail', false);
  $('.slide').hide('slide', { direction: 'left' }, 1000);
  $('.inner-slide').show('slide', { direction: 'right' }, 1000);
}

function hideItem() {
  $('.inner-slide').hide('slide', { direction: 'right' }, 1000);
  $('.slide').show('slide', { direction: 'left' }, 1000);
}