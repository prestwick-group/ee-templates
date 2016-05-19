var windowSize = "";
var windowWidth = 0;
var actualSize = 0;
var siteURL = "http://max-r.net"

$(document).ready(function(){
	setInterval('checkBrowserSize()',100);
	checkBrowserSize();
	addBackToTopButton();
});





function checkBrowserSize(){
		
	actualSize = $('body').innerWidth();
	// console.log(actualSize);
	// body.innerWidth is 17 pixels narrower than the Viewport size reported by "resize window"
/*
	-- width of large increased to 1024 on 2-15-2016 to account for ipad horizontal layout.
	if(actualSize > 961){ newWindowSize = 'large'; }
	if(actualSize <= 961){ newWindowSize = 'medium'; }
*/
	if(actualSize > 1024){ newWindowSize = 'large'; }
	if(actualSize <= 1024){ newWindowSize = 'medium'; }


	// if there is a window size change that switches the "newWindowSize" variable, load the new window content.
	if(windowSize != newWindowSize){
		windowSize = newWindowSize;


		// turning off any recorded header updates keeps the mobile menu from firing multiple times
		// this resulted in the mobile menu not display when the button was clicked. 11/3/2015
		$('header').find("*").off();
		// $('a.mobile-menu').off();

		if(newWindowSize == 'large'){
			// alert('large window detected');
			$('nav.nav-block').find("*").off();
			
			clearMobileNav();
			loadLargeWindowContent();
		
		} else {
			// alert('non large window detected');
			$('nav.nav-block').find("*").off();

			clearMobileNav();
			loadMediumWindowContent();

		}
	}


}





/* ----------------------------------------------------------------------------
	Load large window content 
----------------------------------------------------------------------------- */
function loadLargeWindowContent(){
	$('nav').css('height','auto');

	$('nav.nav-block').css('display', 'block');
	$(".current").removeClass("current");	

	$('img.expand').css('display', 'none');

	// added to clear the "close submenu" button -- Lincoln 11/19/2015
	$('div.close-submenu-button').off();

	displayProductMenu();
	displayMarketsMenu();
	displayResourcesMenu();
	// displayCollectionsMenu();
	displayAboutMenu();
	displaySearchMenu();
	closeSubmenuButton();

}



function displayProductMenu() {
	$('a.product-menu').on('click',function(){
		 displaySubnav("product");
	});
}

function displayResourcesMenu() {
	$("a.resources-menu").click(function() {
		displaySubnav("resources");
	});
}

function displayMarketsMenu() {
	$("a.markets-menu").click(function() {	
		displaySubnav("markets");
	});
}

/*
function displayCollectionsMenu() {
	$("a.collections-menu").click(function() {	
		displaySubnav("collections");
	});
}
*/

function displayAboutMenu() {
	$("a.about-menu").click(function() {	
		displaySubnav("about");
	});
}

function displaySearchMenu() {
	$("a.search-menu").click(function() {	
		// console.log("Clicked on search icon");
		/*
			For some reason, when the search button is clicked, if the user has scrolled down the page, it doesn't move to the top of the page like the rest of the menus.
		*/
		$('html,body').scrollTop(0);
		displaySubnav("search");
	});
}

function closeSubmenuButton() {
	$("div.close-submenu-button").click(function() {
		// console.log("close submenu button clicked");
		$(this).parent().slideToggle("fast");
		$("a").removeClass("current");
	});
}



function displaySubnav(subnavToReveal) {
	// The basic display / retract function for each sub-menu
	// console.log(subnavToReveal);

	if(subnavToReveal!="search") {
		// console.log("reveal search");
		if($("div#search-subnav").is(":visible")){
			$("div#search-subnav").slideToggle("fast");
			$("a.search-menu.current").removeClass("current");
		}
	}

	if(subnavToReveal!="product") { 
		// console.log(subnavToReveal);
		if($("div#product-subnav").is(":visible")){
			$("div#product-subnav").slideToggle("fast");
			$("a.product-menu.current").removeClass("current");
		}
	}
	if(subnavToReveal!="resources") { 
		if($("div#resources-subnav").is(":visible")){
			$("div#resources-subnav").slideToggle("fast");
			$("a.resources-menu.current").removeClass("current");
		}
	}
	if(subnavToReveal!="markets") { 
		if($("div#markets-subnav").is(":visible")){
			$("div#markets-subnav").slideToggle("fast");
			$("a.markets-menu.current").removeClass("current");
		}
	}
	/*
	if(subnavToReveal!="collections") { 
		if($("div#collections-subnav").is(":visible")){
			$("div#collections-subnav").slideToggle("fast");
			$("a.collections-menu.current").removeClass("current");
		}
	}
	*/
	if(subnavToReveal!="about") { 
		if($("div#about-subnav").is(":visible")){
			$("div#about-subnav").slideToggle("fast");
			$("a.about-menu.current").removeClass("current");
		}
	}
	$('div#' + subnavToReveal + '-subnav').slideToggle(400);
	$("a." + subnavToReveal +  "-menu").toggleClass("current");

}







/* ----------------------------------------------------------------------------
	Load medium window content 
----------------------------------------------------------------------------- */
function loadMediumWindowContent(){
	$('nav').css('height','0px');

	// if any main nav items were active, remove the 'current' class
	$(".current").removeClass("current");	
	
	displayMobileSubnav();
	
	// if any of the subnav were visible, remove them.
	$('div#product-subnav').css('display', 'none');
/* 	$('div#collections-subnav').css('display', 'none'); */
	$('div#markets-subnav').css('display', 'none');
	$('div#about-subnav').css('display', 'none');
	$('div#resources-subnav').css('display', 'none');
	$('div#search-subnav').css('display', 'none');


}



