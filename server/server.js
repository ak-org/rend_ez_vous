Meteor.methods({

	'getRestaurantList' : function (city, cuisine, radius) {

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

		if (city == "Minneapolis") { location = locationList["Minneapolis"]; }
		if (city == "St. Paul") { location = locationList["St. Paul"]; }
		if (city == "Plymouth") { location = locationList["Plymouth"]; }
		if (city == "Woodbury") { location = locationList["Woodbury"]; }
		if (city == "Maple Grove") { location = locationList["Maple Grove"]; }
		if (city == "Bloomington") { location = locationList["Bloomington"]; }
		if (city == "Eden Prairie") { location = locationList["Eden Prairie"]; }
		if (city == "White Bear Lake") { location = locationList["White Bear Lake"]; }

		var cuisine = cuisine;
		var radius = radius;
		//var apiKey = Meteor.settings.googlePlacesApiKey;
		var apiKey = "AIzaSyDjJDaW_HxsIsY7qJ0wOL1e0c8ShQ_QrKw";
		var searchUrl = url +  cuisine + "&types=restaurant&"  + "&sensor=true&location=" + location + "&minprice=2&maxprice=4" + "&radius=" + radius + "&key=" + apiKey;
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
			subject: emailObj.subject,
			html: emailObj.content
		});
		console.log("returning from sendinvites");

     }
})