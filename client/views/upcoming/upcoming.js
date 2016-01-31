
var userEvents;

Meteor.subscribe('events', function() {
  console.log("Number of Events = "  + Events.find({}).count() );
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
    }        
    
  });

