var Bacon = require('baconjs').Bacon;
var $ = require('jquery');
$.fn.asEventStream = Bacon.$.asEventStream;
var ipc = require('ipc');
var open = require('open');
var titlebar = require('titlebar')();

if (process.platform !== 'win32') {
  titlebar.appendTo('#titlebar');
  $('.titlebar-fullscreen').empty();
}

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
  $('#instructions').addClass('animated infinite shake');
};

holder.ondragend = function () {
  $('#instructions').removeClass('animated infinite shake');
};

holder.ondragleave = function () {
  $('#instructions').removeClass('animated infinite shake');
};

var drop = $(holder).asEventStream('drop').doAction('.preventDefault');

drop.onValue(function(e) {
  $('#instructions').removeClass('animated infinite shake');
  readfiles(e.originalEvent.dataTransfer.files);
});

setTimeout(function () {
  ipc.send('ready')
}, 10);
