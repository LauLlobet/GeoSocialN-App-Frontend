
NOW=$(date +"%m-%d-%Y %r")
echo "# $NOW" >> cache.appcache
git add -A 
git commit -m "deployed at $NOW" 
git push
ssh -i /Users/quest/.ssh/robinKeyPair.pem ubuntu@52.35.8.50 'cd /var/lib/jetty/webapps/root/VisitTreeNumber; git pull;./publish.sh'
say "deployed"
