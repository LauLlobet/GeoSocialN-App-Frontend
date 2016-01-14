linesgroup = 30;
commitsgroup = 5;
linesmax = 400;
projectinitperone = 0.1;




histograms.m



histogram = histogramT([floor(size(histogramT,1)* projectinitperone):commitsgroup:size(histogramT,1)],:);



function mymap = colormapRGBmatrices( N, rm, gm, bm)
  x = linspace(0,1, N);
  rv = interp1( rm(:,1), rm(:,2), x);
  gv = interp1( gm(:,1), gm(:,2), x);
  mv = interp1( bm(:,1), bm(:,2), x);
  mymap = [ rv', gv', mv'];
  %exclude invalid values that could appear
  mymap( isnan(mymap) ) = 0;
  mymap( (mymap>1) ) = 1;
  mymap( (mymap<0) ) = 0;
end
MR=[0,0; 
    0.02,0.3; %this is the important extra point
    0.3,1;
    1,1];
MG=[0,0;
    0.3,0; 
    0.7,1;
    1,1];
MB=[0,0; 
    0.7,0;
    1,1];
hot2 = colormapRGBmatrices(500,MR,MG,MB);
colormap(hot2)

y = [0:linesgroup:linesmax]
x = [floor(size(histogramT,1)* projectinitperone):commitsgroup:size(histogramT,1)];


pcolor(x,y,histogram')
xlabel('commit number');
ylabel('lines is .js files');



figure


histogramT = histogram';

hold off
plot(y,histogram(size(histogram,1),:), 'g',"linewidth", 2)
hold all;
%ColorSet = varycolor(50);

ColorSet = flipud(gray(size(histogram,1)));
set(gca, 'ColorOrder', ColorSet);
for m = 1:size(histogram,1)
  plot(y,histogram(m,:))
end


xlabel('lines in .js files');
ylabel('number of .js files');


figure





filespercommit = sum(histogram',1);

histogramNorm = (histogram./filespercommit)*100;


hold off
plot(y,histogramNorm(size(histogramNorm,1),:), 'g',"linewidth", 2)
hold all;
%ColorSet = varycolor(50);

ColorSet = flipud(gray(size(histogramNorm,1)));
set(gca, 'ColorOrder', ColorSet);
for m = 1:size(histogramNorm,1)
  plot(y, histogramNorm(m,:))
end
hold on
xlabel('lines in .js files');
ylabel('% of .js files');

figure




