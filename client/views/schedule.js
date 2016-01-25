var eventDetails ;




Template.schedule.rendered = function() {
		eventDetails = Session.get("eventDetails");
    	console.log(eventDetails);
		var loc = eventDetails.invitees[0].loc;
		var pref;
		var cuisine = "";
		eventDetails.restaurantSelected = [];

		for (i = 0; i < 20; i++) 
			eventDetails.restaurantSelected[i] = false;
		

		for (var item=0; item < eventDetails.inviteeCount; item++ ) {
			pref = eventDetails.invitees[item].cuisine;
			console.log(pref);		
			if (pref[0].mexican) { 
				cuisine += "Mexican|"; 
				/*
				if (cuisine.search("Mexican") == 0) {
					cuisine += "Mexican|"; 
				}
				*/	
			}

			if (pref[1].american) { 
				cuisine += "American|"; 	
				/*
				if (cuisine.search("American") == 0) {
					cuisine += "American|"; 
				}
				*/
			}

			if (pref[2].italian) { 
				cuisine += "Italian|"; 
				/*
				if (cuisine.search("Italian") == 0) {
					cuisine += "Italian|"; 
				}
				*/	
			}

			if (pref[3].chinese) { 
				cuisine += "Chinese|"; 
				/*
				if (cuisine.search("Chinese") == 0) {
					cuisine += "Chinese|"; 
				}
				*/	
			}

			if (pref[4].japanese) { 
				cuisine += "Japanese|";
				/*
				if (cuisine.search("Japanese") == 0) {
					cuisine += "Japanese|";
				}
				*/	 
			}

		}

		console.log(cuisine);
    	
    	var returnedResults;
    	
    	Meteor.call('getRestaurantList', loc, cuisine, 500, function(err, results) {
    		console.log("Server responded with ", results);
    		returnedResults = JSON.parse(results.content);
    		console.log(returnedResults.results);
    		Session.set('returnedResults', returnedResults.results);
    	});
    			
		
}

Template.schedule.helpers({

    'eventname' : function() {
    	eventDetails = Session.get("eventDetails");
    	return eventDetails.eventname;
    },

    'eventdate' : function () {
    	return eventDetails.date;
    },

    'invitees' : function() {
    	return eventDetails.invitees;
    },

    'restaurantList' : function() {


    	/*
    	return ([
    			{ name: "Wendys"},
    			{ name: "Biaggis"}
    		    ]);
    	*/

    	/* store the results returned by the API */

    	eventDetails.returnedResults = Session.get('returnedResults');
    	return Session.get('returnedResults');

    }
   


});


Template.schedule.events({
 	'click #0 input' : function(e, data) {

    	//console.log(e.target.labels);
    	console.log("you have selected ", data.find('.0').innerText);
    	console.log("you have selected ", data.find('#0').innerText);
    	eventDetails.restaurantSelected[0] = !eventDetails.restaurantSelected[0];
    	console.log("Chcked is " + eventDetails.restaurantSelected[0]);


    },

    'click #1 input' : function(e, data) {

    	//console.log(e.target.labels);
    	console.log("you have selected ", data.find('.1').innerText);
    	eventDetails.restaurantSelected[1] = !eventDetails.restaurantSelected[1];
    },

    'click #2 input' : function(e, data) {

    	//console.log(e.target.labels);
    	console.log("you have selected ", data.find('.2').innerText);
    	eventDetails.restaurantSelected[2] = !eventDetails.restaurantSelected[2];
    },

    'click #3 input' : function(e, data) {

    	//console.log(e.target.labels);
    	console.log("you have selected ", data.find('.3').innerText);
    	eventDetails.restaurantSelected[3] = !eventDetails.restaurantSelected[3];
    },

    'click #4 input' : function(e, data) {

    	//console.log(e.target.labels);
    	console.log("you have selected ", data.find('.4').innerText);
    	eventDetails.restaurantSelected[4] = !eventDetails.restaurantSelected[4];
    },

    'click #5 input' : function(e, data) {

    	//console.log(e.target.labels);
    	console.log("you have selected ", data.find('.5').innerText);
    	eventDetails.restaurantSelected[5] = !eventDetails.restaurantSelected[5];
    },

    'click #6 input' : function(e, data) {

    	//console.log(e.target.labels);
    	console.log("you have selected ", data.find('.6').innerText);
    	eventDetails.restaurantSelected[6] = !eventDetails.restaurantSelected[6];
    },

    'click #7 input' : function(e, data) {

    	//console.log(e.target.labels);
    	console.log("you have selected ", data.find('.7').innerText);
    	eventDetails.restaurantSelected[7] = !eventDetails.restaurantSelected[7];
    },

    'click #8 input' : function(e, data) {

    	//console.log(e.target.labels);
    	console.log("you have selected ", data.find('.8').innerText);
    	eventDetails.restaurantSelected[8] = !eventDetails.restaurantSelected[8];
    },

    'click #9 input' : function(e, data) {

    	//console.log(e.target.labels);
    	console.log("you have selected ", data.find('.9').innerText);
    	eventDetails.restaurantSelected[9] = !eventDetails.restaurantSelected[9];
    },

    'click #10 input' : function(e, data) {

    	//console.log(e.target.labels);
    	console.log("you have selected ", data.find('.10').innerText);
    	eventDetails.restaurantSelected[10] = !eventDetails.restaurantSelected[10];
    },


    'click #11 input' : function(e, data) {

    	//console.log(e.target.labels);
    	console.log("you have selected ", data.find('.11').innerText);
    	eventDetails.restaurantSelected[11] = !eventDetails.restaurantSelected[11];
    },

    'click #12 input' : function(e, data) {

    	//console.log(e.target.labels);
    	console.log("you have selected ", data.find('.12').innerText);
    	eventDetails.restaurantSelected[12] = !eventDetails.restaurantSelected[12];
    },

    'click #13 input' : function(e, data) {

    	//console.log(e.target.labels);
    	console.log("you have selected ", data.find('.13').innerText);
    	eventDetails.restaurantSelected[13] = !eventDetails.restaurantSelected[13];
    },

    'click #14 input' : function(e, data) {

    	//console.log(e.target.labels);
    	console.log("you have selected ", data.find('.14').innerText);
    	eventDetails.restaurantSelected[14] = !eventDetails.restaurantSelected[14];
    },

    'click #15 input' : function(e, data) {

    	//console.log(e.target.labels);
    	console.log("you have selected ", data.find('.15').innerText);
    	eventDetails.restaurantSelected[15] = !eventDetails.restaurantSelected[15];
    },

    'click #16 input' : function(e, data) {

    	//console.log(e.target.labels);
    	console.log("you have selected ", data.find('.16').innerText);
    	eventDetails.restaurantSelected[16] = !eventDetails.restaurantSelected[16];
    },

    'click #17 input' : function(e, data) {

    	//console.log(e.target.labels);
    	console.log("you have selected ", data.find('.17').innerText);
    	eventDetails.restaurantSelected[17] = !eventDetails.restaurantSelected[17];
    },

    'click #18 input' : function(e, data) {

    	//console.log(e.target.labels);
    	console.log("you have selected ", data.find('.18').innerText);
    	eventDetails.restaurantSelected[18] = !eventDetails.restaurantSelected[18];
    },

    'click #19 input' : function(e, data) {

    	//console.log(e.target.labels);
    	console.log("you have selected ", data.find('.19').innerText);
    	eventDetails.restaurantSelected[19] = !eventDetails.restaurantSelected[19];

    },

    'click #create-event' : function (e, data) {
    	console.log("Create event button was clicked");
    	console.log("Final details ", eventDetails);
    }


});



