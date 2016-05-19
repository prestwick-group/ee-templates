$(window).load(function(){
	 console.log("products.js loaded.")
	updateLargeImage();

	if(windowSize=='large')  {
		establishBuildBinBlockHeight();
	}
	$(window).on("resize", function(){
		if(windowSize=='large')  {
			establishBuildBinBlockHeight();
		}
	});
});


/* -----------------------------------------------------------
 		Product page "large-image" replacement
----------------------------------------------------------- */ 
function updateLargeImage(){
	$("div.configuration-option-block").click(function() {
		// console.log("configuration option block clicked.");
		$(this).children("img").addClass("active");
		$(this).siblings().children("img").removeClass("active");

		imageToDisplay = $(this).children("img").attr("src");
		// console.log(imageToDisplay);
		$("img.large-preview").attr("src", imageToDisplay);
	});
};


function establishBuildBinBlockHeight() {
	var buildBinHeight = $("img.build-bin-background").height();
	console.log("Build bin height: " + buildBinHeight);
	$("div.build-your-bin-block").css("height", buildBinHeight);
}