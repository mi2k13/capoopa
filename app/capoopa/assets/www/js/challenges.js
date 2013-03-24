$(document).ready(function(){

  $('#propose-challenge').submit( function(){
    var title = $('input[name=title]').val();
    var description = $('textarea[name=description]').val();
    var category = $('select[name=category]').val() || "divers";
    var type = $('select[name=type]').val();
    var debut = $('input[name=beginning]').val();
    var duree = $('input[name=duration]').val();
    var dureeType = $('select[name=duration-type]').val();

    var debutTab = debut.split('/');
    debut = debutTab[2] + '-' + debutTab[1] + '-' + debutTab[0];

    var dateBeginning = new Date(debut + ' 00:00:00');
    debut = dateBeginning.getTime() / 1000;

    var duration = timeToTimestamp(duree, dureeType);

    if (title && description && category && type && debut && duree) {
      if(!isNaN(parseInt(duree * 1))) { // is int ?
        $('.error').text('');


        var data = JSON.stringify({
          "title": title,
          "description": description,
          "author": '/api/core/user/1/',
          "beginning": debut,
          "duration": duration,
          "category": category,
          "type": type,
          "nbAbuse": 0,
          "nbAnswer": 0
        });

        postData('challenge/', data);
        $('.success').text('Votre proposition de challenge a bien été ajouté');
      }
      else
        $('.error').text('Vous devez entrer un chiffre entier pour la durée.');
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


function timestampToDate(timestamp, full) {
  var dt = new Date(timestamp * 1000);
  var day = dt.getDate();
  var month = dt.getMonth() + 1;
  var year = dt.getFullYear();

  if(day < 10)    day   = '0' + day;
  if(month < 10)  month = '0' + month;

  if(full) {
    var hours = dt.getHours();
    var minutes = dt.getMinutes();

    if (hours < 10)   hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;

    return day + '/' + month + '/' + year + ' ' + hours + ":" + minutes;
  }

  return day + '/' + month + '/' + year;
}

function timestampToTime(ms) {
  var min = 60;
  var hours = min * 60;
  var days = hours * 24;

  if(ms < hours)
    return Math.round(ms/min) + ' minutes';
  else if (ms < days)
    return Math.round(ms/hours) + ' heures';
  else
    return Math.round(ms/days) + ' jours';
}

function timeToTimestamp(time, type) {
  if(type == "minutes")
    return time * 60;
  else if (type == "hours")
    return time * 60 * 60;
  else if (type == "days")
    return time * 60 * 60 * 24;
}


Handlebars.registerHelper('date', function(timestamp) {
  return timestampToDate(timestamp, true);
});

Handlebars.registerHelper('time', function(ms) {
  return timestampToTime(ms);
});

Handlebars.registerHelper('isPasted', function(start, duration) {
  var current = Math.round(((new Date()).getTime()-Date.UTC(1970,0,1))/1000);
  var end = start + duration;

  if (start - current < 0 && end - current > 0)
    return 'open-right';
  else if (end - current < 0)
      return 'over';

  return '';
});

Handlebars.registerHelper('timeLeft', function(start, duration) {
  var current = Math.round(((new Date()).getTime()-Date.UTC(1970,0,1))/1000);
  var end = start + duration;
  var left = end - current;
  return timestampToTime(left);
});

Handlebars.registerHelper('getType', function(type) {
  if(type == "first")
    return "premier à le faire";
  else if(type == "time")
    return "temps limité";
});