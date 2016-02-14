
var userEvents;

Meteor.subscribe('events', function() {
  console.log("Number of Events = "  + Events.find({}).count() );
});

Meteor.subscribe('profiles', function() {
  console.log("Number of Profiles = "  + Profiles.find({}).count() );
});


Template.upcoming.onRendered(function() {
        console.log(Meteor.user().username);
        
    }
);

Template.upcoming.helpers({
    eventList : function() {
        
        userEvents = Events.find({ $or : [{"eventDetails.organizer" : Meteor.user().username}, 
                                     {"eventDetails.invitees.name" : Meteor.user().username}]});
            console.log(userEvents.collection);
            return  userEvents;
        },
    totalEvents : function () {
           return Events.find({}).count() ;
    },

    organizerFullName : function(username) {
        fullName = Profiles.find({username: username}).fetch();
        //console.log("find full name ", fullName[0].realname, username);
        return fullName[0].realname;
    },

    eventStatus : function (invitees) {

         return determineEventStatus(invitees);
    },

    determineVenue: function(eventDetails) {

      // is there a clear winner
      if (determineEventStatus(eventDetails.invitees) !== "Confirmed") {
        return "Pending Invite Acceptance";
      } 
      else {
          var highestVote = 1;
          var highestIndex = 0;
          var venueDetails;
          var tiedVotes = false;


          for (var index=0; index < eventDetails.pickedRestaurantsVote.length; index++) {
              if (eventDetails.pickedRestaurantsVote[index] > highestVote) {
                  highestVote = eventDetails.pickedRestaurantsVote[index];
                  highestIndex = index;
              }
          }

          // find first instance of highest vote in the array
          // find last instance of the highest vote in the array

          var firstInstance = eventDetails.pickedRestaurantsVote.indexOf(highestVote);
          var lastInstance =  eventDetails.pickedRestaurantsVote.lastIndexOf(highestVote);

          if (firstInstance === lastInstance) {
              console.log("No Duplicate found for the highest vote.");
          }
          else {
              var indices = [];
              var idx = eventDetails.pickedRestaurantsVote.indexOf(highestVote);

              while (idx != -1) {
                indices.push(idx);
                idx = eventDetails.pickedRestaurantsVote.indexOf(highestVote, idx + 1);
              }
              console.log("We have a tie.", indices);
              tiedVotes = true;
              // among tied restaurants, try to sort by ratings
              var highestRating = 0.0;
              for (var i=0; i < indices.length; i++) {
                  if (eventDetails.pickedRestaurants[indices[i]].rating > highestRating) {
                    highestRating = eventDetails.pickedRestaurants[indices[i]].rating;
                    highestIndex = indices[i];
                  }
              }
              console.log("Highest rating is ", highestRating);
          }

          console.log("Highest index is ", highestIndex, eventDetails.pickedRestaurants);
          
          venueDetails = eventDetails.pickedRestaurants[highestIndex].name  + '<br>' + eventDetails.pickedRestaurants[highestIndex].formatted_address + 
                         "<br> Rating is " + eventDetails.pickedRestaurants[highestIndex].rating + "/5" +
                         "<br> " + ratingSymbol(eventDetails.pickedRestaurants[highestIndex].price_level);
          return venueDetails;
      }
    }              
    
  });

  function determineEventStatus(invitees) {
        var eventStatus = "Confirmed";
         //console.log (invitees);
         for (var i = 0; i < invitees.length; i++) {
            if (invitees[i].response != "Accepted") {
              console.log(invitees[i].response);
              eventStatus = "Pending Confirmation";
            }
         }

         return eventStatus;

  }



function ratingSymbol(price_level) {
               var response = "";
               
               switch (price_level) {
                case 1: 
                   response += " $ ";
                   break;
                case 2 :
                   response += " $$ ";
                   break;
                case 3 :
                   response += " $$$ ";
                   break;
                case 4 :
                   response += " $$$$ ";
                   break;

               }
        return response;

}

