var currentWindowSize;
window.oldFilteringMargin = 0;
var oldFilteringMargin = 0;
var firstRun = "1";

$(window).load(function () { 
  // console.log("products-test.js loaded.")

  /* -----------------------------------------------------------------------
    Determine window size and then set up controls 
    for mobile product menu if "mobile size" 
  ------------------------------------------------------------------------- */
  constructFiltering();

  /* -----------------------------------------------------------------------
    If page is resized, check to see if it should reload the content
    in order to compensate for the new size.
  ------------------------------------------------------------------------- */
  reconstructFilteringOnAction();

  /* ---------------------------------------------------------------------------
    Rotate group hero images by calling function.
  -------------------------------------------------------------------------- */
  rotateGroupHeroImages()
  setInterval('rotateGroupHeroImages()', 3000); 


});



function constructFiltering() {
  if (newWindowSize == 'large'){ 
    currentWindowSize = "large";
    // console.log(currentWindowSize);

    /* ----------------------------------------------------------------
      Remove mobile class to product-group-filters filter div 
    ------------------------------------------------------------------*/
    $("div.product-group-filters").removeClass("mobile");
    constructLargeScreenFiltering();
  } else {
    if (newWindowSize == "medium") {
      currentWindowSize = "medium";
       console.log(currentWindowSize);
    }

    if (newWindowSize == "small") {
      currentWindowSize = "small";
       console.log(currentWindowSize);
    }
    constructMobileFiltering();
  } 
}



function reconstructFilteringOnAction() {
  // console.log("reconstruction filtering on action called.");

  $(window).on("onorientationchange resize scroll", function(){
     console.log("window resized.");

    console.log("New window size = " + newWindowSize);
    console.log("Current window size = " + currentWindowSize);
    if(newWindowSize == 'large'){
      /* This is being initiated to prevent the switching between destop and mobile filtering from becoming too conveluted. */
      if (currentWindowSize!=newWindowSize) {
        $("article").empty();
        $("article").append( "<h2>Resetting filtering content.</h2>" );
        location.reload();
      }
      constructLargeScreenFiltering();
    } else {

      /* This is being initiated to prevent the switching between destop and mobile filtering from becoming too conveluted. */        
      if (currentWindowSize!=newWindowSize) {
        // console.log ("Current Window Size: " + currentWindowSize + " and newWindowSize: " + newWindowSize);
        $("article").empty();
        $("article").append( "<h2>Filtering content resetting.</h2>" );
        location.reload();
        currentWindowSize  = newWindowSize;
      }
      constructMobileFiltering();
    }
  });
}



