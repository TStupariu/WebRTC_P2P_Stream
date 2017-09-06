// get video/voice stream
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillRect(100,100,100,100);

var stream = canvas.captureStream();
gotMedia(stream);

function gotMedia (stream) {
  var peer1 = new SimplePeer({ initiator: true, stream: stream })
  var peer2 = new SimplePeer()

  peer1.on('signal', function (data) {
    peer2.signal(data)
  })

  peer2.on('signal', function (data) {
    peer1.signal(data)
  })

  peer2.on('stream', function (stream) {
    // got remote video stream, now let's show it in a video tag
    var video = document.querySelector('video')
    video.srcObject = stream;
  })
}