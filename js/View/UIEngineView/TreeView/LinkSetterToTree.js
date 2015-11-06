define([], function () {
    "use strict";
    var LINKSTR = "#";
    function LinkSetterToTree() //noinspection JSLint
    {
            this.linklayers = [];
            this.createdLinkLayers = [];
    }
    LinkSetterToTree.prototype.setInteractiveLinksToRetroText = function (group, formatedText, id, gestureObserver) {
        var initCharposX = 1,
            charposX = initCharposX,
            charposY = 0,
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
                this.createdLinkLayers.push(tmp);
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
                this.linklayers[i][j].input.priorityID = 1;
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
        if (this.createdLinkLayers === undefined) {
            return;
        }
        for (i = 0; i < this.createdLinkLayers.length; i += 1) {
            this.createdLinkLayers[i].destroy();
        }
    };

    return LinkSetterToTree;
});