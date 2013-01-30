$(document).ready(function(){
  $('.inner-slide').hide();
});

/*  Handlebars.registerHelper('isPending', function(status) {
    if (status == "pending")
      return true;
    else
      return false;
  }
  
  Handlebars.registerHelper('isOver', function(status) {
    if (status == "over" || status == 'failed' || status == 'completed')
      return true
    else
      return false;
  }
*/
function showItem(id, type) {
  loadData(type + '/' + id, type + '-detail', false);
  $('.slide').hide('slide', { direction: 'left' }, 1000);
  $('.inner-slide').show('slide', { direction: 'right' }, 1000);
}

function hideItem() {
  $('.inner-slide').hide('slide', { direction: 'right' }, 1000);
  $('.slide').show('slide', { direction: 'left' }, 1000);
}