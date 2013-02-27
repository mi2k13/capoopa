$(document).ready(function(){
});


function getData(path) {
  $.ajax({
    url: 'http://localhost:8000/api/core/' + path,
    //url: 'http://ssh.alwaysdata.com:11390/api/' + path,
    contentType: 'application/json',
    dataType: 'jsonp',
    cache: false,
    processData: false,
    type: 'GET',
    success: function(data, textStatus, jqXHR) {
      console.log(data);
      return data;
    }
  });
}

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
  $('.slide-container').addClass('slide-left');
  $('.slide-container').removeClass('slide-right');
  /*$('.slide').hide('slide', { direction: 'left' }, 1000);
  $('.inner-slide').show('slide', { direction: 'right' }, 1000);*/
}

function hideItem() {
  $('.slide-container').addClass('slide-right');
  $('.slide-container').removeClass('slide-left');
  /*$('.inner-slide').hide('slide', { direction: 'right' }, 1000);
  $('.slide').show('slide', { direction: 'left' }, 1000);*/
}

  Handlebars.registerHelper('titre', function(val) {
    if (val == 1)
      return "La vache qui tue";
    else
      return "Chocapic";
  });