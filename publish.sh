
cd build 
node r.js -o build.single.js
cd ..
cd dist
rm -rf *
mkdir js
cp -rf ../assets .
rm assets/*.psd
cp -rf ../index.html .
cp ../spinningCircleOnLoading.js .
mkdir build;
cp ../build/main.js ./build/
mkdir js/lib
cp ../js/lib/phaser.js ./js/lib/
cp ../js/lib/underscore.js ./js/lib/
cp ../js/require.js ./js/
cp ../cache.appcache .