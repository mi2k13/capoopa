$(document).ready(function() {
  userID = 1;

  $('#signin').submit(function() {
    var email = $('input[name=email]').val();
    var password = $('input[name=password]').val();

    if (email && password) {
      login(email, password);
      if (localStorage.getItem('user'))
        window.location.replace('challenges.html');
      else
        $('.error').text('Oops : L\'adresse email et/ou le mot de passe que vous avez indiqués sont incorrects.');
    }
    return false;
  });


  $('#signup').submit(function() {
    var email = $('input[name=email]').val();
    var password = $('input[name=password]').val();
    var password2 = $('input[name=password2]').val();

    if (password !== password2) {
      $('.error').text('Les deux mots de passe doivent être identiques');
      return false; 
    }

    //vérifier si compte existe déjà
    if(email && password) {
      $('.error').text('');
      var data = JSON.stringify({
        "email": email,
        "password": password,
        "description": '',
        "avatar": '',
        "nickname": '',
        "nbRate": 0
      });

      postData('user/', data);
      $('.success').html("YEAH ! Votre compte a bien été créé, vous pouvez aller relever des défis dès maintenant ! <a href='index.html'>Me connecter</a>");
    }
    else
      $('.error').text('Attention, vous n\'avez pas rempli tous les champs !');
    return false;
  });


  $('#edit-user').submit( function(){
    var nickname = $('input[name=nickname]').val();
    var description = $('textarea[name=description]').val();
    var password = $('input[name=password]').val();
    var password2 = $('input[name=verifPass]').val();

    var textSucces = 'Vos informations ont bien été éditées';

    $('.error').text('');
    $('.success').text('');

    if(password || password2) {
      if(password && !password2)
        $('.error').text('Oops: il faut remplir les deux passwords');
      else if(password != password2)
        $('.error').text('Oops: les passwords sont différents');
      else {
        var data = JSON.stringify({
          "id": userID,
          "nickname": nickname,
          "description": description,
          "password": password
        });

        $('.success').text(textSucces);
        postData('user/', data);
      }
      return false;
    }

    var data = JSON.stringify({
      "id": userID,
      "nickname": nickname,
      "description": description,
    });

    $('.success').text(textSucces);
    postData('user/', data);

    //return false;
  });

  $("#search").submit(function() {
    $('.success').text('');
    var data = JSON.stringify({"search": $('input[name=search]').val()});

    var result = postData('user/search/', data).objects,
        resultEl = $('.result');

    if(result.length) {
      resultEl.html('');
      $.each(result, function( key, item ) {
        var itemEl = '<li data-id="' + item.id + '">';
          itemEl += '<div class="actions"><span class="add-friend ">ajouter</span></div>';
          itemEl += '<img src="img/user/' + item.avatar + '.jpg" alt="" class="thumb" />';
          itemEl += '<h2 class="ui-li-heading">' + item.nickname + '</h2>';
          itemEl += '<p class="ui-li-desc">' + item.email + '</p>';
          itemEl += '</li>';
        resultEl.append(itemEl);
      });
    }
    else
      resultEl.html("Pas de résultat...");
    return false;
  });

  $('.add-friend').live('click', function(){
      var friendID = $(this).parents('li').data('id');
      var data = JSON.stringify({
        "userID": userID,
        "friendID": friendID
      });

      postData('user/addFriend/', data);
      $('.success').text("Ami ajouté");
    });

});

function login(email, pass) {
  $.ajax({
    //url: 'http://localhost:8000/api/core/user/?email=' + email,
    url: 'http://ssh.alwaysdata.com:11390/api/core/user/?email=' + email,

    contentType: 'application/json',
    dataType: 'jsonp',
    cache: false,
    processData: false,
    async: false,
    type: 'GET',
    success: function(data, textStatus, jqXHR) {
      if (data.objects && data.objects[0] && data.objects[0] && pass == data.objects[0].password){
        console.log(data.objects[0].id);
        localStorage.setItem('user', 1);
        //localStorage.setItem('user', data.objects[0].id);
      }
      else
        console.log("pas connecté!");
    }
  });
}

function logout() {
  localStorage.setItem('user', '');
}

function editItem(id, type) {
  getData({
      path: type + '/' + id,
      template: 'edit-' + type,
      opt: 0
  }, getPageData);

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