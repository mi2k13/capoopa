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

    console.log(data);

    postData('user/', data);

    /*$.ajax({
      type: "POST",
      url: 'http://localhost:8000/api/core/user/',
      contentType: 'application/json',
      data: data,
      success: function() {
        console.log("envoyé!");
      },
      error: function() {
        console.log("pas envoyé...");
      },
      dataType: 'json'
    });*/

    return false;
  });

});

Handlebars.registerHelper('nbAnswers', function(nb1, nb2) {
  var sum = parseInt(nb1, 10) + parseInt(nb2, 10);
  if (!isNaN(sum))
    return sum;
  else
    return '???';
});