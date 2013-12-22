//fullPath = 'http://ssh.alwaysdata.com:11390/api/core/';
fullPath  = 'http://localhost:8000/api/core/',

userID = localStorage.getItem('user');

$(document).ready(function(){

  var options,
      type = $('.page').data('type');


  $('.open-right').live("click", function(){
    if (type == 'answer') type = 'challenge';
    showItem($(this).data("item"), type);
  });

  $('.back').live("click", function(){
    hideItem();
  });

  $('.list-open .item').live("click", function(){
    $(this).toggleClass('active');
  })

  $('.toggle').live("click", function(e) {
    toggleContent(e);
  });

  

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
      case 'rate' :
        options = {
          path: 'answer/getRandomAnswer/?userID=' + userID,
          template: 'rate',
          opt: 0
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
          path: 'group/?owner=' + userID,
          template: type + 's',
          opt: 1
        };
        options2 = {
          path: 'group/getUserChallenges/?userID=' + userID,
          template: 'my-' + type + 's',
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
  if (type == 'group')
    getData(options2, getPageData);
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
      console.log(data);
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

      if (data && typeof(data.success) != 'undefined' && !data.success)
        return;

      else if (callback)
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

  else if (options.opt == 1) {
    if (data.objects)
      loadTemplate(options.template, filterNull(data.objects));
  }

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


function toggleContent(e) {
  var elt = $(e.target);
  if (e.currentTarget.nodeName == 'H1') {
    elt.toggleClass('toggle-top');
    elt.toggleClass('toggle-bottom');
  }
  elt.next('.toggle-content').slideToggle('slow');
}

function showItem(id, type) {
  getData({
      path: type + '/' + id,
      template: type + '-detail',
      opt: 0
  }, getPageData);


  $('.slide-container').addClass('slide-left');
  $('.slide-container').removeClass('slide-right');
  $("html, body").animate({ scrollTop: 0 }, 0);
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