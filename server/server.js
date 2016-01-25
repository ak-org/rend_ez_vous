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
		var location = "44.963323,-93.268284";
		var cuisine = cuisine;
		var radius = 10000;
		//var apiKey = Meteor.settings.googlePlacesApiKey;
		var apiKey = "AIzaSyDjJDaW_HxsIsY7qJ0wOL1e0c8ShQ_QrKw";
		var searchUrl = url +  cuisine + "&types=restaurant&"  + "&sensor=true&location=" + location + "&radius=20&key=" + apiKey;
		var results = Meteor.http.call('GET', searchUrl);
        console.log(searchUrl);
		return results;


	}
})