$(window).load(function () { 
	// console.log("collections.js loaded.")

	/*
		Clicking on a category name reveals the list of product groups available in this collection.
		This isn't done on mobile, clicking on the group in mobile takes the user to that product group filtered by the collection.
	*/
	$("h3.category-link").click( function() {
		
		
		console.log("Close and deactivate any currently active filters");
		/*  
			Check to see if any of the h3 silings have the 'active' state
		*/
		if ($(this).siblings('.filter').hasClass("active")) {
			console.log("There is already an active filter.");
				
			/*
				Reset the product group filters and the toggle text
			*/
			$("div.product-group-filters").css('display', 'none');
			$("span.product-category-toggles").text("+");
		}



		var menuToShow = ($(this).attr("class").split(' ')[3]) + "-filters";
		console.log("Test Menu to show: " + menuToShow);
		$("div." + menuToShow).toggle("slow");
		
		var menuToToggle = ($(this).attr("class").split(' ')[3]);
		$("span.toggle-" + menuToToggle).text(function(i, text){
			return text === "-" ? "+" : "-";
		})



	});



	if (newWindowSize == 'large'){ 
		currentWindowSize = "large";

		/* 
			Set up page as the desktop version 
		*/
		constructLargeScreenFiltering();


	} else {
		/*
			Remove the + and - in front of the desktop product category names.
		*/
		$("span.product-category-toggles").css("display", "none");

		if (newWindowSize == "medium") {
			currentWindowSize = "medium";
			// console.log(currentWindowSize);
		}

		if (newWindowSize == "small") {
			currentWindowSize = "small";
			// console.log(currentWindowSize);
		}

		/* 
		Set up page as the mobile version 
		*/
		constructMobileFiltering();

	}

	var currentWindowSize;
	window.oldFilteringMargin = 0;

	/* ----------------------------------------------------------------------------
	When the window is resized or has it's orientation changed: 
	1. determine the size of the page
	a. If the page size has changed empty it of content and reload the page.
	2. If the page is a large page
	a. Collect the "img.collection-hero" height and apply that height to it's container. 
	b. Call "constructLargeScreenFiltering"
	------------------------------------------------------------------------------- */

	$(window).on("onorientationchange resize scroll", function(){
	// console.log("current window size: " + currentWindowSize);
	// console.log("new window size: " + newWindowSize);


		if(newWindowSize == 'large'){
		// console.log("Construct large page sized filtering");
		/* 
		1.a This is being initiated to prevent the switching between destop and mobile filtering from becoming too conveluted. 
		*/
			if (currentWindowSize!=newWindowSize) {
			$("article").empty();
			$("article").append( "<h2>Resetting filtering content.</h2>" );
			location.reload();
			currentWindowSize  = newWindowSize;
			}


			/*
			2.b The page size is large, add the appropriate filtering content 
			*/      
			constructLargeScreenFiltering();



		} else {
		/* 1.a This is being initiated to prevent the switching between destop and mobile filtering from becoming too conveluted. */
			if (currentWindowSize!=newWindowSize) {
				$("article").empty();
				$("article").append( "<h2>Resetting filtering content.</h2>" );
				location.reload();
				currentWindowSize  = newWindowSize;
			}        
			/*
			2.a. The page size is medium or small, add the appropriate filtering content 
			*/
			// console.log("Construct medium / small page sized filtering");
			constructMobileFiltering();
		}

	});
});





