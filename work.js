const white = "#ffffff";
const black = "#000000";
var theme_color = white;
var visual_color = black;

function change_theme(jscolor){
	document.getElementById('color')
	theme_color = '#' + jscolor
}

function change_visual(jscolor){
	document.getElementById('visual')
	visual_color = '#' + jscolor
}


window.onload = function() {

  var file = document.getElementById("thefile");
  var audio = document.getElementById("audio");

  file.onchange = function() {
    var files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audio.play();
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 100; //height of bars
    var ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height - 350; //center on screen

    var barWidth = (WIDTH / bufferLength)* 1.5; //width of bars
    var barHeight;
    var x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

    analyser.getByteFrequencyData(dataArray);
	  ctx.fillStyle = theme_color; //background color


      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

		/*/change var colors
        var r = barHeight + (25 * (i/bufferLength));
        var g = 250 * (i/bufferLength);
        var b = 50;

        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";*/
				ctx.fillStyle = visual_color;
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1; //space between bars
      }
    }

    audio.play();
    renderFrame();
  };
};
