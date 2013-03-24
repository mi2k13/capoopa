$(document).ready(function(){

  $('#propose-challenge').submit( function(){
    var title = $('input[name=title]').val();
    var description = $('textarea[name=description]').val();
    var category = $('select[name=category]').val() || "divers";
    var type = $('input[name=type]').val();
    var debut = $('input[name=beginning]').val();
    var duree = $('input[name=duration]').val();
    var dureeType = $('select[name=duree-type]').val();

    var dateBeginning = new Date(debut + ' 00:00:00');
    debut = dateBeginning.getTime() / 1000;

    if (title && description && category && type && debut && duree){
      $('.error').text('');

      var data = JSON.stringify({
        "title": title,
        "description": description,
        "author": '/api/core/user/1/',
        "beginning": debut,
        "duration": 150000,
        "category": category,
        "type": type
      });

      //postData('challenge/', data);
      $('.error').text('Votre proposition de challenge a bien été ajouté');
      return false;
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


Handlebars.registerHelper('date', function(timestamp) {
  return timestampToDate(timestamp);
});

Handlebars.registerHelper('time', function(ms) {
  return timestampToTime(ms);
});

Handlebars.registerHelper('isPasted', function(timestamp) {
  return isPasted(timestamp);
});