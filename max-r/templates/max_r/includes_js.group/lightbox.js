$(document).ready(function(){
	displayLightbox();
});


function displayLightbox() {
    // create global variable to pass between functions.
    var lightboxContent;
    
    $('a.lightbox-trigger').click(function() {
        event.preventDefault();
        lightboxContent = ($(this).attr('class').split(' ')[1]);
        console.log("use content for bin :" + lightboxContent);
        $('div#lightbox.'+lightboxContent).css('display', 'block');
    });
    $("div#lightbox" ).click(function() {
        console.log("lightbox close clicked");
        // $('#lightbox').remove();
        $("div#lightbox").css('display', 'none');
    });
}

/*
function displayLightbox() {
	$('.lightbox-trigger').click(function(e) {

		e.preventDefault();
		var image_href = $(this).attr("href");


		if ($('#lightbox').length > 0) { // lightbox exists
			// insert img tag with clicked link's href as src value
			$('#content').html('<img src="' + image_href + '">');
			$('#lightbox').show();
		}
		else { //#lightbox does not exist
			var lightbox = '<div id="lightbox">' +
							'<p>Click anywhere to close</p>' +
							'<div style="clear: both;></div>' +
							'<div id="content">' +
							'<img src="' + image_href +'" >' +
							'</div>' + 
							'</div>';
			//insert lightbox HTML into page
			$('body').append(lightbox);
			$("#lightbox").click(function() {

				$('#lightbox').remove();

			});
		}
	});
}
*/