$(document).ready(function(){
    $.getJSON("js/storage/challenges.json", function(data){
          $.each(data, function(key, item) {
            d = document.createElement('li');
            $(d).attr('class','ui-li ui-li-static ui-btn-up-c').appendTo('#challenges');
            $("<img/>").addClass('ul-li-thumb').attr('src', 'img/category/' + item.category + '.png').appendTo(d);
            $("<h3/>").addClass('ui-li-heading').text(item.title).appendTo(d);
            $("<p/>").addClass('ui-li-desc').text(item.category).appendTo(d);
          });
        });
  });