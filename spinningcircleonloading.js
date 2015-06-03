var angle = 90;

var canvasBg = document.getElementById('canvasBg');
var ctxBg = canvasBg.getContext('2d');
//
alert("hola");
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


/// ------------------------ cut and paste --------------------

        ///

               ///

function GpsBrowserBlockChecker(gpsInterface, reloadInterface, loadingTimeLineToTellToContinue, gpsErrorMessageDisplayerInterface) {
    this.gpsInterface = gpsInterface;
    this.loadingTimeLineToTellToContinue = loadingTimeLineToTellToContinue;
    this.gpsErrorMessageDisplayerInterface = gpsErrorMessageDisplayerInterface;
    this.reloadInterface = reloadInterface;
    this.cookieManager = new CookieManager();
}
GpsBrowserBlockChecker.prototype.start = function start() {
    switch (this.cookieManager.getCookie("gpsOn")) {
        case "true":
            this.testGps();
            break;
        case "test":
            this.gpsErrorMessageDisplayerInterface.displayUnblockGpsMessage();
            setTimeout(underscore.bind(this.testGps, this), 4000);
            break;
        case "":
            this.gpsErrorMessageDisplayerInterface.displayAcceptRequestMessage();
            setTimeout(underscore.bind(this.testGps, this), 4000);
            break;
    }
};

GpsBrowserBlockChecker.prototype.testGps = function test() {
    var properties = { timeout: 5000, enableHighAccuracy: false };
    this.gpsInterface.getCurrentPosition(underscore.bind(this.succesfullCallback, this),
        underscore.bind(this.errorCallback, this),
        properties);

}
GpsBrowserBlockChecker.prototype.succesfullCallback =  function succesfullCallback() {
    this.loadingTimeLineToTellToContinue.gpsIsEnabledAndWorking();
    this.cookieManager.setCookie("gpsOn", "true");
};
GpsBrowserBlockChecker.prototype.errorCallback = function errorCallback() {
    this.showGpsErrorMessageDependingOnTheDelay();
    this.cookieManager.setCookie("gpsOn", "test");
    this.reloadInterface.reload();
};
/// --------------------

///

///
var loadingTimeLineToTellToContinue = {
    gpsIsEnabledAndWorkingCalled : false,
    gpsIsEnabledAndWorking : function gpsIsEnabledAndWorking() {
        this.gpsIsEnabledAndWorkingCalled = true;
    }
};
var gpsErrorMessageDisplayerInterface = {
    displayAcceptRequestMessage : function displayAcceptRequestMessage() {
        this.displayAcceptRequestMessageCalled = true;
        alert("T apareixera un dialeg de acceptar el GPS, acceptal per a que poguem trobar missatges entremaliats");
    },
    displayAcceptRequestMessageCalled: false,
    displayUnblockGpsMessage : function displayUnblockGpsMessage() {
        this.displayUnblockGpsMessageCalled = true;
        alert("Has de fer un click llarg a la barra de direccions per habilitar el GPS, acceptal per a que poguem trobar missatges entremaliats");
    },
    displayUnblockGpsMessageCalled: false
};

var gpsManager = new GpsBrowserBlockChecker(navigator.geolocation, location, loadingTimeLineToTellToContinue, gpsErrorMessageDisplayerInterface);

gpsManager.start();

/*
function GetLocation(location) {
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
}
navigator.geolocation.getCurrentPosition(GetLocation);
*/













loop();
var latitude;
var longitude;

