if (Meteor.isClient) {
	  // This code only runs on the client
  Template.recvd.helpers({
    invites: [
      { title : "Lunch with Rob, Di on 1/31/2016 at 11:30 AM" },

      { title: "Dinner with Ben on 1/12/2016 at 7:00 PM" }
    ]
  });

}

