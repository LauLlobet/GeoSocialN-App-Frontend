define([], function () {
    "use strict";
    var LINKSTR = "#";

    var YTEXT = -50;

    function LinkSetterToTree() //noinspection JSLint
    {
            this.linklayers = [];
            this.createdLinkSpritesStoredToDestroyThemLater = [];
    }
    LinkSetterToTree.prototype.setInteractiveLinksToRetroText = function (group, formatedText, id, gestureObserver) {
        var initCharposX = 1 + 10,
            charposX = initCharposX,
            charposY = YTEXT,
            charposXInc = 12.5 * 0.788,
            charposYInc = 21.5,
            charLinkScale = 1.6,
            tmp,
            currentLink = "",
            currentLinkCells = [],
            isPartOfTheAdress = false,
            links = [],
            x,
            c,
            i,
            j;

        this.removeLinks();
        for (x = 0, c = '';  c = formatedText.charAt(x); x += 1) {
            c = formatedText.charAt(x);
            if (c === LINKSTR && isPartOfTheAdress === false) {
                isPartOfTheAdress = true;
            } else if (isPartOfTheAdress && c === ' ') { // end the adress
                isPartOfTheAdress = false;
                this.linklayers.push(currentLinkCells);
                currentLinkCells = [];
                links.push(currentLink);
                currentLink = "";
            }

            if (isPartOfTheAdress) {
                tmp = group.create(charposX, charposY, 'linkLayer');
                tmp.scale.x = tmp.scale.y = charLinkScale;
                currentLinkCells.push(tmp);
                this.createdLinkSpritesStoredToDestroyThemLater.push(tmp);
                if (c !== '#') {
                    currentLink = currentLink + c;
                }
            }
            if (c === '\n') {
                charposY += charposYInc;
                charposX = initCharposX;
            } else {
                charposX += charposXInc;
            }
        }

        for (i = 0; i < this.linklayers.length; i += 1) {
            for (j = 0; j < this.linklayers[i].length; j += 1) {
                this.linklayers[i][j].inputEnabled = true;
                this.linklayers[i][j].input.priorityID = 1000;
                this.linklayers[i][j].useHandCursor = true;
                this.linklayers[i][j].events.onInputDown.add(function () {
                    gestureObserver.linkClicked(this.id);
                }, {
                    id: links[i],
                    gestureObserver: gestureObserver
                });
            }
        }
    };
    LinkSetterToTree.prototype.removeLinks = function removeLinks() {
        var i;
        if (this.createdLinkSpritesStoredToDestroyThemLater === undefined) {
            return;
        }
        for (i = 0; i < this.createdLinkSpritesStoredToDestroyThemLater.length; i += 1) {
            this.createdLinkSpritesStoredToDestroyThemLater[i].destroy();
        }
        this.createdLinkSpritesStoredToDestroyThemLater = [];
        this.linklayers = [];
    };

    return LinkSetterToTree;
});