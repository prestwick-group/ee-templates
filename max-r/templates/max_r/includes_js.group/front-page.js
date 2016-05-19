var siteURL = "http://max-r.net";
// console.log("Firefox-Test");


/*
	initialize the scroll total, allow scroll and totalWheelChange functionalities.
*/
var scrollTotal = 0;
var allowScroll = true;
var totalWheelChange = 0;

/*
	initialize variables to measure page dimensions
*/
var pageHeight = null;
var pageWidth = null;

/*
	Initialize the hero heights as well as all of the individual objects that will be "slid" to.
*/
var heroHeight = null;
var heroWidth = null;
var thirdSlideHeight = null;

var productIntroContainerHeight = null;
var fourthSlideHeight = null;

var caseStudySliderHeight = null;
var fifthSlideHeight = null;

var footerHeight = null;
var sixthSlideHeight = null;



$(window).load(function (){
 	$("html, body").animate({ scrollTop: "0px" });

 	/*
		the variable "windowSize" is established in "default.js" based on the width
		of the browser window the user currently has open.
 	*/
	//  console.log("Page size : " + windowSize);






	/* 
		Window size is large, display scrolljacking content
	*/
	if(windowSize=='large')  {


		setupPage();


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


	} else {
		/* 
			Window is smaller than large, display images laid out in order.  
		*/
		console.log("Page is medium or small, layout the page with css only.");	

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

// Test variables/function calls below this line. Remove after confirmed.
// ----------------------------------------------------------------------

});





function setupPage(){
	// console.log("setupPage function called.");

	/*
		Prevent page from showing scroll bars. 
	*/
    $('body').css("overflow", "hidden");

    /*
		After page has loaded, establish window width and height. 
		This will be used to determine if the images and div's have
		the appropriate amount of space to be displayed in the window
		or if they need to be resized.
    */
	pageWidth = $('body').innerWidth();
	pageHeight = $(window).outerHeight();
	// console.log("pageHeight : " + pageHeight);



	/*
		Establish header height to determine the amount of space
		the hero images and divs can occupy on the page.
	*/
	var headerHeight = $("header.main-nav").outerHeight();
	// console.log("width: " + heroWidth + " and height: " + heroHeight);

	/*
		Move div.page-container down the height of the header.main-nav
	*/
	$("div.page-container").css("padding-top", headerHeight);


	/*
		Establish the amount of space below the header available for the 
		images and divs to occupy.
	*/
	var availableHeight = pageHeight - headerHeight;
	var doubleAvailableHeight = availableHeight*2;
	console.log("Available height for hero images and divs : " + availableHeight);







/*
	because the hero image has been moved to the background image placement,
	there is no longer a "heroHeigh" able to be collected.
*/


	/* 
		Test to see if the available window height is smaller than the hero images. 
	*/
	if (heroHeight > availableHeight) {
		console.log("------- Height of hero images is greater than the height of the availabelHeight of the page. -------");
		/* 
			Resize the hero images and the divs to fit within the limited height of the window.
		*/
		$("div.home-page-hero").css("height", availableHeight);
		$("div.home-page-hero-text.first").css("height", availableHeight);
		$("div.home-page-hero-text.second").css("height", availableHeight);
		$("div.home-page-hero-text.second").css("height", availableHeight);
		$("img#first-hero").css("max-height", availableHeight);
		$("img#second-hero").css("max-height", availableHeight);
		$("img#third-hero").css("max-height", availableHeight);
		/*
			Re-establish heroHeight
		*/
		heroHeight = $("img#first-hero").outerHeight();
		doubleHeroHeight = heroHeight * 2;
		console.log("Resized hero height : " + heroHeight);

		

	}



	/*

		if the page height is smaller than 700px,
		remove the paragraph tag. 

		It may be easier to set this to a solid number.
	*/
	if (pageHeight < 780) {
		console.log ("Page height is less than 700px. Remove the paragraph descriptions in the mega menus.");
		$("p.subnav-descriptions").css("display", "none");

		/*
			On the "product intro" block, move the links up so they are viewable
		*/
		$("div.product-category-buttons").css("bottom", "35%");
	}



	/*
		Establish heigt of the home page hero containers so the first slides are all 
		the same height as the browser window.
	*/
	$("div.home-page-hero").css("height", availableHeight);

	/*
		Establish the heights of the hero images.
		Removed: 2-20-2016 lincoln
	*/
	/*
	heroWidth = $("img#first-hero").outerWidth();
	heroHeight = $("img#first-hero").outerHeight();
	var doubleHeroHeight = (heroHeight*2);
	*/
	// console.log("heroHeight: " + heroHeight + ", heroWidth: " + heroWidth);

	/*
		Establish heights of hero divs
		-- This will need to be curtailed by the condition that the hero image 
		cant be taller than the avialable height of the window minus the 'header'.
	*/
	$("div#featured-slides").css("height", availableHeight);


	/*
		Before re-establishing the heights for the hero divs if the page is small, set them up 
		based on the hero image heights.
	*/
	$("div.home-page-hero-text.first").css("height", availableHeight);
	$("div.home-page-hero-text.second").css("height", availableHeight);
	$("div.home-page-hero-text.third").css("height", availableHeight);

/*
	$("img#first-hero").css("top", 0);	
	$("img#second-hero").css("top", heroHeight);
	$("img#third-hero").css("top", doubleHeroHeight);
*/

	/*
		Positioning of div.home-page-hero-text above scrolling images
	*/
	$("div.home-page-hero-text.first").css("top", 0);
	$("div.home-page-hero-text.second").css("top", availableHeight);
	$("div.home-page-hero-text.third").css("top", doubleAvailableHeight);



	$("span.bullet1").on("click", function(){
		if(scrollTotal!=0) {
			// console.log("User clicked on bullet1");
			/* 
				change scrollTop to 0
			*/
			scrollTotal = 0;
			// console.log("scrollTotal : " + scrollTotal);
			/*
				adjust positioning of the slide
			*/
			slideHeight = 0;
			// console.log("slideHeight : " + slideHeight);
			
			$('div#featured-slides-scroll').animate({'top': slideHeight}, 1000);

			/* 
				update bullet active state.
			*/
			$("span.bullet1").addClass("active");			
			$("span.bullet2").removeClass("active");
			$("span.bullet3").removeClass("active");

		} else {
			// console.log("User clicked bullet1 but is on the first frame. Do nothing.")
		}
	});


	$("span.bullet2").on("click", function(){
		if(scrollTotal!=1) {
			// console.log("User clicked on bullet2");
			/* 
				change scrollTop to 0
			*/
			scrollTotal = 1;
			// console.log("scrollTotal : " + scrollTotal);
			/*
				adjust positioning of the slide
			*/
			slideHeight = availableHeight * scrollTotal;
			// console.log("Scroll down slideHeight : " + slideHeight);
			
			$('div#featured-slides-scroll').animate({'top': -slideHeight}, 1000);		

			/* 
				update bullet active state.
			*/
			$("span.bullet1").removeClass("active");			
			$("span.bullet2").addClass("active");
			$("span.bullet3").removeClass("active");

		} else {
			// console.log("User clicked bullet2 but is on the second frame. Do nothing.")
		}
	});


	$("span.bullet3").on("click", function(){
		if(scrollTotal!=2) {
			// console.log("User clicked on bullet3");
			/* 
				change scrollTop to 0
			*/
			scrollTotal = 2;
			// console.log("scrollTotal : " + scrollTotal);
			/*
				adjust positioning of the slide
			*/
			slideHeight = availableHeight * scrollTotal;
			// console.log("Scroll down slideHeight : " + slideHeight);
			
			$('div#featured-slides-scroll').animate({'top': -slideHeight}, 1000);

			/* 
				update bullet active state.
			*/
			$("span.bullet1").removeClass("active");			
			$("span.bullet2").removeClass("active");
			$("span.bullet3").addClass("active");

		} else {
			// console.log("User clicked bullet3 but is on the third frame. Do nothing.")
		}
	});



	/*
		When user scrolls, prevent it from the default and move the page so the next or previous slide block shows.
	*/
	$(window).bind('mousewheel DOMMouseScroll MozMousePixelScroll', slidePage);

	function slidePage(event, delta) {
		// console.log("inside slidePage function called on user scroll.");


		event.preventDefault();
		// event.stopPropagation();


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
		 	var wheelChange = event.originalEvent.wheelDelta;
		 	// console.log("Chrome Wheel change: " + wheelChange);
		 } 

		totalWheelChange = totalWheelChange + wheelChange;
		// console.log("Total wheel change : " + totalWheelChange);



         /* =================================================================
        ====================================================================
        		While the scrollTotal is less than 6
	    		determine if the scroll is up or down and peform the actions 
	    		needed to move the page up or down.
        ====================================================================
        ================================================================= */
		// console.log("scrollTotal : " + scrollTotal);
        if (scrollTotal < 6) {
    	// console.log("Mouse Scrolled and scrollTotal < 6");



	        /* =================================================================
	        ====================================================================
	        		Scroll up
	        ====================================================================
	        ================================================================= */
		    if (wheelChange >= 0) {
		        // console.log('Scroll up');

				if (totalWheelChange >= 600) {			        

					/*
						Remove scrolling from site.
					*/
					$(window).unbind('mousewheel DOMMouseScroll MozMousePixelScroll', slidePage);
					// console.log("mouse scroll unbound from page on scroll up.");

				    /*
						Reset wheel change to 0 so user can begin scrolling again.
					*/ 
					totalWheelChange = 0;



			        if (scrollTotal==0) {
				    	// 	console.log("scrollTotal is 0, top of the sliding page");
				    } else {
			        	//	console.log("Scroll total is " + scrollTotal + ", move up the page.");
				    	if(allowScroll==true) {
				        	/*
								set allow scroll to false in order to prevent scrolling function from firing.
								both userScrollUp and userScrollDown contain a timer of 3 seconds which then sets allowScroll to true.
				        	*/
				    		allowScroll = false;
				    		// console.log("allowScroll is false after mouse up");

				    		userScrollUpPause();
				    	}
				    }

					/*
						rebind the mouse wheel event. 
						may need to create a delay before this is available to make it 
						prevent the track pad scrolling issue.
					*/
					setTimeout( function() {$(window).bind('mousewheel DOMMouseScroll MozMousePixelScroll', slidePage);}, 1000);
					// console.log("Mouseevent rebound on mouse up.");	
								    
				} else {
				// 	console.log("totalWheelChange has not yet hit 600");
				}


	        /* =================================================================
	        ====================================================================
	        		Scroll down
	        ====================================================================
	        ================================================================= */
		    } else {
		        // console.log("Scroll down.");
			    
				if (totalWheelChange <= -600) {
					//  console.log("total wheel change less than -600");

					/*
						unbind scrolling, this should prevent the page from rendering any action it takes.
						from: http://stackoverflow.com/questions/3338364/jquery-unbinding-mousewheel-event-then-rebinding-it-after-actions-are-complete
					*/
					$(window).unbind('mousewheel DOMMouseScroll MozMousePixelScroll', slidePage);
					// console.log("mousewheel event has been unbound.");

				    /*
						Reset wheel change to 0 so user can begin scrolling again.
					*/ 
					totalWheelChange = 0;


			        if(allowScroll==true) {
			        	/*
							set allow scroll to false in order to prevent scrolling function from firing.
							both userScrollUp and userScrollDown contain a timer of 3 seconds which then sets allowScroll to true.
			        	*/
			    		allowScroll = false;
			    		// console.log("allowScroll is false after mouse down");

			        	userScrollDownPause();
			    	}


					/*
						rebind the mouse wheel event. 
						may need to create a delay before this is available to make it 
						prevent the track pad scrolling issue.
					*/
					setTimeout( function() {$(window).bind('mousewheel DOMMouseScroll MozMousePixelScroll', slidePage);}, 1000);
					// console.log("Mouseevent rebound on mouse down.");		    

			    } else {
			    	// console.log("totalWheelChange has not yet hit -600");
			    }


		    }

        /* =================================================================
        ====================================================================
        		scrollTotal is greater than 6, 
        		something is broken.
        ====================================================================
        ================================================================= */
		} else {
			/*
				The user has scrolled to the bottom of the page.
				They should never be allowed to scroll to "scrollTotal =7"
			*/
			console.log("The user has scrolled past scrollTotal = 6");
			console.log("Check for errors");
			

		}
	/* --- End of function slidePage --- */
	}



	/* =================================================================
	====================================================================
			Scroll up function
	====================================================================
	================================================================= */
	function userScrollUpPause(){
		// console.log("function userScrollUpPause called");
		// console.log("pre-process scrollTotal : " + scrollTotal);


		switch(scrollTotal) {
			/*
				if scrollTotal is 0, page is at the "top"
			*/
			case 0:
				// console.log("scrollTotal : " + scrollTotal);
				slideHeight = 0;
				// console.log("slideHeight : " + slideHeight);
				
				$('div#featured-slides-scroll').animate({'top': slideHeight}, 1000);

				/*
					Change active slide button to #2.
				*/
				$("span.bullet1").addClass("active");			
				$("span.bullet2").removeClass("active");
				$("span.bullet3").removeClass("active");
					

				allowScroll = true;

				break;

			/*
				if scrollTotal is 2, display the third and final hero image
			*/
			case 1:
				scrollTotal -= 1;
				// console.log("scrollTotal : " + scrollTotal);

				slideHeight = 0;
				// console.log("slideHeight : " + slideHeight);
				
				$('div#featured-slides-scroll').animate({'top': slideHeight}, 1000);

				/*
					Change active slide button to #2.
				*/
				$("span.bullet1").addClass("active");			
				$("span.bullet2").removeClass("active");
				$("span.bullet3").removeClass("active");
					

				allowScroll = true;

				break;
			
			/*
				if scrollTotal is 2, display the third and final hero image
			*/
			case 2:
				scrollTotal -= 1;
				// console.log("scrollTotal: " + scrollTotal);

				slideHeight = -slideHeight + availableHeight;
				// console.log("slideHeight : " + slideHeight);
				
				$('div#featured-slides-scroll').animate({'top': slideHeight}, 1000);
				$("footer").animate({'top': '0'}, 500);	


				/*
					Change active slide button to #2.
				*/
				$("span.bullet1").removeClass("active");			
				$("span.bullet2").addClass("active");
				$("span.bullet3").removeClass("active");


				allowScroll = true;

				break;


			case 3:
				scrollTotal -= 1;
				// console.log("scrollTotal: " + scrollTotal);


				$("div.page-container").animate({'top': '0'}, 1000);

				//	$("div.page-container").animate({'top': -thirdSlideHeight}, 500);			
				//	$("footer").animate({'top': -thirdSlideHeight}, 500);	
				

				allowScroll = true;

				break;


			case 4:
				scrollTotal -= 1;
				// console.log("scrollTotal: " + scrollTotal);

				// console.log("Third slide height : " + thirdSlideHeight);

				$("div.page-container").animate({'top': -thirdSlideHeight}, 500);		
				$("footer").animate({'top': -thirdSlideHeight}, 500);


				allowScroll = true;

				break;


			case 5:
				scrollTotal -= 1;
				// console.log("scrollTotal: " + scrollTotal);

				// console.log("Fourth slide height : " + fourthSlideHeight);

				$("div.page-container").animate({'top': -fourthSlideHeight}, 500);		
				$("footer").animate({'top': -fourthSlideHeight}, 500);


				allowScroll = true;

				break;	
		}

	}


	/* =================================================================
	====================================================================
			Scroll down function
	====================================================================
	================================================================= */
	function userScrollDownPause(){
		// console.log("function userScrollDownPause called");
		// console.log("pre-process scrollTotal : " + scrollTotal);

		switch(scrollTotal) {
			/*
				if scrollTotal is 0, page is at the "top"
			*/
			case 0:
				scrollTotal += 1;
				// console.log("scrollTotal : " + scrollTotal);

				slideHeight = availableHeight * scrollTotal;
				// console.log("Scroll down slideHeight : " + slideHeight);
				
				$('div#featured-slides-scroll').animate({'top': -slideHeight}, 1000);

				/*
					Change active slide button to #2.
				*/
				$("span.bullet1").removeClass("active");			
				$("span.bullet2").addClass("active");
				$("span.bullet3").removeClass("active");


				allowScroll = true;

				break;	

			case 1:
				scrollTotal += 1;
				// console.log("scrollTotal : " + scrollTotal);

				slideHeight = availableHeight * scrollTotal;
				// console.log("Scroll down slideHeight : " + slideHeight);
				
				$('div#featured-slides-scroll').animate({'top': -slideHeight}, 1000);

				/*
					Change active slide button to #3.
				*/
				$("span.bullet1").removeClass("active");
				$("span.bullet2").removeClass("active");			
				$("span.bullet3").addClass("active");

				allowScroll = true;

				break;
			/*
				if scrollTotal is 2, after scrolling down, move the div.page-container up the height of the img.first-hero
			*/

			case 2:
				scrollTotal += 1;
				// console.log("scrollTotal : " + scrollTotal);
				
				thirdSlideHeight = availableHeight;
				// console.log("Third slide height: " + thirdSlideHeight);


				$("div.page-container").animate({'top': -thirdSlideHeight}, 500);
				$("footer").animate({'top': -thirdSlideHeight}, 500);


				allowScroll = true;

				break;
			/*
				if scrollTotal is 2, display the third and final hero image
			*/

			case 3:
				scrollTotal += 1;
				// console.log("scrollTotal : " + scrollTotal);

				productIntroContainerHeight = $("section.product-intro-container").outerHeight();
				fourthSlideHeight = availableHeight + productIntroContainerHeight;
				// console.log("Fourth slide height : " + fourthSlideHeight);

				$("div.page-container").animate({'top': -fourthSlideHeight}, 500);
				$("footer").animate({'top': -fourthSlideHeight}, 500);

				allowScroll = true;

				break;
			/*
				if scrollTotal is 4, move page down to the testimonials section.
				find the starting point and slide to it.
			*/
			case 4:
				scrollTotal += 1;
				// console.log("scrollTotal : " + scrollTotal);

				caseStudySliderHeight = $("section.case-study-slider").outerHeight();
				fifthSlideHeight = availableHeight + productIntroContainerHeight + caseStudySliderHeight;
				// console.log("Fifth slide height : " + fifthSlideHeight);

				$("div.page-container").animate({'top': -fifthSlideHeight}, 500);
				$("footer").animate({'top': -fifthSlideHeight}, 500);

				allowScroll = true;

				break;
			/*
				if scrollTotal is 6, move page down to the footer.
				find the starting point and slide to it.
			*/
			case 5:
				footerHeight =  0.5*($("footer").outerHeight());
				// console.log("scrollTotal : " + scrollTotal);

				sixthSlideHeight = fifthSlideHeight + footerHeight;
				// console.log("Sixth slide height : " + sixthSlideHeight);

				$("div.page-container").animate({'top': -sixthSlideHeight}, 500);
				$("footer").animate({'top': -sixthSlideHeight}, 500);


				allowScroll = true;

				break;
		}	
	/* --- end function userScrollDownPause --- */
	}


}




function setupMobile(){
    /*
		After page has loaded, establish window width and height. 
		This will be used to determine if the images and div's have
		the appropriate amount of space to be displayed in the window
		or if they need to be resized.
    */
	pageWidth = $('body').innerWidth();
	pageHeight = $(window).outerHeight();
	console.log("pageHeight : " + pageHeight);

	/*
		Establish hero image height and width.

		--- 3/9/2016 -- Move to CSS : _page-type-home.scss
	*/

	// $("div#featured-slides").css("height", "400px");
	// $("div.home-page-hero-text").css("height", "400px");
	/* 
		Remove scrolling buttons
	*/
	// $("div.scroll-buttons").css("display", "none");
	if(pageWidth <= 400) {
		// $("div#featured-slides").css("height", "530px");
		//$("div.home-page-hero-text").css("height", "530px");
		// $("div.home-page-hero-text.first").css("padding-top", "140px");
		// $("div.product-category-buttons").css("position", "relative");
		$("section.case-study-slider").css("display", "none");
	}
}




