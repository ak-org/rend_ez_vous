var eventDetails ;

Meteor.subscribe('events');

var determineCuisine = function (eventDetails) {
        
        var cuisineChoice = "";
        var prefCuisineCount = [0 ,0 ,0, 0, 0, 
                                0, 0, 0, 0, 0];
        var foundMatchForAll = false;
        var pref;
        

        for (var item=0; item < eventDetails.inviteeCount; item++ ) {
            pref = eventDetails.invitees[item].cuisine;
            console.log(pref);      
            if (pref[0].mexican) { 
                prefCuisineCount[0]++;
            }

            if (pref[1].american) { 
                prefCuisineCount[1]++;
            }

            if (pref[2].italian) { 
                prefCuisineCount[2]++;
            }

            if (pref[3].chinese) { 
                prefCuisineCount[3]++;
            }

            if (pref[4].japanese) { 
                prefCuisineCount[4]++;
            }

            if (pref[5].indian) { 
                prefCuisineCount[5]++;
            }

            if (pref[6].greek) { 
                prefCuisineCount[6]++;
            }

            if (pref[7].mediterranean) { 
                prefCuisineCount[7]++;
            }

            if (pref[8].thai) { 
                prefCuisineCount[8]++;
            }

            if (pref[9].vietnamese) { 
                prefCuisineCount[9]++;
            }


        }
        
        // account for organizer preferences as well

        if (eventDetails.organizerCuisinePef[0].mexican) { 
            prefCuisineCount[0]++;
        }
        if (eventDetails.organizerCuisinePef[1].american) { 
            prefCuisineCount[1]++;
        }
        if (eventDetails.organizerCuisinePef[2].italian) { 
            prefCuisineCount[2]++;
        }
        if (eventDetails.organizerCuisinePef[3].chinese) { 
            prefCuisineCount[3]++;
        }
        if (eventDetails.organizerCuisinePef[4].japanese) { 
            prefCuisineCount[4]++;
        }
        if (eventDetails.organizerCuisinePef[5].indian) { 
            prefCuisineCount[5]++;
        }
        if (eventDetails.organizerCuisinePef[6].greek) { 
            prefCuisineCount[6]++;
        }
        if (eventDetails.organizerCuisinePef[7].mediterranean) { 
            prefCuisineCount[7]++;
        }
        if (eventDetails.organizerCuisinePef[8].thai) { 
            prefCuisineCount[8]++;
        }
        if (eventDetails.organizerCuisinePef[9].vietnamese) { 
            prefCuisineCount[9]++;
        }        


        
        // if count is same as invitees + organizer, we have a good match

        if (prefCuisineCount[0] > eventDetails.inviteeCount) { foundMatchForAll = true; cuisineChoice += "Mexican|"; }
        if (prefCuisineCount[1] > eventDetails.inviteeCount) { foundMatchForAll = true; cuisineChoice += "American|"; }
        if (prefCuisineCount[2] > eventDetails.inviteeCount) { foundMatchForAll = true; cuisineChoice += "Italian|"; }
        if (prefCuisineCount[3] > eventDetails.inviteeCount) { foundMatchForAll = true; cuisineChoice += "Chinese|"; }
        if (prefCuisineCount[4] > eventDetails.inviteeCount) { foundMatchForAll = true; cuisineChoice += "Japanese"; }
        if (prefCuisineCount[5] > eventDetails.inviteeCount) { foundMatchForAll = true; cuisineChoice += "Indian|"; }
        if (prefCuisineCount[6] > eventDetails.inviteeCount) { foundMatchForAll = true; cuisineChoice += "Greek|"; }
        if (prefCuisineCount[7] > eventDetails.inviteeCount) { foundMatchForAll = true; cuisineChoice += "Mediterranean|"; }
        if (prefCuisineCount[8] > eventDetails.inviteeCount) { foundMatchForAll = true; cuisineChoice += "Thai|"; }
        if (prefCuisineCount[9] > eventDetails.inviteeCount) { foundMatchForAll = true; cuisineChoice += "Vietnamese"; }  
        if (foundMatchForAll == false) {

            // No hit was 1005, make it superset of everyone's preference

            if (prefCuisineCount[0] > 0) { cuisineChoice += "Mexican|"; }
            if (prefCuisineCount[1] > 0) { cuisineChoice += "American|"; }
            if (prefCuisineCount[2] > 0) { cuisineChoice += "Italian|"; }
            if (prefCuisineCount[3] > 0) { cuisineChoice += "Chinese|"; }
            if (prefCuisineCount[4] > 0) { cuisineChoice += "Japanese"; }
            if (prefCuisineCount[5] > 0) { cuisineChoice += "Indian|"; }
            if (prefCuisineCount[6] > 0) { cuisineChoice += "Greek|"; }
            if (prefCuisineCount[7] > 0) { cuisineChoice += "Mediterranean|"; }
            if (prefCuisineCount[8] > 0) { cuisineChoice += "Thai|"; }
            if (prefCuisineCount[9] > 0) { cuisineChoice += "Vietnamese"; }             

        }

        return cuisineChoice;

}


