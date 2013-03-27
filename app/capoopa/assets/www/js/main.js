//var fullPath = 'http://ssh.alwaysdata.com:11390/api/core/';
  var fullPath = 'http://localhost:8000/api/core/';

$(document).ready(function(){
  var userID = getUserID();

  if (userID) {
    var type = $('.page').data('type');

    if (type == 'challenge')    loadData(type + '/getChallenges/?userID=' + userID , type + 's', 1);
    else if (type == 'answer')  loadData('answer/?userID=' + userID, 'answers', 2);
    else if (type == 'rate')    loadData('answer/' + userID, type, 0);
    else if (type == 'friends') loadData('user/' + userID, type, 0);
    else if (type == 'group')   loadData('group/?userID=' + userID, type + 's', 1);
    else                        loadData(type + '/' + userID, type, 0);
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

function getData(path) {
  var result;
  $.ajax({
    type: "GET",
    url: fullPath + path,
    contentType: 'application/json',
    async: false,
    success: function(data) {
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

// type : 0=none ; 1=objects ; 2=answers
function loadData(path, template, type) {
  $.ajax({
    url: fullPath + path,
    contentType: 'application/json',
    dataType: 'jsonp',
    cache: false,
    processData: false,
    async: false,
    type: 'GET',
    success: function(data, textStatus, jqXHR) {
      if (type == 0)
        loadTemplate(template, data);

      else if (type == 1)
        loadTemplate(template, filterNull(data.objects));

      else if (type == 2) {
        var pending = sortData(data.objects, 'pending');
        var over = sortData(data.objects, 'over').concat(sortData(data.objects, 'completed')).concat(sortData(data.objects, 'failed'));
        loadTemplate(template+'-pending', pending);
        loadTemplate(template+'-over', over);
      }
    }
  });
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