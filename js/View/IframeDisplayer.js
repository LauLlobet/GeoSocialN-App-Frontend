/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define([], function () {
    function IframeDisplayer() {}

    IframeDisplayer.prototype.displayPopUp = function (html) {
        setHtmlContent('popUpContent', html);
        blockElement('popUp');
    };

    IframeDisplayer.prototype.showYoutubeVideo = function displayGrayLayerOnGame(id) {
        var htmlContent = '<iframe width="100%" src="//www.youtube.com/embed/' + id + '" frameborder="0" allowfullscreen>';
        this.displayPopUp(htmlContent);
    }


    return IframeDisplayer;
});