var determineMeetingLocation = function(eventDetails) {
        
        var returnLoc;
        var locMatrix = [
                            [ 0, 0, 0],
                            [ 0, 0, 0],
                            [ 0, 0, 0]
        ];
        var flag1 = false;
        var flag2 = false;

       for (var item=0; item < eventDetails.inviteeCount; item++ ) {
                if (eventDetails.invitees[item].loc === "White Bear Lake") {
                    locMatrix[0][2]++;
                }
                if (eventDetails.invitees[item].loc === "Maple Grove") {
                    locMatrix[0][0]++;
                }


                if (eventDetails.invitees[item].loc === "Plymouth") {
                    locMatrix[1][0]++;
                }
                if (eventDetails.invitees[item].loc === "Minneapolis") {
                    locMatrix[1][1]++;
                }
                if (eventDetails.invitees[item].loc === "St. Paul") {
                    locMatrix[1][2]++;
                }

                if (eventDetails.invitees[item].loc === "Eden Prairie") {
                    locMatrix[2][0]++;
                }
                if (eventDetails.invitees[item].loc === "Bloomington") {
                    locMatrix[2][1]++;
                }
                if (eventDetails.invitees[item].loc === "Woodbury") {
                    locMatrix[2][2]++;
                }

        }

        if (eventDetails.organizerLoc === "White Bear Lake") {
            locMatrix[0][2]++;
        }
        if (eventDetails.organizerLoc === "Maple Grove") {
            locMatrix[0][0]++;
        }


        if (eventDetails.organizerLoc === "Plymouth") {
            locMatrix[1][0]++;
        }
        if (eventDetails.organizerLoc === "Minneapolis") {
            locMatrix[1][1]++;
        }
        if (eventDetails.organizerLoc === "St. Paul") {
            locMatrix[1][2]++;
        }

        if (eventDetails.organizerLoc === "Eden Prairie") {
            locMatrix[2][0]++;
        }
        if (eventDetails.organizerLoc === "Bloomington") {
            locMatrix[2][1]++;
        }
        if (eventDetails.organizerLoc === "Woodbury") {
            locMatrix[2][2]++;
        }

        console.log("Location Matrix ", locMatrix, "count = " + eventDetails.inviteeCount);

        // case #1 all participants are in the same location return that location


        if ( locMatrix[0][0] == ( eventDetails.inviteeCount + 1 ) ) {
            returnLoc = "Maple Grove";
            flag1 = true;
        }
        if ( locMatrix[0][2] == ( eventDetails.inviteeCount + 1 ) ) {
            returnLoc = "White Bear Lake";
            flag1 = true;
        }

        if ( locMatrix[1][0] == ( eventDetails.inviteeCount + 1 ) ) {
            returnLoc= "Plymouth";
            flag1 = true;            
        }
        if ( locMatrix[1][1] == ( eventDetails.inviteeCount + 1 ) ) {
            returnLoc = "Minneapolis";
            flag1 = true;        
        }
        if ( locMatrix[1][2] == ( eventDetails.inviteeCount + 1 ) ) {
            returnLoc = "St. Paul";
            flag1 = true;        
        }
     

        if ( locMatrix[2][0] == eventDetails.inviteeCount + 1 ) {
            returnLoc = "Eden Prairie";
            flag1 = true;            
        }
        if ( locMatrix[2][1] == eventDetails.inviteeCount + 1 ) {
            returnLoc = "Bloomington";
            flag1 = true;            
        }
        if ( locMatrix[2][2] == eventDetails.inviteeCount + 1 ) {
            returnLoc = "Woodbury";
            flag1 = true;
        }

        
        if (flag1 == false ) {
            if ((locMatrix[0][0] + locMatrix[0][1] + locMatrix[0][2]) == eventDetails.inviteeCount + 1 ) {
            returnLoc = "Minneapolis";
            flag2 = true;
            }

            // All participants are in the east, center or west metro areas 
     
            if ((locMatrix[1][0] + locMatrix[1][1] + locMatrix[1][2]) == eventDetails.inviteeCount + 1 ) {
                returnLoc = "Minneapolis";
                flag2 = true;
            }

            // All participants are in the south/east, south or south west metro areas 

            if ((locMatrix[2][0] + locMatrix[2][1] + locMatrix[2][2]) == eventDetails.inviteeCount + 1 ) {
                returnLoc = "Bloomington";
                flag2 = true;
            }
        
            // All participants are in the north west or west or south west areas

            if ((locMatrix[0][0] + locMatrix[1][0] + locMatrix[2][0]) == eventDetails.inviteeCount + 1 ) {
                returnLoc = "Plymouth";
                flag2 = true;
            }

            // All participants are in the north  or center or southern areas

            if ((locMatrix[0][1] + locMatrix[1][1] + locMatrix[2][1]) == eventDetails.inviteeCount + 1 ) {
                returnLoc= "Minneapolis";
                flag2 = true;
            }

            // All participants are in the south east, east or south west areas

            if ((locMatrix[0][2] + locMatrix[1][2] + locMatrix[2][2]) == eventDetails.inviteeCount + 1 ) {
                returnLoc = "St. Paul";
                flag2 = true;
            }
            
        }
        // All participants are in the north/east, north or north west metro areas 

        

        // For all other cases, we will leave it to minneapolis
        if ( (flag1 == false) && (flag2 == false) ) {
            returnLoc = "Minneapolis";            
        }

        return returnLoc;


}  // end of determineMeetingLocation 


