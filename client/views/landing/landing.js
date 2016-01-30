
Meteor.subscribe('events', function() {
  console.log("Number of Events = "  + Events.find({}).count() );
});


Template.landing.helpers({
	eventSentCount : function() {
		return Events.find({"eventDetails.organizer" : Meteor.user().username}).count();
	},
	upcomingEventsCount : function() {
		return Events.find({}).count();
	},
	recvdEventCount: function() {
		return Events.find({"eventDetails.invitees.name" : Meteor.user().username}).count();
	},


});


Template.landing.events({

		'click #user-profile' : function(e, data) {
            e.preventDefault();
            console.log("You clicked profile");
            Router.go('profile')
        }
});