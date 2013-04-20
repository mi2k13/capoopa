//var fullPath = 'http://ssh.alwaysdata.com:11390/api/core/';
fullPath  = 'http://localhost:8000/api/core/',
userID    = 1;

$(document).ready(function(){

  var options,
      type = $('.page').data('type');

  if (type) {
    switch (type) {
      case 'challenge' :
        options = {
          path: type + '/getChallenges/?userID=' + userID,
          template: type + 's',
          opt: 1
        };
        break;
      case 'answer' :
        options = {
          path: type + '/?userID=' + userID,
          template: type + 's',
          opt: 2
        };
        break;
      case 'user' :
        options = {
          path: type + '/' + userID,
          template: type,
          opt: 0
        };
        break;
      case 'group' :
        options = {
          path: 'group/?userID=' + userID,
          template: type + 's',
          opt: 1
        };
        break;
      case 'friend' :
        options = {
          path: 'user/' + userID,
          template: type + 's',
          opt: 0
        };
        break;
    }
  getData(options, getPageData);
  }
  
});


function postData(path, data) {
  var result;
  $.ajax({
    type: "POST",
    url: fullPath + path,
    contentType: 'application/json',
    data: data,
    async: false,
    success: function(data) {
      console.log("envoyé!");
      result = data;
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("pas envoyé...");
      console.log(errorThrown);
    },
    dataType: 'json'
  });
  return result;
}

function getData(options, callback) {
  $.ajax({
    url: fullPath + options.path,
    contentType: 'application/json',
    dataType: 'jsonp',
    cache: false,
    processData: false,
    async: false,
    type: 'GET',
    success: function(data, textStatus, jqXHR) {
      if (callback)
        callback(options, data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("pas envoyé...");
      console.log(errorThrown);
    }
  });
}


// type : 0=none ; 1=objects ; 2=answers
function getPageData(options, data) {
  if (options.opt == 0)
    loadTemplate(options.template, data);

  else if (options.opt == 1)
    loadTemplate(options.template, filterNull(data.objects));

  else if (options.opt == 2) {
    var pending = sortData(data.objects, 'pending');
    var over = sortData(data.objects, 'over').concat(sortData(data.objects, 'completed')).concat(sortData(data.objects, 'failed'));
    loadTemplate(options.template + '-pending', pending);
    loadTemplate(options.template + '-over', over);
  }
}

function loadTemplate(templateName, templateInput) {
  var source;
  var template;
  var path = 'tpl/' + templateName + '.html';
  $.ajax({
    url: path,
    cache: false,
    success: function (data) {
      source = data;
      template = Handlebars.compile(source);

      if (templateName == 'user') {
        $('#' + templateName).html(template({
          tpl: templateInput
        }));
      }

      else {
        $('#' + templateName).html(template({
          tpl: templateInput,
          size: templateInput.length
        }));
      }
    }
  });
};


function toggleMenu() {
  $('.toggle').click(function() {
      if ($(this).hasClass('toggle-top')) {
        $(this).removeClass('toggle-top');
        $(this).addClass('toggle-bottom');
      }
      else if ($(this).addClass('toggle-bottom')) {
        $(this).removeClass('toggle-bottom');
        $(this).addClass('toggle-top');
      }
      $(this).next('.toggle-content').slideToggle('slow');
    });
}

function hideItem() {
  $('.slide-container').addClass('slide-right');
  $('.slide-container').removeClass('slide-left');
}

function sortData(data, type) {
  var result = new Array();
  $.each( data, function( key, item ) {
    if (item.status == type)
      result.push(item);
  });
  return result;
}

function filterNull(data) {
  var arr = new Array();
  $.each( data, function( key, item ) {
    if (item)
      arr.push(item);
  });
  return arr;
}

function getNbAnswers(data) {
  var completed = 0,
      failed    = 0;

  $.each(data.answers, function( key, value ) {
    if (value.status == 'completed')
      completed++;
    else if (value.status == 'failed')
      failed++;
  });
  return [completed, failed];
}

function getUserID() {
  return localStorage.getItem('user');
}