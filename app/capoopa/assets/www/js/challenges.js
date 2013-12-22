function listGroups(userID) {
  getData({path:'user/getGroups/?userID=' + userID}, function(options, data){
    var groups = data.objects;
    if(groups) {
      for (var i = 0, length = groups.length ; i < length ; ++i ) {
        var title = groups[i].title,
            groupID = groups[i].id
        $('.groups').append('<label for="group' + groupID + '" class="visible"><input type="radio" id="group' + groupID + '" value="' + groupID + '" name="group"/> ' + title + '</label><br />');
      }
    }
    else
      $('.groups').text('Vous n\'avez pas encore d \'amis');
  });
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
  return timestampToDate(timestamp, false);
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
      return 'closed';

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