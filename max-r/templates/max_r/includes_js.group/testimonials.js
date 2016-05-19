$(window).load(function () {
	if(windowSize=='large')  {
		// console.log("Load Testimonial JS.");

		/*
			Vertically align the image for the testimonial next to the text block of undetermined height. 
			Deterime the height of the div.testimonial-text block.
			Subtract the height of img.testimonial-hero from the div.testimonail-text height.
			The remaining amount of space needs to be divided in half and used as the top margin for the img.testimonial-hero.
		*/

		var testimonialTextBlockHeight = $("div.testimonial-text").outerHeight();
		var imgTestimonailHero = $("img.testimonial-hero").height();
		// console.log("div.testimonial-text outer height: " + testimonialTextBlockHeight);
		// console.log("img.testimonial-hero: " + imgTestimonailHero);

		/*
			If the image is taller than the div.testimonail-text subtract the image height from the div height.
		*/
		if (testimonialTextBlockHeight > imgTestimonailHero) {
			var marginAdjustment = (testimonialTextBlockHeight - imgTestimonailHero) / 2;
			 console.log("marginAdjustment: " + marginAdjustment);
			$("img.testimonial-hero").css("margin-top", marginAdjustment);
		}
	}

});