Template.schedule.rendered = function() {
		eventDetails = Session.get("eventDetails");
    	console.log(eventDetails);
		var loc = eventDetails.invitees[0].loc;
        var returnedResults;
        var minPrice = Session.get('minPrice');
        var maxPrice = Session.get('maxPrice');
		
		var cuisine = "";

		eventDetails.restaurantSelected = [];

		for (i = 0; i < 20; i++) 
			eventDetails.restaurantSelected[i] = false;

		cuisine = determineCuisine(eventDetails);

		console.log(cuisine);

        // Ideally it should be a function
        // Identify ideal location for the event based on invitees and organizer location

        loc = determineMeetingLocation(eventDetails);


        // if minPrice is more than maxPrice, swap them
        if (minPrice > maxPrice) {
            var tmp = maxPrice;
            maxPrice = minPrice;
            minPrice = tmp;

        }
    	
    	Meteor.call('getRestaurantList', loc, cuisine, minPrice, maxPrice, 5000, function(err, results) {
    		console.log("Server responded with ", results);
    		returnedResults = JSON.parse(results.content);
    		//console.log(returnedResults.results);
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

    	/* store the results returned by the API */

    	eventDetails.returnedResults = Session.get('returnedResults');
    	return Session.get('returnedResults');

    },

    'showPriceLevel' : function(priceLevel) {
        return  ratingSymbol (priceLevel);
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
    	var selectorIndex = 0;
    	console.log("Create event button was clicked");
    	eventDetails.pickedRestaurants = [];
    	eventDetails.pickedRestaurantsVote = [];
    	for (var i = 0; i < 20; i++) {
    		if (eventDetails.restaurantSelected[i] == true) {
    			eventDetails.pickedRestaurants[selectorIndex] = eventDetails.returnedResults[i];
    			eventDetails.pickedRestaurantsVote[selectorIndex] = 1;
    			selectorIndex++;
    		}
    		 
     	}
    	console.log("Final details ", eventDetails);

    	Events.insert({
    			eventDetails : eventDetails,
    			createdAt : new Date() 
    	});
    	alert("Event " + eventDetails.eventname + "created Successfully!");
    	Router.go('sent');
    }


});



