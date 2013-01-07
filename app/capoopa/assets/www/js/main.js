$(document).ready(function(){
  type = $('.page').data('type');
  if (type == 'challenge')
    loadData(type + '/', type + 's', true);
  else
    loadData(type + '/1', type, false);
});

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

function loadData(path, template, isList) {
  $.ajax({
    url: 'http://ssh.alwaysdata.com:11390/api/' + path,
    contentType: 'application/json',
    dataType: 'jsonp',
    cache: false,
    processData: false,
    type: 'GET',
    success: function(data, textStatus, jqXHR) {
      (isList) ? loadTemplate(template, data.objects) : loadTemplate(template, data);
    }
  });
}

function loadTemplate(templateName, templateInput) {
  console.log(templateInput);
  var source;
  var template;
  var path = 'tpl/' + templateName + '.html';
  $.ajax({
    url: path,
    cache: false,
    success: function (data) {
      source = data;
      template = Handlebars.compile(source);
      $('#' + templateName).html(template({tpl: templateInput}));
    }
  });
};