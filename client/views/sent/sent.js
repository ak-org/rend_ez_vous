
var userEvents;

Meteor.subscribe('events', function() {
  console.log("Number of Sent Events = "  + Events.find({"eventDetails.organizer" : Meteor.user().username}).count() );
});

Meteor.subscribe('profiles', function() {
  console.log("Number of Profiles = "  + Profiles.find({}).count() );
});


Template.sent.onRendered(function() {
        console.log(Meteor.user().username);
        
    }
);

Template.sent.helpers({
    eventList : function() {
        console.log("Inside eventlist");
        userEvents = Events.find({"eventDetails.organizer" : Meteor.user().username},{sort: {_id: 1}});
        console.log(Events.find({"eventDetails.organizer" : Meteor.user().username}).count(), userEvents.collection);
            return  userEvents;
        },

    eventStatus : function(eventDetails) {
      var acceptCount = 0;
     
      for (var index=0;index < eventDetails.inviteeCount; index++) {
           if (eventDetails.invitees[index].response == "Accepted") {
              acceptCount++;
           }
      }

      if (eventDetails.inviteeCount == acceptCount) {
        return "Confirmed";
      }
      else {
        return "Pending Confirmation";
      }
    },

    totalEvents : function () {
           return Events.find({"eventDetails.organizer" : Meteor.user().username}).count() ;
    },


    findRestaurantName : function(eventDetails) {
      console.log("event details" , eventDetails); 
      var restaurantList = "";
      for (var index=0; index < eventDetails.pickedRestaurants.length; index++) {
          restaurantList += "<h4>" + eventDetails.pickedRestaurants[index].name + "</h4>"
      }
      console.log(restaurantList);
      return restaurantList;
    },    

    isEventConfirmed : function(eventDetails) {
      var acceptCount = 0;
     
      for (var index=0;index < eventDetails.inviteeCount; index++) {
           if (eventDetails.invitees[index].response == "Accepted") {
              acceptCount++;
           }
      }

      if (eventDetails.inviteeCount == acceptCount) {
        return true;
      }
      else {
        return false;
      }

      
    },

    findVoteCount : function (eventDetails) {
      console.log("Inside find vote count ", eventDetails);
      var voteList = "";
      for (var index=0; index < eventDetails.pickedRestaurantsVote.length; index++) {
          if (eventDetails.pickedRestaurantsVote[index]) {
              voteList += "<h4>" + eventDetails.pickedRestaurantsVote[index] + "</h4>";
          }
          
      }
      console.log(voteList);
      return voteList;
    }      
    
  });


Template.sent.events({
    'click button' : function(e, tmpl) {
      var thisId = $(e.target).attr("id");
      //alert("You click this id " + thisId);

      // find the organizer name
      // find the invitees 
      // create email text
    }


});