/* ----------------------------------------------------------------------------
	Display mobile subnav
----------------------------------------------------------------------------- */
function displayMobileSubnav() {
	// console.log("displayMobileSubnav");
	
	// $('nav.nav-block').css('display', 'none');
	$('nav.nav-block').css('margin', '0');
	
	// when mobile meun is clicked, display the links in the subnav
	$("a.mobile_menu").click(function() {
		// console.log("------------------------")
		// console.log("clicked mobile menu link");
		
		// move page back to top
		$('html, body').animate({ scrollTop: 0 }, 0);
		
		// If the serach subnav is open, close it.
		if($("div#search-subnav").is(":visible")){
			$("div#search-subnav").slideToggle("fast");
			$("a.search-menu").removeClass("current");
		}

		// turn off any record of the nav block being open.
		// if this is removed, when a user clicks on, off and on the "menu" button,
		// the subnavs will open and close repeatedly.
		$('nav.nav-block').find("*").off();
		// console.log("nav.nav-block off triggered.");


		// change "menu" to "close menu"
		$("a.mobile_menu").text("CLOSE MENU");
		// console.log("display a.mobile_menu test as CLOSE MENU.");


		$('header.main-nav').css("background-color", "#f1f1f1");
		// $('header.main-nav').css("position", "absolute");
		
		// Image expand is used in the product subnav to display more options, ie "recycling, beverages".
		$('img.expand').css('display', 'inline');


		// get and display window height
		var bodyHeight = $("body").height();
		var windowHeight = $(window).height();
		// console.log ("body height: " + bodyHeight + " -- window height: " + windowHeight);

		if (windowHeight < bodyHeight) {
			var minHeight = bodyHeight; 
		} else {
			var minHeight = windowHeight;
		}

		// Display the nav content area if it is currently set to 0.
		var navHeight = $('nav.nav-block').height();

		if(navHeight == 0){
			console.log ("navHeight is 0");
			$('nav.nav-block').css('height', 'auto');
			$('nav.nav-block').css('display', 'block');
			$('header.main-nav').css('min-height', minHeight);

			// if a submenu had previously been open, this resets the - to +
			$('img.expand').attr("src", siteURL + "/images/header/expand.png");

		} else {
			// call the clear mobile nav function to get rid of the applied styling.
			clearMobileNav()
		}	


		// When the Products link is clicked, open the basic products sub menu.
		$('a.product-menu').click(function() {
			// change img.expand to collapse.jpg instead of expand.jpg
			event.preventDefault();
			changeExpandImage("products");
			expandMenu("product");
		});
/*
		$('a.collections-menu').click(function() {
			// change img.expand to collapse.jpg instead of expand.jpg
			event.preventDefault();
			changeExpandImage("collections");
			expandMenu("collections");
		});
*/
		$('a.markets-menu').click(function() {
			// change img.expand to collapse.jpg instead of expand.jpg
			event.preventDefault();
			changeExpandImage("markets");
			expandMenu("markets");
		});
		$('a.about-menu').click(function() {
			// change img.expand to collapse.jpg instead of expand.jpg
			event.preventDefault();
			changeExpandImage("about");
			expandMenu("about");
		});
		$('a.resources-menu').click(function() {
			// change img.expand to collapse.jpg instead of expand.jpg
			event.preventDefault();
			changeExpandImage("resources");
			expandMenu("resources");
		});
	});


}


function expandMenu(menuToExpand) {
	$('div.' + menuToExpand + '-subnav-mobile').toggle(function(){
	});
}


function changeExpandImage(menuImageToChange){
	var imagePath =  siteURL + "/images/header/expand.png";
	// console.log ("Image Path = " + imagePath);

	var sourceImage = $("img.expand." + menuImageToChange).attr("src");
	// console.log ("Source Image = " + sourceImage);

  	if (sourceImage == imagePath) {
  		// console.log("The current state is the expand button");
  		$("img.expand." + menuImageToChange).attr("src", siteURL + "/images/header/collapse.png");
  	} else {
  		// console.log("The current state is the collapse button");
  		$("img.expand." + menuImageToChange).attr("src", siteURL + "/images/header/expand.png");
  	}

 
}

function clearMobileNav(){
	$('header.main-nav').css('height', "auto");
	$('header.main-nav').css("background-image", "none");
 	// $('header.main-nav').css('position', 'relative');
	$('header.main-nav').css('min-height', '0');
	
	$("a.mobile_menu").text("MENU");

	$("div.subnav-mobile:visible").css("display", "none");

	$('nav.nav-block').css('height','0');
	$('nav.nav-block').css('display', 'none');
		
	$('header.main-nav').css("background-color", "#ffffff");		
}





function addBackToTopButton(){
	// if page length is greater than 1000px
	// and offset from top is greater than 100px
	// display the back-to-top div and image.
	var bodyHeight =  $("body").height();
	var ofsetTopValue = 300;

	if (bodyHeight>="1100") {
		
		$(window).scroll(function(){ 
			// console.log("Page Scrolled.");
			var distanceScrolled = $(window).scrollTop();
			// console.log (distanceScrolled);
			
			if (distanceScrolled >= 200) {
				// console.log("add back to top button");
				
				$("div.back-to-top").css("display", "block");	
				$("div.back-to-top").on('click', function(){
					
					// console.log("scroll to top");
					$('body,html').stop().animate({
						scrollTop: 0 ,
						}, 700
					);
				});

			} else {
				$("div.back-to-top").css("display", "none");
			}
		});

	}
}