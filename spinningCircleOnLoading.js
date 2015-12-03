/// ------------------------ cut and paste --------------------
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
            setTimeout(underscore.bind(this.testGps, this), 4000);
            break;
        case "":
            this.gpsErrorMessageDisplayerInterface.displayAcceptRequestMessage();
            setTimeout(underscore.bind(this.testGps, this), 4000);
            break;
    }
};
GpsBrowserBlockChecker.prototype.testGps = function test() {
    var properties = { enableHighAccuracy: true,
        timeout: 2000};
    this.gpsInterface.getCurrentPosition(underscore.bind(this.succesfullCallback, this),
        underscore.bind(this.errorCallback, this),
        properties );

}
GpsBrowserBlockChecker.prototype.succesfullCallback =  function succesfullCallback(position) {
    this.loadingTimeLineToTellToContinue.gpsIsEnabledAndWorking();
    this.cookieManager.setCookie("gpsOn", "true");
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
};
GpsBrowserBlockChecker.prototype.errorCallback = function errorCallback(error) {
    var PERMISSION_DENIED = 1,
        TIMEOUT = 3;
    if(error.code === PERMISSION_DENIED){
        this.cookieManager.setCookie("gpsOn", "test");
        this.reloadInterface.reload();
    }else if(error.code === TIMEOUT){
        alert("Timeout problems with the GPS");
        this.testGps();
    } else {
        this.cookieManager.setCookie("gpsOn", "positionunavaliable");
        this.reloadInterface.reload();
    }
};
/// --------------------
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
        if(navigator.userAgent.match("emulated") === null ) {
            //alert("Espera una mica");
        }
    },
    displayUnblockGpsMessageCalled: false,
    displayNotSupportedBrowser : function displayNotSupportedBrowser(){
        alert("Your device don't support GPS thus this app won't work.\nTu telefono no permite GPS via web, esta aplicacion no funcionara.");
    }
};

var sitePolicy = {

    ifAcceptedNowOrInThePastDo: function (callback) {
        this.cookieManager = new CookieManager();
        switch( this.cookieManager.getCookie("acceptedPolicy") ) {
            case "yes":
                callback();
                break;
            default:
                this.showPolicyMessage(callback);
        }
    },
    showPolicyMessage: function (callback) {
        var initialMsg = "No hate message allowed, the site will use cookies to work, click cancel for details or ok to accept.";
        var userLang = navigator.language || navigator.userLanguage;
        switch(userLang){
            case "es":
                initialMsg = "No se permiten mensajes de odio en esta app, la app utiliza cookies, clicka cancelar para obtener mas detalles o aceptar per entrar";
            case "ca":
                initialMsg = "No es permeten missatges d'odi en aquesta app, la app utilitza cookies, clicka cancelar per a mes informació o aceptar per entrar";
        }
        var r = confirm(initialMsg);

        if (r == true) {
            this.cookieManager.setCookie("acceptedPolicy","yes")
            callback();
        } else {
            var r = confirm("Hate speech is prohibited and defined as “content that promotes hatred or violence towards groups of people based on their race or ethnic origin, religion, disability, gender, age, veteran status, or sexual orientation/gender identity."+
                "We ask you to placed cookies on your computer to help make this website better");
            if (r == true) {
                this.cookieManager.setCookie("acceptedPolicy","yes")
                callback();
            } else {
                var r = confirm("you cannot use this website if you don't accept it's policy. Please accept by pressing ok or leave it");
                if (r == true) {
                    this.cookieManager.setCookie("acceptedPolicy","yes")
                    callback();
                } else {
                    alert("you cannot use this website if you don't accept it's policy. Please reload it if you want to use it")
                }
            }
        }
    }
}
sitePolicy.ifAcceptedNowOrInThePastDo( function() {
    var gpsManager = new GpsBrowserBlockChecker(navigator.geolocation, location, loadingTimeLineToTellToContinue, gpsErrorMessageDisplayerInterface);
    document.getElementById("unblockGPS").style.display = "none";
    document.getElementById("acceptGPS").style.display = "none";
    gpsManager.start();
});
