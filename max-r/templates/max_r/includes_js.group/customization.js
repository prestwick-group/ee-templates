var siteURL = "http://max-r.net"
// console.log("FireFox Test");

/*
	 scrollMeasure will be used to gauge how much the user has scrolled. 
	 If not more than 500px up or down, the slide wont' move.
*/
var scrollMeasure = 0;
var totalWheelChange = 0;


$(window).load(function(){
	// console.log("Customization loaded.");
	
	/*
		When the page is loaded, make sure the users starts at the top of the page.
	*/
	$("html, body").animate({ scrollTop: "0px" });

 	/*
		the variable "windowSize" is established in "default.js" based on the width
		of the browser window the user currently has open.
 	*/
	// console.log("Page size : " + windowSize);

	/* 
		Window size is large, display scrolljacking content
	*/
	if(windowSize=='large')  {

		/*
			if window is resized, force a refresh.
		*/
		//refresh page on browser resize
		$(window).bind('resize', function(e)
		{
		  if (window.RT) clearTimeout(window.RT);
		  window.RT = setTimeout(function()
		  {
		    this.location.reload(false); /* false to get page from cache */
		  }, 200);
		});


		setupPage();

		/*
			Configuration Page Only
			------------------------------
			Set height of banners (first slide rotation) to be set to height of the first image.
			Then call the function "rotateFristHero". code from: http://jsfiddle.net/wcyh9g3k/2/, http://stackoverflow.com/questions/31960362/jquery-loop-through-images
		*/
		var heroImageHeight = $("img.rotating-image").outerHeight();
		// console.log("heroImageHeight : " + heroImageHeight);
		$("div.banners").css("height", heroImageHeight);
		rotateFirstHero();


	} else  {
		/* 
			Window is smaller than large, display images laid out in order.  
		*/
		console.log("Configuration page says page is " + windowSize);

		setupMobile();	

		/*
			determine if user is on a mac mobile device: http://www.sitepoint.com/10-jquery-ipad-code-snippets-plugins/
		*/
		var deviceAgent = navigator.userAgent.toLowerCase();
		var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
		if (agentID) {

	        // Do not refresh all the time.
		 
		} else {
			/*
				On resize, re-load the page.
			*/
			// $(window).resize(function(){location.reload();});	
			// firefox work around : http://www.sitepoint.com/jquery-refresh-page-browser-resize/
			$(window).bind('resize', function(e)
			{
			  if (window.RT) clearTimeout(window.RT);
			  window.RT = setTimeout(function()
			  {
			    this.location.reload(false); /* false to get page from cache */
			  }, 200);
			});
		}		
	}

	/*
		If the configurator popup is displayed, allow for it to be closed
	*/
	$("p.close-window").on("click", function(){
		$("div.configurator-button").animate({bottom: "-190px"}, 1000);
	});  

});





function rotateFirstHero() {
	// console.log("Start Rotation");
	
	/*
		from page: 
	*/
    var intId;
    var $banners = $('.banners');
    var timeout = 16000;
    var loopCounter = 1;
    var loopsToDo = parseInt($banners.data('loops'));

    $banners.find('img:gt(0)').hide();

    function imageRotation() {
    	/*
			from: http://stackoverflow.com/questions/31960362/jquery-loop-through-images
    	*/

        var $current = $banners.find('img:visible');
        var $next = $current.next();

        if ($next.length == 0) {
            $next = $banners.find('img:eq(0)');
            loopCounter++;
        }

        if (loopCounter <= loopsToDo) {
            
            $next.fadeIn(2000);
            $current.fadeOut(2000);
            setTimeout(imageRotation, 4000);
        }
    }
    setTimeout(imageRotation, 4000);
}





