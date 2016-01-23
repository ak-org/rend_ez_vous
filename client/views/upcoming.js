if (Meteor.isClient) {
	  // This code only runs on the client
  Template.upcoming.helpers({
    invites: [
      { title : "Team Lunch - Thursday at 11:30 AM" },

      { title: "Dinner with Parents - Sunday  at 7:00 PM" }
    ]
  });

}

