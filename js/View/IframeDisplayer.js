/*global define, require, module, Phaser, Group*/
/*jslint todo: true */
define([], function () {
    function IframeDisplayer() {}

    IframeDisplayer.prototype.displayPopUp = function (html) {
        var elem = setHtmlContent('popUpContent', html);
        blockElement('popUp');
    };

    IframeDisplayer.prototype.showYoutubeVideo = function showYoutubeVideo(id) {
        var htmlContent = '<iframe width="100%" src="//www.youtube.com/embed/' + id + '" frameborder="0" allowfullscreen>';
        this.displayPopUp(htmlContent);
    };

    function addScript(JSfileName) {
        var js = document.createElement('script');
        js.setAttribute('type', 'text/javascript');
        js.src = JSfileName;
        document.body.appendChild(js);
    }
    IframeDisplayer.prototype.showImgurPicture = function showImgurPicture(id) {
        var htmlContent = '<blockquote class="imgur-embed-pub" lang="en" data-id="' + id + '"></blockquote>';
        this.displayPopUp(htmlContent);
        addScript('//s.imgur.com/min/embed.js');
    }


    return IframeDisplayer;
});