git add -A 
NOW=$(date +"%m-%d-%Y %r")
git commit -m "deploy at $NOW" 
git push
ssh -i /Users/quest/.ssh/robinKeyPair.pem ubuntu@52.24.21.196 'cd /var/lib/jetty/webapps/root/OurTreeWeb; git pull'
say "done"