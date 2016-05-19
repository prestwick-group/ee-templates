var siteURL = "http://max-r.net"

$(document).ready(function(){
	$(".sliding").hide();
	toggleAnswer();
});

function toggleAnswer(){
	var questionNumber;

	$('a.question').click(function() {
		event.preventDefault();
		// console.log("question clicked.");
		
		/* ---------------------------------------------------
		   Pick out the second class of the link clicked. 
		   This will be used to determine which + is changed
		   and which answer is revealed.
		----------------------------------------------------- */
		questionNumber = ($(this).attr('class').split(' ')[1]);
		//console.log("question number: " + questionNumber);
		
		var plusToToggle = $("img.plus." + questionNumber);
		var answerToToggle = $("p.answer." + questionNumber);
		console.log(plusToToggle);

		if (answerToToggle.is(":visible")) {
			console.log ("answer is visible.")
			plusToToggle.attr("src", "/images/resources/faq-closed.png");
			answerToToggle.slideUp();  		
		} else {
			console.log ("answer is not visible.")
			plusToToggle.attr("src", "/images/resources/faq-open.png");
			answerToToggle.slideDown();  

		}
	});
}	
