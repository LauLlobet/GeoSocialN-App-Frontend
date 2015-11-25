#ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
#brew install gawk
cd ..;
commitsList=( $(git --no-pager log --pretty=format:"%H") );
echo "Starting…"
printf "histogramT = histc([0,0],[1:30:400]);\n" > scripts/histograms.m
for i in "${commitsList[@]}"
do
   	echo "Stats from $i"
	git checkout $i
	touch scripts/tmpCount
	echo "" > scripts/tmpCount >/dev/null 2>&1
	find ./ -type f -name "*.js" | awk '{print "wc -l "$0}' | sh | awk '{print $1}' >> scripts/tmpCount
	linesC=($(cat scripts/tmpCount | gawk -vORS=, '{print $1}' | sed 's/,$//')) >/dev/null 2>&1
	echo $linesC | md5 
	printf "a = [-1$linesC];\nhistogramT = [ histogramT ; histc(a,[1:30:400]) ];\n" >> scripts/histograms.m
done




#histogramT = histc([0],[1:30:400]);
#a = [ %l ]
#histogramT = [ histogramT ; histc(a,[1:30:400]) ]