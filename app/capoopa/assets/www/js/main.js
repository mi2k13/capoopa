$(document).ready(function(){
  $.ajax({
      url: 'http://localhost:8000/api/challenge/',
      contentType: 'application/json',
      dataType: 'jsonp',
      cache: 'false',
      processData: 'false',
      type: "GET",
      success: function(data, textStatus, jqXHR) {
        listChallenges(data.objects, '#current-challenges');
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

function listChallenges(data, list) {
  $.each(data, function(key, item) {
    liItem = document.createElement('li');
    $(liItem).addClass('open-right').appendTo(list);
    link = document.createElement('a');
    $(link).attr('href', '#').appendTo(liItem);
    $("<img/>").addClass('thumb').attr('src', 'img/category/' + item.category + '.png').appendTo(link);
    $("<h3/>").addClass('ui-li-heading').text(item.title).appendTo(link);
    $("<p/>").addClass('ui-li-desc').text(item.category).appendTo(link);
  });
}