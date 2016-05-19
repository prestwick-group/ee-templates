var siteURL = "http://max-r.net"

$(document).ready(function(){
	populateFormFields();
  verifyForm();
});

function populateFormFields(){
  // console.log("Form Loaded.");
$("input#first_name").val("First Name");
$("input#last_name").val("Last Name");
$("input#email").val("Email Address");
$("input#phone").val("Phone Number");
$("input#company").val("Company");
$("input#title").val("Title");
$("textarea#message").val("Message");

  $("input#first_name").focus(function() {
      if ($("input#first_name").val()=="First Name") { 
        $("input#first_name").val(" "); 
      }
  }).blur(function(){
      if ($("input#first_name").val()==" ")  { 
        $("input#first_name").val("First Name"); 
      }
  });

  $("input#last_name").focus(function() {
      if ($("input#last_name").val()=="Last Name") { 
        $("input#last_name").val(" "); 
      }
  }).blur(function(){
      if ($("input#last_name").val()==" ")  { 
        $("input#last_name").val("Last Name"); 
      }
  });
  
  $("input#email").focus(function() {
      if ($("input#email").val()=="Email Address") { 
        $("input#email").val(" "); 
      }
  }).blur(function(){
      if ($("input#email").val()==" ")  { 
        $("input#email").val("Email Address"); 
      }
  });


  $("input#phone").focus(function() {
      if ($("input#phone").val()=="Phone Number") { 
        $("input#phone").val(" "); 
      }
  }).blur(function(){
      if ($("input#phone").val()==" ")  { 
        $("input#phone").val("Phone Number"); 
      }
  });

  $("input#company").focus(function() {
      if ($("input#company").val()=="Company") { 
        $("input#company").val(" "); 
      }
  }).blur(function(){
      if ($("input#company").val()==" ")  { 
        $("input#company").val("Company"); 
      }
  });

  $("input#title").focus(function() {
      if ($("input#title").val()=="Title") { 
        $("input#title").val(" "); 
      }
  }).blur(function(){
      if ($("input#title").val()==" ")  { 
        $("input#title").val("Title"); 
      }
  });

  $("textarea#message").focus(function() {
      if ($("textarea#message").val()=="Message") { 
        $("textarea#message").val(" "); 
      }
  }).blur(function(){
      if ($("textarea#message").val()==" ")  { 
        $("textarea#message").val("Message"); 
      }
  });
} 


function verifyForm() {
    // console.log("Script loaded for contact form.");
    $('form.contact').submit(function(){
        // console.log("Handler for .submit called.");
        // remove prevent default on launch;
        // event.preventDefault();
        var returnVal = "true";

        if(($("input#email").val() == "Email Address") || ($("input#email").val() == "")) {
            console.log("email address left empty.");
            //alert( "Please provide your first name!" );
            $("div.email-warning").css("display","block");
            $("input#email").focus() ;
            returnVal = "false";
        } else {
          $("div.email-warning").css("display","none");
        }

        if(($("input#last_name").val() == "Last Name") || ($("input#last_name").val() == "")) {
            console.log("Last name left empty.");
            //alert( "Please provide your first name!" );
            $("div.last-name-warning").css("display","block");
            $("input#last_name").focus() ;
            returnVal = "false";
        } else {
          $("div.last-name-warning").css("display","none");
        }

        if(($("input#first_name").val() == "First Name") || ($("input#first_name").val() == "")) {
            console.log("First name left empty.");
            //alert( "Please provide your first name!" );
            $("div.first-name-warning").css("display","block");
            $("input#first_name").focus() ;
            returnVal = "false";
        } else {
          $("div.first-name-warning").css("display","none");
        }


        // if input#empty has any text added to it, don't submit the form.
        if ($('input#empty').val().length != 0) {
            return false;
        } 

        if (returnVal=="false"){
          console.log("Form would not submit");
          return false;
        } else {
          console.log("Form would submit");
          return true;
          // return false;
          // return( true );
        }
    });
}



