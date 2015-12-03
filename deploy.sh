if [ -z "$1" ] && [ -z "$2" ]; then
  echo "USAGE: ./deploy.sh versionName  [debug|nodebug]"
  exit;
fi
NOW=$(date +"%m-%d-%Y %r")
echo "# $NOW" >> cache.appcache
git add -A 
git commit -m "deploy versio:$1 at $NOW" 
git push
ARG=$(echo "cd /var/lib/jetty/webapps/root/VisitTreeNumber; git pull;./publish.sh $1 $2")
ssh -i /Users/quest/.ssh/robinKeyPair.pem ubuntu@52.35.8.50 $ARG
say "deployed"

echo $ARG