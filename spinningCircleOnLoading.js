var angle = 90;

var canvasBg = document.getElementById('canvasBg');


/// ------------------------ cut and paste --------------------

        ///

               ///
var underscore = _;
function CookieManager(){
}

CookieManager.prototype.setCookie = function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    exdays = exdays === undefined ? 10000 : exdays;
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toUTCString();
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
    this.setCookie(cname,"");
}

var latitude = 40;
var longitude = 40;


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
        case "positionunavaliable":
            this.gpsErrorMessageDisplayerInterface.displayPositionUnavaliableMessage();
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
GpsBrowserBlockChecker.prototype.succesfullCallback =  function succesfullCallback(position) {
    this.loadingTimeLineToTellToContinue.gpsIsEnabledAndWorking();
    this.cookieManager.setCookie("gpsOn", "true");
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
};
GpsBrowserBlockChecker.prototype.errorCallback = function errorCallback(error) {
    var PERMISSION_DENIED = 1;
    if(error.code === PERMISSION_DENIED){
        this.cookieManager.setCookie("gpsOn", "test");
    }else{
        this.cookieManager.setCookie("gpsOn", "positionunavaliable");
    }
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
    displayPositionUnavaliableMessage : function displayPositionUnavaliableMessage() {
        alert("El teu gps no acaba de trobar la posicio, espera una mica");
    },
    displayUnblockGpsMessageCalled: false,
    displayNotSupportedBrowser : function displayNotSupportedBrowser(){
        alert("Your device don't support GPS thus this app won't work.\nTu telefono no permite GPS via web, esta aplicacion no funcionara.");
    }
};

var gpsManager = new GpsBrowserBlockChecker(navigator.geolocation, location, loadingTimeLineToTellToContinue, gpsErrorMessageDisplayerInterface);

document.getElementById("unblockGPS").style.display = "none";
document.getElementById("acceptGPS").style.display = "none";

gpsManager.start();
