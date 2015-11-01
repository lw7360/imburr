var $ = require('jquery');
var open = require('open');

var clientID = '69eb9f84f6aff83';
var holder = document.documentElement;

function readfiles (files) {
  for (var i = 0; i < files.length; i++) {
    var formData = new FormData();
    formData.append('image', files[i]);

    $.ajax({
      url: 'https://api.imgur.com/3/image',
      type: 'POST',
      datatype: 'json',
      headers: {
        'Authorization': 'Client-ID ' + clientID
      },
      data: formData,
      success: function (response) {
        if (response.success) {
          open(response.data.link);
        } else {
          alert("Couldn't upload");
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert("Couldn't upload");
      },
      cache: false,
      contentType: false,
      processData: false
    });
  }
}

holder.ondragover = function (e) {
  e.preventDefault();
  console.log('ondragover');
};

holder.ondragend = function () {
  console.log('ondragend');
};

holder.ondrop = function (e) {
  e.preventDefault();
  console.log('ondrop');
  readfiles(e.dataTransfer.files);
};
