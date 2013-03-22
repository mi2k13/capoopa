$(document).ready(function(){

  $('#propose-challenge').submit( function(){
    var title = $('input[name=title]').val();
    var description = $('textarea[name=description]').val();
    var category = $('select[name=category]').val();
    var type = $('input[name=type]').val();


    if (title && description && category && type){
      $('.error').text('');

      var data = JSON.stringify({
        "title": title,
        "description": description,
        "author": '/api/core/user/1/',
        "beginning": 1300000,
        "end": 150000,
        "category": category,
        "type": type
      });

      postData('challenge/', data);
    }

    else
      $('.error').text('Oops : Vous n\'avez pas indiqué toutes les informations nécessaires');

    return false;
  });

});

function showItem(id, type) {
  loadData(type + '/' + id, type + '-detail', 0);
  $('.slide-container').addClass('slide-left');
  $('.slide-container').removeClass('slide-right');
  $("html, body").animate({ scrollTop: 0 }, 0);
}


Handlebars.registerHelper('time', function(timestamp) {
  var dt = new Date(timestamp * 1000);
  var day = dt.getDate();
  var month = dt.getMonth() + 1;
  var year = dt.getFullYear();
  var hours = dt.getHours();
  var minutes = dt.getMinutes();

  // the above dt.get...() functions return a single digit
  // so I prepend the zero here when needed
  if (hours < 10) 
   hours = '0' + hours;

  if (minutes < 10) 
   minutes = '0' + minutes;

  return day + '/' + month + '/' + year + ' ' + hours + ":" + minutes;
});