if [ -z "$1" ] && [ -z "$2" ]; then
  echo "USAGE: ./publish.sh versionName  [debug|nodebug]"
  echo "FOUND: ./publish.sh $1 $2"
  exit;
fi
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
sed -i -- "s*&&version&&*$1*g" build/main.js
mkdir js/lib

############################
##  DELETE when PRODUCTION #
############################
if [ "$2" == "debug" ]; then
       echo -e "\033[31m Deploying a debug instance in server!!"
       echo -e "\033[37m …"
	mkdir dbg
	rsync -av --progress .. dbg/ --exclude dbg > /dev/null
	sed -i -- "s*&&version&&*$1*g" dbg/js/main.js
fi

############################

cp ../js/lib/phaser.js ./js/lib/
cp ../js/lib/underscore.js ./js/lib/
cp ../js/require.js ./js/
cp ../cache.appcache .