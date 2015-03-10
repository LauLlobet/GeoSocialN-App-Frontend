require(["phaser"], function (phaser) {

    var targetW,targetH;
    targetW = 720;
    targetH = 1280;
    var scale;


    var game = new Phaser.Game(window.innerWidth,window.innerHeight, Phaser.CANVAS, 'game',
        { preload: preload, create: create, update: update, render: render  });

    var allSpritesGroup;

    function resizeUpdate() {
        if (window.innerWidth / window.innerHeight > targetW / targetH) {
            scale = window.innerHeight / targetH;
        } else {
            scale = window.innerWidth / targetW;
        }
        console.log("scale: " + scale);
        if(game.scale !== null) {
            game.scale.setGameSize(window.innerWidth, window.innerHeight);
        }
    }

    resizeUpdate();


    function preload() {
        game.stage.backgroundColor = '#336699';
        game.load.image('logo', 'assets/treeTrunk2.png');
        game.load.image('point', 'assets/point.png');

        game.scale.parentIsWindow = true;
        //game.scale.forcePortrait = true;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
        game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
        game.scale.refresh();
        allSpritesGroup = game.add.group();
    }

    var cursors;

    function create() {

        // Put a graphic in the center to demonstrate.
        game.world.setBounds(0,0,window.innerWidth,window.innerHeight);
        /*var sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
        sprite.anchor.set(0.5);
        */

        var point= game.add.sprite(coordX(0),coordY(0), 'point');
        point.anchor.set(0.5);
        allSpritesGroup.add(point);
        resizeSprite(point);
        point= game.add.sprite(coordX(360 ),coordY( 640 ), 'point');
        point.anchor.set(0.5);
        resizeSprite(point);
        allSpritesGroup.add(point);
        point= game.add.sprite(coordX(- 360 ),coordY( 640 ), 'point');
        point.anchor.set(0.5);
        resizeSprite(point);
        allSpritesGroup.add(point);
        point= game.add.sprite(coordX( 360 ),coordY(- 640 ), 'point');
        point.anchor.set(0.5);
        resizeSprite(point);
        allSpritesGroup.add(point);
        point= game.add.sprite(coordX(- 360 ),coordY(- 640 ), 'point');
        resizeSpriteToSize(point,360,360);
        allSpritesGroup.add(point);

        game.camera.x = game.world.centerX - game.camera.width/2;
        game.camera.y = game.world.centerY - game.camera.height/2;
        game.input.onDown.add(gofull, this);
        cursors = game.input.keyboard.createCursorKeys();

        game.scale.setResizeCallback(resizeUpdate,this);



    }

    function coordX(xi){
        return xi*scale + game.world.centerX;
    }

    function coordY(yi){
        return yi*scale + game.world.centerY;
    }

    function resizeSprite(sprite){
        game.scale.scaleSprite(sprite,sprite.width*scale,sprite.height*scale,true);
    }

    function resizeSpriteToSize(sprite,width,height){
        game.scale.scaleSprite(sprite,width*scale,height*scale,true);
    }

    function gofull() {
        if (game.scale.isFullScreen) {
            game.scale.stopFullScreen();
        } else {
            game.scale.startFullScreen(false);
        }
       allSpritesGroup.callAll(function lolo(variable){console.log("hola")},this,null);
        //getAllSprites(allSpritesGroup);
    }

    function update() {

        //  This allows us to move the game camera using the keyboard

        if (cursors.left.isDown)
        {
            game.camera.x -= 2;
        }
        else if (cursors.right.isDown)
        {
            game.camera.x += 2;
        }

        if (cursors.up.isDown)
        {
            game.camera.y -= 2;
        }
        else if (cursors.down.isDown)
        {
            game.camera.y += 2;
        }

    }

    function render() {

        game.debug.inputInfo(16, 16);

    }


    function findNamedItemInGroup( grp, name )
    {
        // capture name in closure, for recursion
        var result = (function f( grp )
        {
            console.log("iterant");
            var start = grp.cursor;
            var i = start;
            do
            {
                var r;
                // recur into Groups
                if( i instanceof Phaser.Group )
                {
                    // reset the cursor
                    grp.cursor = start;
                    return f( i );
                }
                else if( i.name === name )
                {
                    // reset the cursor
                    grp.cursor = start;
                    return i;
                }
                grp.next();
                i = grp.cursor;
            }
            while( i && i !== start );
            // reset the cursor
            grp.cursor = start;
            return null;
        })( grp );
        return result;
    }

    function getAllSprites( grp )
    {
        var array = [];
        // capture name in closure, for recursion
        (function f( grp, array)
        {
            var start = grp.cursor;
            var i = start;
            do
            {
                console.log("iterant");
                var r;
                // recur into Groups
                if( i instanceof Phaser.Group )
                {
                    // reset the cursor
                    grp.cursor = start;
                    return f( i , array);
                }
                else if( i.name instanceof Phaser.Sprite )
                {
                    array.push(i);
                    resizeSprite(i,0.5);
                }
                grp.next();
                i = grp.cursor;
            }
            while( i && i !== start );
            // reset the cursor
            grp.cursor = start;
            return;
        })( grp );
        return array;
    }
});