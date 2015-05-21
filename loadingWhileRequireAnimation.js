var angle = 90;

var canvasBg = document.getElementById('canvasBg');
var ctxBg = canvasBg.getContext('2d');
//
var requestAnimFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame;


function convertToRadians(degree) {
    return degree*(Math.PI/180);
}

function drawColoredCircle() {
    var ctx = ctxBg;
    ctxBg.translate(200, 200);
    ctxBg.rotate(convertToRadians(angle));
    ctx.fillStyle = "#00A308";
    ctx.beginPath();
    ctx.arc(0, 50, 10, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();


    ctxBg.rotate(convertToRadians(8));
    ctx.fillStyle = "#00A308";
    ctx.beginPath();
    ctx.arc(0, 50, 10, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();


    ctxBg.rotate(convertToRadians(8));
    ctx.fillStyle = "#00A308";
    ctx.beginPath();
    ctx.arc(0, 50, 10, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();

    ctxBg.rotate(-convertToRadians(angle+16));
    ctxBg.translate(-200, -200);
}

function loop(){
    ctxBg.clearRect(0,0,canvasBg.width,canvasBg.height);
    angle+=8;
    drawColoredCircle();
    requestAnimFrame(loop);
}

function GetLocation(location) {
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
}
navigator.geolocation.getCurrentPosition(GetLocation);

loop();
var latitude;
var longitude;

/**
 * Created by quest on 21/05/15.
 */
