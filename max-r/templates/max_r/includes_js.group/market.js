var siteURL = "http://max-r.net"

$(document).ready(function(){
	toggleIcon();
	clickedHeroLink();
});

function toggleIcon(){
	$('div.market-grid-links').hover(
		function() {
			if ($(this).hasClass("active")) {
				console.log("THIS IS ACTIVE");
			} else { 
				var linkNumber = ($(this).attr('class').split(' ')[2]);
				//console.log(linkNumber);

				var hoverImage = $("img.icon-" + linkNumber);
				hoverImageSource = $(hoverImage).attr('src');
				// console.log(hoverImageSource);
				// console.log(hoverImage);
				newHover = hoverImageSource.replace('.png', '-over.png');
				// console.log(newHover);
				hoverImage.attr("src", newHover);
			}
		}, function() {
			if ($(this).hasClass("active")) {
				console.log("THIS IS ACTIVE");
			} else {
				var linkNumber = ($(this).attr('class').split(' ')[2]);
				//console.log(linkNumber);

				var hoverImage = $("img.icon-" + linkNumber);
				hoverImageSource = $(hoverImage).attr('src');
				// console.log(hoverImageSource);
				// console.log(hoverImage);
				newHover = hoverImageSource.replace('-over.png', '.png');
				// console.log(newHover);
				hoverImage.attr("src", newHover);
			}
		});	
}

function clickedHeroLink(){
	$('div.market-hero-grid-links').click( function() {	
		if ($(this).hasClass("active")) {
			// console.log("do nothing.");
		} else {
			var linkNumber = ($(this).attr('class').split(' ')[2]);
			// console.log("change the image!");

			
			// 1. Make image associated with this version active, make previous version non-visible
			imageToDisplay = "div.hero-image-" + linkNumber;
			// console.log("New image to show: " + imageToDisplay);
			$(imageToDisplay).addClass('visible').siblings().removeClass('visible');


			/*
				 2. Remove "-over" from sibling children icon-label images
			 
				When the icons were removed, the functionality of the icon find and replace was broken.
				If the icons are re-added to the css in _page-type-markets, this can be un-commented.
			*/
			// $(this).siblings('.market-hero-grid-links').children("img.active").attr('src', $(this).siblings('.market-hero-grid-links').children("img.active").attr('src').replace('-over.png', '.png'));	


			// 3. Remove "active" from siblings
			$(this).addClass('active').siblings().removeClass('active');

			$(this).children('img.label-icon').addClass('active');
			$(this).siblings('.market-hero-grid-links').children("img.active").removeClass('active');
			
		}	
	});	

	$('div.market-coordinated-grid-links').click( function() {	
		if ($(this).hasClass("active")) {
			// console.log("do nothing.");
		} else {
			var linkNumber = ($(this).attr('class').split(' ')[2]);
			// console.log("change the image!");

			
			// 1. Make image associated with this version active, make previous version non-visible
			imageToDisplay = "div.coordinated-image-" + linkNumber;
			console.log("New image to show: " + imageToDisplay);
			$(imageToDisplay).addClass('visible').siblings().removeClass('visible');


			// 2. Remove "-over" from sibling children icon-label images
			// $(this).siblings('.market-grid-links').children("img.active").attr('src').replace('-over.png', '.png');
			// $(this).siblings('.market-grid-links').children("img.active").attr('src', 'test.jpg');
			// $(this).siblings('.market-grid-links').children("img.active").attr('src').replace('-over.png', '.png')	
			// $(this).siblings('.market-coordinated-grid-links').children("img.active").attr('src', $(this).siblings('.market-coordinated-grid-links').children("img.active").attr('src').replace('-over.png', '.png'));	


			// 3. Remove "active" from siblings
			$(this).addClass('active').siblings().removeClass('active');

			$(this).children('img.label-icon').addClass('active');
			$(this).siblings('.market-coordinated-grid-links').children("img.active").removeClass('active');
			
		}	
	});	
}


