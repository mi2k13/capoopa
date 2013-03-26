$(document).ready(function(){
  type = $('.page').data('type');

  if (type == 'challenge')    loadData(type + '/', type + 's', 1);
  else if (type == 'answer')  loadData('user/1', type + 's', 2);
  else if (type == 'rate')    loadData('answer/1', type, 0);
  else                        loadData(type + '/1', type, 0);
});


function postData(path, data) {
  var fullPath = 'http://localhost:8000/api/core/' + path;
  //var fullPath = 'http://ssh.alwaysdata.com:11390/api/core/' + path;

  $.ajax({
    type: "POST",
    url: fullPath,
    contentType: 'application/json',
    data: data,
    success: function() {
      console.log("envoyé!");
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("pas envoyé...");
      console.log(errorThrown);
    },
    dataType: 'json'
  });
}

// type : 0=none ; 1=objects ; 2=answers
function loadData(path, template, type) {
  $.ajax({
    url: 'http://localhost:8000/api/core/' + path,
    //url: 'http://ssh.alwaysdata.com:11390/api/core/' + path,

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
        loadTemplate(template, data.objects);

      else if (type == 2) {
        var pending = sortData(data.answers, 'pending');
        var over = sortData(data.answers, 'over').concat(sortData(data.answers, 'completed')).concat(sortData(data.answers, 'failed'));
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

      if(templateName == 'user') {
        var answ =getNbAnswers(templateInput);
        templateInput.nbCompleted = answ[0];
        templateInput.nbFailed = answ[1];

        $('#' + templateName).html(template({
          tpl: templateInput,
          size: templateInput.length,
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