function constructLargeScreenFiltering() {
  /* 
    Remove mobile class if it was attached earlier 
  */
  $("div.product-group-filters").removeClass("mobile");


  /* ---------------------------------------------------------------------------
    Keep the filtering nav from scrolling off the screen.
    create variable "maxHeight" and then use an if statement later on
    to tell the filtering nav to stop scrolling if it reaches that height 
    minus the height of the filtering nav.
  --------------------------------------------------------------------------- */
  var containerHeight = $("div#Container").outerHeight();
  //  console.log("containerHeight: " +  containerHeight);

  var filterHeight = $("div.product-filtering").height();
  //  console.log("fitlerHeight: " + filterHeight);

  var maxHeight = (containerHeight - filterHeight);
  //  console.log("maxHeight =" + maxHeight);

  /* -------------------------------------------------------------------------------------
    Check to see if categoryHeroHeight exists. If not, it's a product group page. 
  -------------------------------------------------------------------------------------- */
  categoryHeroHeight =  $("img.product-category-hero").outerHeight() + $("div.headline").outerHeight();
  // console.log("Category hero height = " + categoryHeroHeight);

  if (categoryHeroHeight==0) {            
    //  console.log("Product Group Page.");

    /* ---------------------------------------------------------------------------
      Update section.product-group-hero height based on hero image size
    --------------------------------------------------------------------------- */
    groupHeroHeight =  $("img.product-group-hero.first-image").outerHeight();
    // console.log("Group hero height = " + groupHeroHeight);
    $("section.product-group-hero").height(groupHeroHeight);

    /* ---------------------------------------------------------------------------
      as of 2/15/2016, the following offset().top produces an error on 
      clearance pages as they don't have a div.product-filtering.
    --------------------------------------------------------------------------- */
    var filteringNavOffset = $("div.product-filtering").offset().top;
    //  console.log("filteringNavOffset = " + filteringNavOffset);

    var articleOffset = $(window).scrollTop();
    //  console.log("articleOffset " + articleOffset);

    var filteringNavOffsetDifference = filteringNavOffset - articleOffset;
    // console.log("Product filtering offset from top - article offset from top = " + filteringNavOffsetDifference);


    var adjustedHeight = articleOffset - groupHeroHeight;
    // console.log("Adjusted height: " + adjustedHeight);

    if (articleOffset > groupHeroHeight) {
    // console.log("adjust menu margin.");
      if (articleOffset<=maxHeight) {
        $("div.product-filtering").css("margin-top", adjustedHeight);
      }
    } else {
      $("div.product-filtering").css("margin-top", "0px");
    }


    /* ---------------------------------------------------------------------------
    ------------------------------------------------------------------------------
      The following code was removed on 5/5/2016 when the 
      hero images were added to the square and round
      product groups.

      if(articleOffset=="0"){
        // console.log("articleoffset = 0");
        $("div.product-filtering").css("margin-top", "0");
      } else {  
        // console.log("articleoffset greater than 0");
        if (newFilteringMargin<=maxHeight) {
          // console.log("newFilterMargin not greater than MaxHeight");
          $("div.product-filtering").css("margin-top", newFilteringMargin);
        }
      // oldFilteringMargin = newFilteringMargin;
      }
    ------------------------------------------------------------------------------
    ------------------------------------------------------------------------------ */
    /* If a user clicks a filter, force the page back to the top. */
    $("p.filter").on("click", function (){
      $('html, body').animate({ scrollTop: 0 }, 0);
    });

  /* ------------------------------------------------------------------------------
    If categoryHeroHeight does exist, the page is a product category page. 
    Add the height of the hero the starting margin of the filtering offset. 
  ------------------------------------------------------------------------------ */
  } else {
    //  console.log("Product Category Page.");

    /* ------------------------------------------------------------------------------
      Update section.product-category-hero height based on hero image size
    ------------------------------------------------------------------------------- */
    $("section.product-category-hero").height(categoryHeroHeight);

    var filteringNavOffset = $("div.product-filtering").offset().top;
    // console.log("div.product-filtering top : " + filteringNavOffset);

    var articleOffset = $(window).scrollTop();
    // console.log("window.scrollTop : " + articleOffset);

    var adjustedHeight = articleOffset - categoryHeroHeight;
    // console.log("Adjusted height: " + adjustedHeight);

    if (articleOffset > categoryHeroHeight) {
    // console.log("adjust menu margin.");

      if (articleOffset<=maxHeight) {
        $("div.product-filtering").css("margin-top", adjustedHeight);
      }
    } else {
      $("div.product-filtering").css("margin-top", "0px");
    }
  }
}



function rotateGroupHeroImages(){
  console.log("Rotate group hero images function called.");
  
  // $("div.product-group-hero-images img");

  var $active = $("div.product-group-hero-images-container .active");
  var $next = ($active.next().length > 0) ? $active.next() : $("div.product-group-hero-images-container img:first");
  $next.css('z-index',12);
  $active.fadeOut(1500,function(){
    $active.css('z-index',10).show().removeClass('active');
    $next.css('z-index',13).addClass('active');
  });

}



