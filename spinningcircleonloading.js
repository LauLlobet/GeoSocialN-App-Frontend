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


/// ------------------------ cut and paste --------------------

        ///

               ///
var underscore = _;
function CookieManager() {
}

CookieManager.prototype.setCookie = function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

CookieManager.prototype.getCookie = function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

CookieManager.prototype.deleteCookie = function (cname) {
    this.setCookie(cname,"",-100);
}

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
            setTimeout(underscore.bind(this.testGps, this), 10000);
            break;
        case "":
            this.gpsErrorMessageDisplayerInterface.displayAcceptRequestMessage();
            setTimeout(underscore.bind(this.testGps, this), 10000);
            break;
    }
};

GpsBrowserBlockChecker.prototype.testGps = function test() {
    var properties = { timeout: 5000, enableHighAccuracy: false };
    if(!navigator.geolocation){
        this.gpsErrorMessageDisplayerInterface.displayNotSupportedBrowser();
    }
    this.gpsInterface.getCurrentPosition(underscore.bind(this.succesfullCallback, this),
        underscore.bind(this.errorCallback, this),
        properties);
}
GpsBrowserBlockChecker.prototype.succesfullCallback =  function succesfullCallback(location) {
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
    this.loadingTimeLineToTellToContinue.gpsIsEnabledAndWorking();
    this.cookieManager.setCookie("gpsOn", "true");
};
GpsBrowserBlockChecker.prototype.errorCallback = function errorCallback() {
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
        document.getElementById("acceptGPS").style.display = "none";
        document.getElementById("unblockGPS").style.display = "none";
    }
};
var gpsErrorMessageDisplayerInterface = {
    displayAcceptRequestMessage : function displayAcceptRequestMessage() {
        this.displayAcceptRequestMessageCalled = true;
        document.getElementById("acceptGPS").style.display = "block";
    },
    displayAcceptRequestMessageCalled: false,
    displayUnblockGpsMessage : function displayUnblockGpsMessage() {
        this.displayUnblockGpsMessageCalled = true;
        document.getElementById("unblockGPS").style.display = "block";
    },
    displayUnblockGpsMessageCalled: false,
    displayNotSupportedBrowser : function displayNotSupportedBrowser(){
        alert("Your device don't support GPS thus this app won't work.\nTu telefono no permite GPS via web, esta aplicacion no funcionara.");
    }
};

var gpsManager = new GpsBrowserBlockChecker(navigator.geolocation, location, loadingTimeLineToTellToContinue, gpsErrorMessageDisplayerInterface);

document.getElementById("unblockGPS").style.display = "none";
document.getElementById("acceptGPS").style.display = "none";
var latitude;
var longitude;
gpsManager.start();
loop();