function setupPage() {
	// console.log("function setupPage called.");

	/*
		Remove footer and back to top div from page.
	*/
	$("footer").css("display", "none");

	/* 
		Adjust back to top button
	*/
	$("div.back-to-top").css("display", "none");


	/* 
		Change the header positioning from "fixed" to "relative". This will allow it to push the other elements down the page.
	*/
	$("header.main-nav").css("position", "relative");
	$("header.main-nav").css("background-color", "white");

	/* 
		Add margin to the top of the "div.customization-grid" that is equal to the height of the customization-blocks-link div.
	*/
	var customizationGridLinksHeight = $("div.customization-grid-links").outerHeight();
	$("div.customization-grid").css("margin-top", customizationGridLinksHeight);
	// console.log("Customization grid link div height : " + customizationGridLinksHeight);


	var headerHeight = $("header").outerHeight();
	// console.log("headerHeight : " + headerHeight);	

	var pageHeight = $(window).outerHeight();
	/* 
		After the rotating images in the first slide were added,
		the value for customizationGridHeight needed to be changed from the 
		height of the first customization-grid-block height (which is now undefined)
		to the height of the first image loaded. This should result in a more accurate
		measurement of the height.
	*/
	// var customizationGridHeight = $("div.customization-grid-block.block-1").innerHeight();
	var customizationGridHeight = $("img.rotating-image.first").height();
	// console.log("First image in rotation height : " + customizationGridHeight);



	/*
		If the available height of the entire page is taller than the height of the header, 
		slide indcator links (customizationGridLinksHeight) and the first image in the 
		first slide (customizationGridHeight), then adjust the images so the height of each fits inside the available space. 
	*/
	var availableHeight =  $(window).outerHeight() - (customizationGridLinksHeight + headerHeight + customizationGridHeight);
	// console.log ("Available height: " + availableHeight);
	if (availableHeight < 0) {
		console.log("---------------------- Smaller window height than images ----------------------");
		var totalSpaceForImage = $(window).outerHeight() - (customizationGridLinksHeight + headerHeight);
		console.log("Max height of images in each slide : " + totalSpaceForImage);

		$("div.customization-grid-image img").css("width", "auto").css("height", totalSpaceForImage);
		$("div.customization-grid-image img").css("width", "auto").css("margin", "0 auto");

		$("img.rotating-image").css("width", "auto").css("height", totalSpaceForImage);
		/*
			Reset customizationGridHeight based on new first image height.
		*/
		customizationGridHeight = $("img.rotating-image.first").height();
		console.log("New customization grid height after resize : " + customizationGridHeight);

	}

	/*

		if the page height is smaller than 700px,
		remove the paragraph tag. 

		It may be easier to set this to a solid number.
	*/
	if (pageHeight < 700) {
		console.log ("Page height is less than 700px. Remove the paragraph descriptions in the mega menus.");
		$("p.subnav-descriptions").css("display", "none");
	}




	/*
		Prevent page from showing scroll bars.
		-- updated 2-19-2016, removed x overflow. 
	*/
	// $("body").css("overflow", "scroll").css("overflow-y", "hidden");
	$("body").css("overflow", "hidden");




	/*
		Establish the heights for all of the separate blocks that will end up being displayed.
	*/
	var block1Height = 0;
	// console.log("Block 1 height = " + block1Height);

	var block2Height = customizationGridHeight - 107;
	 // console.log("Block 2 height = " + block2Height);

	var block3Height = ($("div.customization-grid-block.block-2").outerHeight()) + block2Height;
	// console.log("Block 3 height = " + block3Height);

	var block4Height = ($("div.customization-grid-block.block-3").outerHeight()) + block3Height;
	// console.log("Block 4 height = " + block4Height);

	var block5Height = ($("div.customization-grid-block.block-4").outerHeight()) + block4Height;
	//  console.log("Block 5 height = " + block5Height);

	var block6Height = ($("div.customization-grid-block.block-5").outerHeight()) + block5Height;
	// console.log("Block 6 height = " + block6Height);

	var block7Height = ($("div.customization-grid-block.block-6").outerHeight()) + block6Height;
	// console.log("Block 7 height = " + block7Height);

	var block8Height = ($("div.customization-grid-block.block-7").outerHeight()) + block7Height;
	 // console.log("Block 8 height = " + block8Height);

	var block9Height = ($("div.customization-grid-block.block-8").outerHeight()) + block8Height;
	 // console.log("Block 9 height = " + block9Height);
	
	var block10Height = ($("div.customization-grid-block.block-9").outerHeight()) + block9Height;
	 // console.log("Block 10 height = " + block10Height);

	var block11Height = ($("div.customization-grid-block.block-10").outerHeight()) + block10Height;
	 // console.log("Block 11 height = " + block11Height);

	var block12Height = ($("div.customization-grid-block.block-11").outerHeight()) + block11Height;
	   // console.log("Block 12 height = " + block12Height);

	var blockHeightArray = new Array(block1Height, block2Height, block3Height, block4Height, block5Height, block6Height,  block7Height, block8Height, block9Height, block10Height, block11Height, block12Height);
	   var test = blockHeightArray[11];
	   // console.log("Test of array = " + test);


	/* 
		Initialize the variable slideToShow, this will be used to keep track of which slide the user has navigated to.
	*/
	var slideToShow = 0;
	var slideNumber = 0;
	var checkIndicator = 1;
	var allowScroll = true;



	/*
		When user scrolls, prevent it from the default and move the page so the next or previous slide block shows.
	*/
	$(window).bind('mousewheel DOMMouseScroll MozMousePixelScroll', slidePage);
	// console.log("mousewheel has been told to call slide page when it is triggered.");

	function slidePage(event, delta) {
		// console.log("Mouse wheel event called by bind statement.");

		event.preventDefault();


		/* 
			Depending on the type of browser, start collecting the total amount
			the user has scrolled. This will be used to cut off their ability
			to scroll after a certain amount in the slidePage function
		*/
		if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
		 	// console.log("Browser: firefox");
			var wheelChange = -(event.originalEvent.detail);
			// console.log("Firefox Wheel change: " + wheelChange);

		 } else {
		 	// console.log("Browser: not firefox");
		 	wheelChange = event.originalEvent.wheelDelta;
		 	// console.log("Chrome Wheel change: " + wheelChange);
		 }

		totalWheelChange = totalWheelChange + wheelChange;
		// console.log("Total wheel change : " + totalWheelChange);


		/* ======================================================================
		=========================================================================
			User has scrolled up.
		=========================================================================
		====================================================================== */
		if (wheelChange >= 0) {
			 console.log('Scroll up');


			if (totalWheelChange >= 600) {
	            // console.log("total wheel change over 600");
	            

				/*
					unbind scrolling, this should prevent the page from rendering any action it takes.
					from: http://stackoverflow.com/questions/3338364/jquery-unbinding-mousewheel-event-then-rebinding-it-after-actions-are-complete
				*/
				$(window).unbind('mousewheel DOMMouseScroll MozMousePixelScroll', slidePage);
				//  console.log("mousewheel event has been unbound.");

	            /* 
	              Once the user has scrolled 5 or 6 times, reset the value of "totalWheelChange" in order to start measuring when the have scrolled enough to go to the next slide.
	            */
	            totalWheelChange = 0;

	            if (slideToShow == 0) {
	            	// console.log("Slide 0, dont do anything.")

				} else if (slideToShow == 1) {
					// console.log("Slide one, Adjust header position to relative.");

					/* 
						itterate slideNumber
					*/
					slideToShow = slideToShow - 1;
					var heightToGet = blockHeightArray[slideToShow];
					// console.log("New height to get: " + heightToGet); 

					/*
						scroll to the appropriate height 
					*/
					$("html, body").animate({ scrollTop:"0px" });

					
					/* 
						Change the header positioning from "fixed" to "relative". This will allow it to push the other elements down the page.
					*/
					 $("header.main-nav").css("position", "relative");

					/*
						set the appropriate slide indicator to "checked"
					*/
					var imageURL = (siteURL + "/images/customization/progress-numbers-" + checkIndicator +".png");
					// console.log("Image to replace check with: " + imageURL);
					$("li.slide-" + checkIndicator).children().children().attr("src", imageURL);

					/*
						adjust the check indicator so the next slide will replace the green check with 
						the number of the slide the user has left.
					*/
					checkIndicator = checkIndicator - 1;

				} else {

					/* 
						itterate slideNumber
					*/
					slideToShow = slideToShow - 1;
					// console.log("Slide to show = " + slideToShow);

					var heightToGet = blockHeightArray[slideToShow];
					// console.log("New height to get: " + heightToGet); 

					/*
						scroll to the appropriate height 
					*/
					$("html, body").animate({ scrollTop: heightToGet + "px" });

					/*
						set the appropriate slide indicator to "checked"
					*/
					var imageURL = (siteURL + "/images/customization/progress-numbers-" + checkIndicator +".png");
					// console.log("Image to replace check with: " + imageURL);
					$("li.slide-" + checkIndicator).children().children().attr("src", imageURL);


					/*
						adjust the check indicator so the next slide will replace the green check with 
						the number of the slide the user has left.
					*/
					checkIndicator = checkIndicator - 1;

				}

				/*
					rebind the mouse wheel event. 
					may need to create a delay before this is available to make it 
					prevent the track pad scrolling issue.
				*/
				setTimeout( function() {$(window).bind('mousewheel DOMMouseScroll MozMousePixelScroll', slidePage);}, 1000);
				// console.log("Mouseevent rebound on mouse up.");
			}


		/* ======================================================================
		=========================================================================
			User has scrolled down.
		=========================================================================
		====================================================================== */
		} else {
			// console.log('Scroll down');

			if (totalWheelChange <= -600) {
				//  console.log("total wheel change less than -600");
				
				/*
					unbind scrolling, this should prevent the page from rendering any action it takes.
					from: http://stackoverflow.com/questions/3338364/jquery-unbinding-mousewheel-event-then-rebinding-it-after-actions-are-complete
				*/
				$(window).unbind('mousewheel DOMMouseScroll MozMousePixelScroll', slidePage);
				// console.log("mousewheel event has been unbound.");

				/* 
					adjust header.main nav position to fixed until the user has scrolled back up to the first frame;
				*/
				 $("header.main-nav").css("position", "fixed");

				

				if (slideToShow == 11) {
					console.log("Slide number twelve, do nothing'.");


					/*
						scroll to the appropriate height 
					*/
					// $("html, body").animate({ scrollTop: block12Height + "px" });

				} else if (slideToShow == 10) {
					/* 
						itterate slideNumber
					*/
					slideToShow = slideToShow + 1;
					//  console.log("Slide to show = " + slideToShow); 

					/*
						scroll to the appropriate height 
					*/
					$("html, body").animate({ scrollTop: block12Height });

					/*
						set the appropriate slide indicator to "checked"
					*/
					checkIndicator = checkIndicator + 1;
					console.log("Replace original number with check for: " + checkIndicator);
					var imageURL = (siteURL + "/images/customization/progress-numbers-completed-last.png");
					$("li.slide-" + checkIndicator).children().children().attr("src", imageURL);



				} else {

					/* 
						 After the user has scrolled twice, display the "Launch Configurator Popup"
					*/
					if (slideToShow== 2) {
						
						setTimeout (
						  function(){
						  $("div.configurator-button").animate({bottom: "0px"}, 3000);
						}, 1000);


					}







					/* 
						itterate slideNumber
					*/
					slideToShow = slideToShow + 1;
					console.log("Slide to show = " + slideToShow); 


					var heightToGet = blockHeightArray[slideToShow];
					// console.log("New height to get: " + heightToGet);

					/*
						scroll to the appropriate height 
					*/
					$("html, body").animate({ scrollTop: heightToGet + "px" });

					/*
						set the appropriate slide indicator to "checked"
					*/
					checkIndicator = checkIndicator + 1;
					 console.log("Replace original number with check for: " + checkIndicator);

					var imageURL = (siteURL + "/images/customization/progress-numbers-completed.png");
					$("li.slide-" + checkIndicator).children().children().attr("src", imageURL);

				}

				/*
					Reset wheel change to 0 so user can begin scrolling again.
				*/ 
				totalWheelChange = 0;

				/*
					rebind the mouse wheel event. 
					may need to create a delay before this is available to make it 
					prevent the track pad scrolling issue.
				*/
				setTimeout( function() {$(window).bind('mousewheel DOMMouseScroll MozMousePixelScroll', slidePage);}, 1000);
				// console.log("Mouseevent rebound on mouse down.");

				}

		}

	}
}


function setupMobile() {
	/*
		hide the numbered links
	*/

	$("div.customization-grid").css("position","relative");
	$("div.customization-grid-links").css("display", "none");

	var gridTextNum = 2;
	while (gridTextNum <= 11) {
		$("div.grid-text-" + gridTextNum).css("position", "relative");
		gridTextNum++;
	}

	$("div.customization-grid-block.block-1").css("display", "none");
	$("div.customization-grid-block.block-12").css("display", "none");

	$("div.customization-grid-block").css("margin-bottom", "25%");

}