function constructMobileFiltering() {
  console.log("Mobile filtering called");

  $("img.product-category-hero").remove();


  /* ----------------------------------------------------------------
    User clicks the category "groups" link
    1. Have product group menu open on click
    2. Have the + change to a - 
  ------------------------------------------------------------------*/
  $("a.mobile-filter-category").on("click", function() {
    // console.log("Mobile category link clicked");

    $("div.mobile-filter-category-links").toggle(),200;

    $("span.expand-filter").text(function(i, text){
      return text === "-" ? "+" : "-";
    });
  });


  /* ----------------------------------------------------------------
    Add 'mobile' class to 'div.product-group-filters' 
  ------------------------------------------------------------------*/
  $("div.product-group-filters").addClass("mobile");


  /* ----------------------------------------------------------------
    If user clicks on product group filter list, 
    1. Expand that list.
    2. Change that lists "+" to "-" 
  ---------------------------------------------------------------- */
  $("fieldset h4").on("click", function(){
    // console.log("H4 clicked");
  
    var className = $(this).attr("class");
    // console.log("Class name: " + className);
    var filterDiv = "div.filter-list." + className;
    // console.log("filterDiv: " + filterDiv);
    
    $(filterDiv).toggle(),200;

    var changePlus = "h4." + className + " span.expand-filter";
    //console.log ("+ to change = " + changePlus);
    
    $(changePlus).text(function(i, text){
      return text === "-" ? "+" : "-";
    });
  });


  /* ----------------------------------------------------------------
    When user clicks on a group level filter, 
    close the group filter list and then add 
    the selected filter to 
    "div.product-group-filters-mobile-selected"
  ------------------------------------------------------------------ */
  $("p.filter").on("click", function(){
    /* 
      Get the filter name from the second class of the button clicked. 
    */
    var classToHide = $(this).attr("class").split(" ")[2];
    //console.log ("Clicked group filter (classToHide) : " + classToHide);

    /* Get the class name of the div that contains the button clicked. (This will be used to display that group in "div.product-group-filters-mobile-selected") */
    var filterGroup = $(this).parent().attr("class").split(" ")[1];
    // console.log ("fiterGroup = " + filterGroup);

    /* Hide the selected links parent div */
    $(this).parent().parent("fieldset").css("display", "none");

    /* Display the div inside "div.product-group-filters-mobile-selected" that will display the filter clicked as a removable choice. */
    var selectedFilterGroup = "p.active-filter-group." + filterGroup;
    // console.log ("p.active-group to display: " + selectedFilterGroup);
    $(selectedFilterGroup).css("display", "block");

    /* Add the value of the selected filter as an extra class to the p.active-filter-group so it can be accessed if the user clicks on the link again to remove the filter */
    $(selectedFilterGroup).addClass(classToHide);

    /* For filter purposes, add the data-filter value that will allow this to remove the filter if it is clicked again. */
    $(selectedFilterGroup).attr("data-filter", "." + classToHide);

    /* Add the value of the selected filter to the span in the active-filter-group p tag. */
    $(selectedFilterGroup + " span.filterName").text(classToHide);

  });

  /* ----------------------------------------------------------------
  When user clicks on an currently active filter group
  1. remove the existing active-group 
  2. make the group filters visible again
  3. add the products from the removed filter back into the list
  4. reset the group level filter "-" to a "+"
  ------------------------------------------------------------------ */
  $("p.active-filter-group").on("click", function(){
  // console.log("active filter group clicked.");

    /* get the class name of the clicked filter group */
    var groupToHide = $(this).attr("class").split(" ")[1];
    // console.log("Group to hide = " + groupToHide);

    // 1.
    /* Hide selected filter group */
    $("p.active-filter-group." + groupToHide).css("display", "none");

    /* Remove the data-filter value for this currently active filter. That way if a user selects a differnt filter from this group, it's not retained. */
    $("p.active-filter-group." + groupToHide).attr("data-filter", "");

    // 2.
    /* Display hidden filter list header */
    $("fieldset." + groupToHide).css("display", "block");
    // $("fieldset." + groupToHide).children("div.filter-list").css("background-color", "#222");

    /* Hide actual list of filters */
    $("fieldset." + groupToHide).children("div.filter-list").css("display", "none");

    // 3.
    $("fieldset." + groupToHide).children("div.filter-list").children(".filter").removeClass("active");
    // .children("filter").removeClass("active");

    //4.
    $("h4." + groupToHide + " span.expand-filter").text("+");
  });
}

