$(document).ready(function(){
  $.ajax({
      url: 'http://localhost:8000/api/challenge/',
      contentType: 'application/json',
      dataType: 'jsonp',
      cache: 'false',
      processData: 'false',
      type: "GET",
      success: function(data, textStatus, jqXHR) {
        /*var source   = $("#challenges-tpl").html();
        var template = Handlebars.compile(source);
        $("#content-placeholder").html(template(data.objects[0]));*/
        loadTemplate('challenges', data.objects)
      }
    });


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
      $(this).next('.toggleContent').slideToggle('slow');
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