function constructLargeScreenFiltering() {
	// console.log("Add large screen filtering code.");

	$("div.product-group-filters").removeClass("mobile");

	/* ---------------------------------------------------------------------------
	Update hero image size
	--------------------------------------------------------------------------- */
	categoryHeroHeight =  $("img.collection-hero").height();
	// console.log(categoryHeroHeight);
	$("section.collection-hero").height(categoryHeroHeight);     

	/* ---------------------------------------------------------------------------
	Keep the filtering nav from scrolling off the screen.
	create variable "maxHeight" and then use an if statement later on
	to tell the filtering nav to stop scrolling if it reaches that height 
	minus the height of the filtering nav.
	--------------------------------------------------------------------------- */
	var containerHeight = $("div#Container").outerHeight();
	var filterHeight = $("div.product-filtering").height();
	var collectionHeroHeight = $("section.collection-hero").outerHeight();
	var maxHeight = (containerHeight - filterHeight);
	//  console.log("containerHeight: " +  containerHeight);
	//  console.log("fitlerHeight: " + filterHeight);
	//  console.log("category-hero-height: " + productHeroHeight);
	//  console.log("collectionHeroHeight =" + collectionHeroHeight);

	/*
	Add the height of the "collectionHeroHeight" to the margin of the fitering offset
	*/
	var filteringNavOffset = $("div.product-filtering").offset().top;
	// console.log("div.product-filtering top : " + filteringNavOffset);

	var articleOffset = $(window).scrollTop();
	//  console.log("window.scrollTop : " + articleOffset);

	var adjustedHeight = articleOffset - collectionHeroHeight;
	//   console.log("AdjustedHeight : " + adjustedHeight);

	if(articleOffset > collectionHeroHeight) {
		// console.log("articleOffset is greater than the collectionHeroHeight")
		if (articleOffset<=maxHeight) {
			$("div.product-filtering").css("margin-top", adjustedHeight);
		}
	} else {
		$("div.product-filtering").css("margin-top", "0px");
	}
}





function constructMobileFiltering() {
	/* ----------------------------------------------------------------
	Append the mobile class to the article level of the page
	------------------------------------------------------------------*/
	// console.log("Add mobile filtering code.");

	/* ----------------------------------------------------------------
	Add the class "Mobile" to the div "div.product-group-filters"
	----------------------------------------------------------------  */
	$("div.product-group-filters").removeClass("mobile");

	/* ----------------------------------------------------------------
	User has clicked on the "Product Groups" button
	----------------------------------------------------------------- */
	$('div.product-filtering-mobile-link').find("*").off();
	$("div.product-filtering-mobile-link h3").click( function() {
		/*
		Show the Product Group filters
		*/
		$("div.product-filtering").toggle("slow");
		/*
		Toggle the + to a -  
		*/
		$("span.expand-filter").text(function(i, text){
			return text === "-" ? "+" : "-";
		})
	});

	/* ----------------------------------------------------------------
	User has clicked on one of the product categories
	------------------------------------------------------------------*/   
	$("div.product-filtering h3").click( function() {
		console.log("User clicked on product category in mobile filtering drop down")

		/* 
		Get the filter name from the second class of the button clicked. 
		*/
		var filterToOpen = ($(this).attr("class").split(' ')[3]);
		var groupToOpen = $(this).text();
		// console.log (groupToOpen);

		/*
		Display the product category selected div
		*/
		$("div.product-category-filters-mobile-selected").css("display", "block");
		/*
		Add the selected product category to the "filtered" list 
		*/
		$("span.filterName").text(groupToOpen);

		/* 
		Add the value of the selected filter as an extra class to the p.active-filter-group so it can be accessed if the user clicks on the link again to remove the filter 
		*/
		$("p.active-filter-group").addClass(filterToOpen);
		/* 
		For filter purposes, add the data-filter value that will allow this to remove the filter if it is clicked again. 
		*/
		$("p.active-filter-group").attr("data-filter", "." + filterToOpen);      

		/*
		Hide "div.product-filtering-mobile-link" and "div.product-filtering" from the page.
		*/
		$("div.product-filtering-mobile-link").css("display", "none");
		$("div.product-filtering").css("display", "none");
	});    

	/* ----------------------------------------------------------------
	User has clicked on the currently selected product category
	------------------------------------------------------------------*/   
	$("p.active-filter-group.product-category").click( function() {
		console.log("User clicked the currerntly selected product category.");

		/* 
		Get the class name of the clicked filter group 
		*/
		var filterToHide = ($(this).attr("class").split(' ')[3]);
		// console.log("Filter to hide = " + filterToHide);

		/*
		Hide the selected category filter div.
		*/
		$("div.product-category-filters-mobile-selected").css("display", "none");


		/* 
		Remove the data-filter value for this currently active filter. That way if a user selects a differnt filter from this group, it's not retained. 
		*/
		$("p.active-filter-group").attr("data-filter", ""); 

		/*
		Display the categories filtering list 
		*/
		$("div.product-filtering-mobile-link").css("display", "block");
		$("div.product-group-filters").css("display", "none");
		$("h3 span.expand-filter").text("+");

		/*
		Add the products from the removed categories back into the list.
		*/
		$("fieldset.category h3." + filterToHide).removeClass("active");

	});
}