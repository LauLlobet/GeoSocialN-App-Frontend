git add -A 
git push
ssh -i /Users/quest/.ssh/robinKeyPair.pem ubuntu@52.24.21.196 'cd /var/lib/jetty/webapps/root/OurTreeWeb; git pull'