
Meteor.subscribe('events', function() {

  //console.log("Number of Upcoming Events = "  + Events.find({ $or : [{"eventDetails.organizer" : Meteor.user().username}, 
  																	// {"eventDetails.invitees.name" : Meteor.user().username}]}).count() );
  //console.log("recvd event count = " + Events.find({"eventDetails.invitees.name" : Meteor.user().username}).count());
  //console.log("Invitees name = " +  Meteor.user().username);
});


Template.landing.helpers({
	eventSentCount : function() {
		var sentEvents = Events.find({"eventDetails.organizer" : Meteor.user().username}).count();
		console.log("returning sent events " + sentEvents);
		return sentEvents;
	},
	upcomingEventsCount : function() {
		var upcomingEvents = Events.find({ $or : [{"eventDetails.organizer" : Meteor.user().username}, 
  																	 {"eventDetails.invitees.name" : Meteor.user().username}]}).count();
		console.log("Returning Upcoming Events = " + upcomingEvents);
		return upcomingEvents;
	},
	eventRecvdCount: function() {
		var recvdEvents = Events.find({"eventDetails.invitees.name" : Meteor.user().username}).count();
		console.log("returning recvd events " + recvdEvents);
		return recvdEvents;
	}, 


});


Template.landing.events({

		'click #user-profile' : function(e, data) {
            e.preventDefault();
            Session.set('loggedinusername' , Meteor.user().username);
            console.log("You clicked profile " + " for " + Session.get('loggedinusername'));
            Router.go('profile')
        }
});