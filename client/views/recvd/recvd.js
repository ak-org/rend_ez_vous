var recvdEvents;

Meteor.subscribe('events', function() {
  console.log("Number of Recvd Events = "  + Events.find({"eventDetails.invitees.name" : Meteor.user().username}).count() );
});


Template.recvd.onRendered(function() {
        console.log(Meteor.user().username);
        
    }
);




	  // This code only runs on the client
  Template.recvd.helpers({
    invitees: function() {
        
        recvdEvents = Events.find({"eventDetails.invitees.name" : Meteor.user().username});
            //console.log(userEvents.collection);
            return  recvdEvents;
        },
      
  });


