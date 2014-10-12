// JavaScript Document

// variable declarations
var apiURL="https://s3-us-west-1.amazonaws.com/blog.chiarng.com/img/";
var imgList = ["20131201","20131202","20131203","20140901","20140902","20141001","20141002","20141003"];
var imgTitle = ["Girl1","Dish Trail","Girl3","Girl4","Girl5","Lighthouse","Rose","Sunset"];
var imgLinks = '';
var stopDisqusFromGoingCrazy = 0;

// swaps background image given imgURL
function imgSwap(imgURL) {
	document.getElementById('bg').style.backgroundImage = "url(" + imgURL + ")";
	document.getElementById('leftblur').style.backgroundImage = "url(" + imgURL + ")";
	document.getElementById('rightblur').style.backgroundImage = "url(" + imgURL + ")";
	exifSwap(imgURL);
	commentSwap(imgURL);
};

// swaps EXIF given imgURL
function exifSwap(imgURL) {
	var invImg = document.createElement('img'); 
	invImg.onload = function () {
		EXIF.getData(invImg, function() {
			var expoTime = EXIF.getTag(this,"ExposureTime");
			if (expoTime < 1) {expoTime = "1/" + 1/expoTime};
			document.getElementById("exifholder").innerHTML = 
	    		"Camera: " + EXIF.getTag(this,"Model") + "<br>" +
	    		"Date and Time: " + EXIF.getTag(this,"DateTimeOriginal") + "<br>" +
	    		"F-stop: f/" + EXIF.getTag(this,"FNumber") + "<br>" +
	    		"Exposure Time: " + expoTime + " seconds <br>" +
	    		"ISO speed: " + EXIF.getTag(this,"ISOSpeedRatings") + "<br>" +
	    		"Focal Length: " + EXIF.getTag(this,"FocalLength") + "<br>" +
	    		"Exposure Program: " + EXIF.getTag(this,"ExposureProgram") + "<br>" +
	    		"Exposure Bias: " + EXIF.getTag(this,"ExposureBias") + "<br>" +
	    		"Metering Mode: " + EXIF.getTag(this,"MeteringMode") + "<br>" +
	    		"Flash: " + EXIF.getTag(this,"Flash") + "<br>" +
	    		"White Balance Mode: " + EXIF.getTag(this,"WhiteBalance");
		});
	};
	invImg.src = imgURL;
};

// swaps Disqus comments
function commentSwap(imgURL) {
	var disqus_shortname = 'chiarng';
    var disqus_identifier = imgURL.substring(56,66);
    var disqus_url = "http://blog.chiarng.com/#!" + imgURL.substring(56,66);
    stopDisqusFromGoingCrazy = stopDisqusFromGoingCrazy + 1;
    (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
	if (stopDisqusFromGoingCrazy > 1) {
		DISQUS.reset({
			reload: true,
			config: function () {  
			this.page.identifier = imgURL.substring(56,66);  
			this.page.url = "http://blog.chiarng.com/#!" + imgURL.substring(56,66);
				}
		}); 
	};
};

// cross-browser support for attaching event listeners
function addEvent(element, event, func) {
	if (element.attachEvent)
		return element.attachEvent('on' + event, func);
	else
		return element.addEventListener(event, func, false);
};

function init() {
	// load latest background image
	imgSwap(apiURL + imgList[imgList.length-1].substring(0,4) + "/" + imgList[imgList.length-1].substring(4,6) + "/" + imgList[imgList.length-1].substring(6,9) + ".jpg");

	// resize circles to make more obvious
	document.getElementById('leftcirc').style.cssText = 
		'position: fixed;' +
		'left: 0;' +
		'top: 0;' +
		'opacity: 1;' +
		'margin: 20px;' +
		'background-color: rgba(255, 255, 255, 0);' +
		'border: 1px solid white;' +
		'height: 15px;' +
		'width: 15px;' +
		'border-radius: 50%;' +
		'z-index: 60;' +
	    '-webkit-transition:width 3s ease-in-out, height 3s ease-in-out;' +
	    '-moz-transition:width 3s ease-in-out, height 3s ease-in-out;' +
	    '-o-transition:width 3s ease-in-out, height 3s ease-in-out;' +
	    'transition:width 3s ease-in-out, height 3s ease-in-out;';
	document.getElementById('rightcirc').style.cssText = 
		'position: fixed;' +
		'right: 0;' +
		'top: 0;' +
		'opacity: 1;' +
		'margin: 20px;' +
		'background-color: rgba(255, 255, 255, 0);' +
		'border: 1px solid white;' +
		'height: 15px;' +
		'width: 15px;' +
		'border-radius: 50%;' +
		'z-index: 60;' +
	    '-webkit-transition:width 3s ease-in-out, height 3s ease-in-out;' +
	    '-moz-transition:width 3s ease-in-out, height 3s ease-in-out;' +
	    '-o-transition:width 3s ease-in-out, height 3s ease-in-out;' +
	    'transition:width 3s ease-in-out, height 3s ease-in-out;';

	// loop through list of photos and create hyperlink given date, title, imgURL, id
	for (i=1; i<imgList.length+1; i++) {
		imgLinks = '<a href id="imglink' + i + '">' + imgTitle[i-1] + '</a> <br>' + imgLinks;
	};

	// replace placeholder with hyperlinks
	document.getElementById("imglinkholder").innerHTML = imgLinks;

	// addEvent to the hyperlink given id and imgURL
	for (ii=1; ii<imgList.length+1; ii++) {
		(function (ii) {
			addEvent (document.getElementById('imglink' + ii),'click',function(e) {
				e.preventDefault();
				e.stopPropagation();
				imgSwap(apiURL + imgList[ii-1].substring(0,4) + "/" + imgList[ii-1].substring(4,6) + "/" + imgList[ii-1].substring(6,9) + ".jpg");
			});
		})(ii);
	};
};

// window.onload
var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        init();
        clearInterval(readyStateCheckInterval);
    }
}, 10);


	
