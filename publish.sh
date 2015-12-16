if [ -z "$1" ] && [ -z "$2" ]; then
  echo "USAGE: ./publish.sh versionName  [debug|nodebug]"
  echo "FOUND: ./publish.sh $1 $2"
  exit;
fi

rm -rf /var/lib/jetty/webapps/root/welcome/*
cp -rf rootWebsite/*  /var/lib/jetty/webapps/root/welcome/

cd build 
node r.js -o build.single.js
nodejs r.js -o build.single.js
cd ..
cd dist
rm -rf *
mkdir js
cp -rf ../assets .
rm assets/*.psd
cp  ../*.html .
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

Templates Buffet Link
Here is a sample Templates Buffet link which pulls in a simple heart image
http://www.zazzle.com/api/create/at-
238555878123854031?rf=238555878123854031&ax=DesignBlast&sr=2503752025421
80800&cg=0&t__useQpc=true&ed=true&t__smart=false&continueUrl=http%3A%2F%2F
www.zazzle.com%2Fcrazydaisyshop&rut=Go%20back%20to%20crazydaisyshop's%20
store&fwd=ProductPage&tc=&ic=&t_image0_iid=7a19909b-23fd-4d9d-ba4b-898510a956b8