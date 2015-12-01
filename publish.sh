cd dist
cp -rf ../assets .
rm assets/*.psd
cp -rf ../index.html .
cp ../spinningCircleOnLoading.js .
rm assets/*.psd;
mkdir build;
cp ../build/main.js ./build/
mkdir lib
cp ../js/lib/phaser.js ./lib/
cp ../js/lib/underscore.js ./lib/
cp ../js/require.js .