
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
                                     {"eventDetails.invitees.name" : Meteor.user().username}]}, {sort: {_id: 1}});
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
        return findVenue(eventDetails);
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




