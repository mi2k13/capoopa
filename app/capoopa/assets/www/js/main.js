$(document).ready(function(){
    loadData('http://localhost:8000/api/challenge/', 'challenges');
    toggleMenu();

    $('.list li').click(function() {
      loadData('http://localhost:8000/api/challenge/1', 'challenge-detail');
    });

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
      $(this).next('.toggleContent').slideToggle('slow');
    });
}

function loadData(path, template) {
  $.ajax({
      url: path,
      contentType: 'application/json',
      dataType: 'jsonp',
      cache: 'false',
      processData: 'false',
      type: "GET",
      success: function(data, textStatus, jqXHR) {
        loadTemplate(template, data.objects)
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