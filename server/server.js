Meteor.methods({

  'getRestaurantList2' : function (location, cuisine, minPrice, maxPrice, radius) {
      var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=";
      var cuisine = cuisine;
      var radius = radius;
      //var apiKey = Meteor.settings.googlePlacesApiKey;
      var apiKey = "AIzaSyDjJDaW_HxsIsY7qJ0wOL1e0c8ShQ_QrKw";
      var searchUrl = url +  cuisine + "&types=restaurant&"  + "&sensor=true&location=" + location + "&minprice=" + minPrice + "&maxprice=" + maxPrice + "&radius=" + radius + "&key=" + apiKey;
      var results = Meteor.http.call('GET', searchUrl);
          console.log(searchUrl);
      return results;
  },


	'getRestaurantList' : function (city, cuisine, minPrice, maxPrice, radius) {

		/* Sample URL 
		https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=44.963323,-93.268284&radius=500&types=restaurant&key=AIzaSyA8nZvCfGgYVHvhOwz5Ja6vlbirOOZkF2M
		
		https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=44.963323,-93.268284&radius=5000&types=restaurant&rankby=prominence&key=AIzaSyA8nZvCfGgYVHvhOwz5Ja6vlbirOOZkF2M

		*/

		/*
		 Search specific restaurant type

		So your request would end up looking something like the below, restricted down to a specific area

		https://maps.googleapis.com/maps/api/place/textsearch/json?query=Mexican+Restaurant&sensor=true&location=44.963323,-93.268284&radius=20&key=AIzaSyDjJDaW_HxsIsY7qJ0wOL1e0c8ShQ_QrKw


        */

		var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=";
		var location;
		var locationList = {
			"Minneapolis" : "44.963323,-93.268284",
			"St. Paul" : "44.9444100,-93.0932700",
			"Plymouth" : "45.0105200,-93.4555100" ,
			"Woodbury" : "44.9238600,-92.9593800" ,
			"Maple Grove" : "45.0724600,-93.4557900", 
			"Bloomington" : "44.8408000,-93.2982800",
			"Eden Prairie" : "44.852463, -93.475113",
			"White Bear Lake" : "45.074722, -92.978056"
		};

		var locationListSF = {
			"San Francisco" : "37.7749300,-122.4194200",
			"San Mateo" : "37.5629900,-122.3255300",
			"Danville" : "37.8215900,-121.9999600" ,
			"Dublin" : "37.7021500,-121.9357900" ,
			"Orinda" : "37.8771500,-122.1796900", 
			"Oakland" : "37.8043700,-122.2708000",
			"Walnut Creek" : "37.9063100, -122.0649600",
			"Berkeley" : "37.8715900, -122.2727500"
		};

		if (city == "Minneapolis") { location = locationList["Minneapolis"]; }
		if (city == "St. Paul") { location = locationList["St. Paul"]; }
		if (city == "Plymouth") { location = locationList["Plymouth"]; }
		if (city == "Woodbury") { location = locationList["Woodbury"]; }
		if (city == "Maple Grove") { location = locationList["Maple Grove"]; }
		if (city == "Bloomington") { location = locationList["Bloomington"]; }
		if (city == "Eden Prairie") { location = locationList["Eden Prairie"]; }
		if (city == "White Bear Lake") { location = locationList["White Bear Lake"]; }



		if (city == "San Francisco") { location = locationListSF["San Francisco"] ; }
		if (city == "San Mateo") { location = locationListSF["San Mateo"] ; }
		if (city == "Danville") { location = locationListSF["Danville"] ; }		
		if (city == "Dublin") { location = locationListSF["Dublin"] ; }	
		if (city == "Oakland") { location = locationListSF["Oakland"] ; }	
		if (city == "Orinda") { location = locationListSF["Orinda"] ; }		
		if (city == "Walnut Creek") { location = locationListSF["Walnut Creek"] ; }		
		if (city == "Berkeley") { location = locationListSF["Berkeley"] ; }					

		var cuisine = cuisine;
		var radius = radius;
		//var apiKey = Meteor.settings.googlePlacesApiKey;
		var apiKey = "AIzaSyDjJDaW_HxsIsY7qJ0wOL1e0c8ShQ_QrKw";
		var searchUrl = url +  cuisine + "&types=restaurant&"  + "&sensor=true&location=" + location + "&minprice=" + minPrice + "&maxprice=" + maxPrice + "&radius=" + radius + "&key=" + apiKey;
		var results = Meteor.http.call('GET', searchUrl);
        console.log(searchUrl);
		return results;


	},


	'get_user_by_username': function(username) {
		    //console.log("Received username " + username);
            return Accounts.findUserByUsername(username);
     },

     'sendInvites' : function(emailObj) {
     	Email.send({
			from: emailObj.sendFrom,
			to: emailObj.sendTo,
			cc: "ashish@twopebbl.es",
			subject: emailObj.subject,
			html: emailObj.content
		});
		console.log("returning from sendinvites");

     },

     'isEmailRegistered' : function(email) {
     	return Accounts.findUserByEmail(email);
     },

     'changeInviteRequestStatus': function(token) {
     		InviteRequests.update({token: token}, 
	                            {$set: {status: "ACCEPTED"}}, function(err) {
	                            	 console.log("updating ", token);
	                                 if (err) {
	                                  console.log("Updated InviteRequest with", err);
	                                 }
	                            });

     },


     'validateLocationForEvent' : function(searchLocation) {

            if (searchLocation.length > 0) { 
                var searchUrl = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + searchLocation + "&types=(cities)&language=en_US&key=AIzaSyBEzAj0hpb79pYqwucfiAmSQVDcQqAqByE";
                var results = Meteor.http.call('GET', searchUrl);
                console.log(results);
                return results;
            }



     },

     'geocodeLocation' : function(loc) {
        var searchUrl =  "https://maps.googleapis.com/maps/api/geocode/json?address=" + loc + "&key=AIzaSyBEzAj0hpb79pYqwucfiAmSQVDcQqAqByE";
        var results = Meteor.http.call('GET', searchUrl);
                console.log("Geocode", results);
                return results;

     },

     'autoUpdateContactsAtRegister' : function (username, token) {

     		console.log("Params",  username, token);
     		
     		var result = InviteRequests.find({token: token}).fetch();
     		
     		console.log("result of token search is",  result[0]);
     		var category = result[0].category;
     		
     		if (category == "Friend") {
     			Friends.insert({
                  username : username,
                  contactname : result[0].referredBy
             	 }, function(err, id) {
                  if (id) { 
                    console.log("Result of friends add is ", id); 
                  }
                  if (err)  { 
                    console.log("Result of friends add is ", err); 
                }
                });
     			Friends.insert({
                  username : result[0].referredBy,
                  contactname : username
             	 }, function(err, id) {
                  if (id) { 
                    console.log("Result of friends add is ", id); 
                  }
                  if (err)  { 
                    console.log("Result of friends add is ", err); 
                }
                });
     		}
     		if (category == "Family") {
     			Family.insert({
                  username : username,
                  contactname : result[0].referredBy
             	 }, function(err, id) {
                  if (id) { 
                    console.log("Result of family add is ", id); 
                  }
                  if (err)  { 
                    console.log("Result of family add is ", err); 
                }
                });

     			Family.insert({
                  username : result[0].referredBy,
                  contactname : username
             	 }, function(err, id) {
                  if (id) { 
                    console.log("Result of add family is ", id); 
                  }
                  if (err)  { 
                    console.log("Result of add family is ", err); 
                }
                });
     		}
     		if (category == "Co Worker") {
     			CoWorkers.insert({
                  username : username,
                  contactname : result[0].referredBy
             	 }, function(err, id) {
                  if (id) { 
                    console.log("Result of coworkers add is ", id); 
                  }
                  if (err)  { 
                    console.log("Result of coworkers add is ", err); 
                }
                });

     			CoWorkers.insert({
                  username : result[0].referredBy,
                  contactname : username
             	 }, function(err, id) {
                  if (id) { 
                    console.log("Result of coworkers add is ", id); 
                  }
                  if (err)  { 
                    console.log("Result of coworkers add is ", err); 
                }
                });
     		}
     		
     },

    sendFeedback: function(emailObj) {

          Email.send({
          from: emailObj.sendFrom,
          to: emailObj.sendTo,
          subject: emailObj.subject,
          html: emailObj.content
        });
    },

    'getRestaurantDetails': function(placeid) {
        var url = "https://maps.googleapis.com/maps/api/place/details/json?placeid=";
        var apiKey = "AIzaSyDjJDaW_HxsIsY7qJ0wOL1e0c8ShQ_QrKw";
        var searchUrl = url + placeid + "&key=" + apiKey;
        console.log(searchUrl);
        var result = Meteor.http.call('GET', searchUrl);
          console.log(searchUrl);
        return result;  
    }


})
