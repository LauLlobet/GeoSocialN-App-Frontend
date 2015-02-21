/**
 * Created by quest on 21/02/15.
 */
RandomColour = function(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var colour = { r:r,g:g,b:b};
    return colour;
}

RandColourStr = function(){
    var colour = RandomColour();
    return ColourStr(colour.r,colour.g,colour.b);
}

ColourStr = function(r,g,b){
    return 'rgb('+r+','+g+','+b+')';
}

CreateAndAddWood = function(io,x,y,w,h,scale){
    var wood = new iio.Rect(x,y,w*scale,h*scale)
        //.setAlpha(0.3)
        .enableKinematics()
        .createWithImage('embeded.png'
        ,function(){io.addObj(wood)});
    wood.setImgSize(100,200);
    //  wood.setImgSize(w*scale,h*scale);
    return wood;
}