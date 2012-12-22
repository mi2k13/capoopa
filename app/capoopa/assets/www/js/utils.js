$(document).ready(function(){
    $('li').click(function(){
      showItem($(this).data("item"));
    })
});