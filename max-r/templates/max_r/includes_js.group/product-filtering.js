// Based on the instructions provided at: https://mixitup.kunkalabs.com/learn/tutorial/advanced-filtering/

			// To keep our code clean and modular, all custom functionality will be contained inside a single object literal called "buttonFilter".
			var buttonFilter = {
			 
			  // Declare any variables we will need as properties of the object
			  
			  $filters: null,
			  $reset: null,
			  groups: [],
			  outputArray: [],
			  outputString: '',
			  
			  // The "init" method will run on document ready and cache any jQuery objects we will need.
			  
			  init: function(){
			    var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "buttonFilter" object so that we can share methods and properties between all parts of the object.
			    
			    self.$filters = $('.filterContainer');
			    self.$reset = $('#Reset');
			    self.$container = $('#Container');
			    
			    self.$filters.find('fieldset').each(function(){
			      self.groups.push({
			        $buttons: $(this).find('.filter'),
			        active: ''
			      });
			    });
			    
			    self.bindHandlers();
			  },
			  
			  // The "bindHandlers" method will listen for whenever a button is clicked. 	  
			  bindHandlers: function(){
			    var self = this;
			    
			    // Handle filter clicks
			    
			    self.$filters.on('click', '.filter', function(e){
			    	
						console.log("Link clicked, adjust menu items for desktop");
				    	
				    	$(this).children("span.desktop").css("display", "inline-block");
				    	// $(this).css("padding-left", "0px");

				    	$(this).siblings().children("span.desktop").css("display", "none");
				    	// $(this).siblings("p.desktop").css("padding-left", "35px");

				    	if ($(this).hasClass("active")) {
					    	$(this).children("span").css("display", "none");
					    	// $(this).css("padding-left", "35px");
				    	}


			    	// on click, reset the error message to not display
			    	$("#noResults").css("display", "none");
			      e.preventDefault();
			      
			      var $button = $(this);

			      				      
			      // If the button is active, remove the active class, else make active and deactivate others.
			      $button.hasClass('active') ?
			        $button.removeClass('active') :
			        $button.addClass('active').siblings('.filter').removeClass('active');
			        
			      self.parseFilters();
			    });
			    
			    // Handle reset click
			    
			    self.$reset.on('click', function(e){
			      e.preventDefault();
			      
			      self.$filters.find('.filter').removeClass('active');
			      self.$filters.find("span.desktop").css("display", "none");
			      
			      self.parseFilters();
			    });
			  },
			  
			  // The parseFilters method checks which filters are active in each group:
			  
			  parseFilters: function(){
			    var self = this;
			 
			    // loop through each filter group and grap the active filter from each one.
			    
			    for(var i = 0, group; group = self.groups[i]; i++){
			      group.active = group.$buttons.filter('.active').attr('data-filter') || '';
			    }
			    
			    self.concatenate();
			  },
			  
			  // The "concatenate" method will crawl through each group, concatenating filters as desired:
			  
			  concatenate: function(){
			    var self = this;
			    
			    self.outputString = ''; // Reset output string
			    
			    for(var i = 0, group; group = self.groups[i]; i++){
			      self.outputString += group.active;
			    }
			    
			    // If the output string is empty, show all rather than none:
			    
			    !self.outputString.length && (self.outputString = 'all'); 
			    
			    console.log("Output String: " + self.outputString); 
			    // ^ we can check the console here to take a look at the filter string that is produced
			    
			    // Send the output string to MixItUp via the 'filter' method:
			    
				  if(self.$container.mixItUp('isLoaded')){
				  	console.log ("test mix-up");
			    	self.$container.mixItUp('filter', self.outputString);
				  }
			  }
			};
