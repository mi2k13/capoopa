function showItem(id, type) {
  loadData(type + '/' + id, type + '-detail', false);
  $('.slide-container').addClass('slide-left');
  $('.slide-container').removeClass('slide-right');
}

function hideItem() {
  $('.slide-container').addClass('slide-right');
  $('.slide-container').removeClass('slide-left');
}

function getData(path) {
  $.ajax({
    url: 'http://localhost:8000/api/core/' + path,
    //url: 'http://ssh.alwaysdata.com:11390/api/' + path,
    contentType: 'application/json',
    dataType: 'jsonp',
    cache: false,
    processData: false,
    type: 'GET',
    success: function(data, textStatus, jqXHR) {
      console.log(data);
    }
  });
}
