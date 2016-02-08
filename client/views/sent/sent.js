
var userEvents;

Meteor.subscribe('events', function() {
  console.log("Number of Sent Events = "  + Events.find({"eventDetails.organizer" : Meteor.user().username}).count() );
});

Meteor.subscribe('profiles', function() {
  console.log("Number of Events = "  + Profiles.find({}).count() );
});


Template.sent.onRendered(function() {
        console.log(Meteor.user().username);
        
    }
);

Template.sent.helpers({
    eventList : function() {
        
        userEvents = Events.find({"eventDetails.organizer" : Meteor.user().username});
            //console.log(userEvents.collection);
            return  userEvents;
        },

    restaurantName : function(index, eventDetails) {
      return eventDetails.returnedResults[index].name;
    },    

    totalEvents : function () {
           return Events.find({"eventDetails.organizer" : Meteor.user().username}).count() ;
    }        
    
  });



