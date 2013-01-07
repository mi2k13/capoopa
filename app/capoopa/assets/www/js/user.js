$(document).ready(function() {
  Handlebars.registerHelper('sum', function(nb1, nb2) {
    var sum = parseInt(nb1, 10) + parseInt(nb2, 10);
    if (!isNaN(sum))
      return sum;
    else
      return '???';
  });
});