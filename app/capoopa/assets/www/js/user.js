$(document).ready(function() {

  $('#signin').submit(function() {
    var email = $('input[name=email]').val();
    var password = $('input[name=password]').val();

    if (email == 'anne@kontestapp.com' && password == 'pass')
      window.location.replace('challenges.html');
    else
      $('.error').text('Oops : L\'adresse email et/ou le mot de passe que vous avez indiqués sont incorrects.');

    return false;
  });


  $('#signup').submit(function() {
    var email = $('input[name=email]').val();
    var password = $('input[name=password]').val();
    var password2 = $('input[name=password2]').val();

    if (password !== password2) {
     console.log('error password');
      return false; 
    }

    //vérifier si compte existe déjà


    var data = JSON.stringify({
      "email": email,
      "avatar": password,

    });

    postData('user/', data);

    return false;
  });

});

function editItem(id, type) {
  loadData(type + '/' + id, 'edit-' + type, 0);
  $('.slide-container').addClass('slide-left');
  $('.slide-container').removeClass('slide-right');
  $("html, body").animate({ scrollTop: 0 }, 0);
}

Handlebars.registerHelper('nbAnswers', function(nb1, nb2) {
  var sum = parseInt(nb1, 10) + parseInt(nb2, 10);
  if (!isNaN(sum))
    return sum;
  else
    return '???';
});