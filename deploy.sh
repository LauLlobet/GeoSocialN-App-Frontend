git add -A 
NOW=$(date +"%m-%d-%Y %r")
git commit -m "deploy at $NOW" 
git push
ssh -i /Users/quest/.ssh/robinKeyPair.pem ubuntu@52.35.8.50 'cd /var/lib/jetty/webapps/root/VisitTreeNumber; git pull'
say "deployed"
