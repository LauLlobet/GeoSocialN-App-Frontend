
cd build 
node r.js -o build.single.js
nodejs r.js -o build.single.js
cd ..
cd dist
rm -rf *
mkdir js
cp -rf ../assets .
rm assets/*.psd
cp -rf ../index.html .
sed -i -- 's*js/main*build/main*g' index.html
cp ../spinningCircleOnLoading.js .
mkdir build;
cp ../build/main.js ./build/
mkdir js/lib
cp ../js/lib/phaser.js ./js/lib/
cp ../js/lib/underscore.js ./js/lib/
cp ../js/require.js ./js/
cp ../cache.appcache .