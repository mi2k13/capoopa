$(document).ready(function(){
    loadData('challenge/', 'challenges', true);
    toggleMenu();
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

function showItem(id) {
  loadData('challenge/' + id, 'challenge-detail', false);
}

function loadData(path, template, isList) {
  $.ajax({
      url: 'http://ssh.alwaysdata.com:11390/api/' + path,
      contentType: 'application/json',
      dataType: 'jsonp',
      cache: 'false',
      processData: 'false',
      type: "GET",
      success: function(data, textStatus, jqXHR) {
        (isList) ? loadTemplate(template, data.objects) : loadTemplate(template, data);
      }
    });
}

function loadTemplate(templateName, templateInput) {
    var source;
    var template;
    var path = 'tpl/' + templateName + '.html';
    $.ajax({
        url: path,
        cache: true,
        success: function (data) {
            source = data;
            template = Handlebars.compile(source);
            $('#' + templateName).html(template({tpl: templateInput}));
        }
    });
};