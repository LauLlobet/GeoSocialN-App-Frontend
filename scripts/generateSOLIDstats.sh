#ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
#brew install gawk
#brew tap homebrew/science
#brew update && brew upgrade
#brew install octave
cd ../$1
pwd
commitsList=( $(git --no-pager log --reverse --pretty=format:"%H") );
echo "Starting…"
printf "histogramT = histc([0,0],[1:linesgroup:linesmax]);\n" > ../scripts/histograms.m
for i in "${commitsList[@]}"
do
   	echo "Stats from $i"
	git checkout $i &>/dev/null
	touch ../scripts/tmpCount
	echo "" > ../scripts/tmpCount >/dev/null 2>&1
	find ./ -type f -name "*.js" | awk '{print "wc -l "$0}' | sh | awk '{print $1}' >> ../scripts/tmpCount
	linesC=($(cat ../scripts/tmpCount | gawk -vORS=, '{print $1}' | sed 's/,$//')) >/dev/null 2>&1
	echo $linesC | md5 
	printf "a = [6000,$linesC];\nhistogramT = [ histogramT ; histc(a,[1:linesgroup:linesmax]) ];\n" >> ../scripts/histograms.m
done




#histogramT = histc([0],[1:linesgroup:linesmax]);
#a = [ %l ]
#histogramT = [ histogramT ; histc(a,[1:linesgroup:linesmax]) ]
#histogram = histogramT([1:floor(size(histogramT,1)/100):size(histogramT,1)],:);