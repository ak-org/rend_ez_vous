
var userEvents;

Meteor.subscribe('events', function() {
  console.log("Number of Events = "  + Events.find({}).count() );
});

Meteor.subscribe('profiles', function() {
  console.log("Number of Events = "  + Profiles.find({}).count() );
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
         var eventStatus = "Confirmed";
         //console.log (invitees);
         for (var i = 0; i < invitees.length; i++) {
            if (invitees.response !== "Accepted") {
              eventStatus = "Pending Confirmation";
            }
         }
         return eventStatus;
    }       
    
  });

