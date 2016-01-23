if (Meteor.isClient) {
	  // This code only runs on the client
  Template.sent.helpers({
    pending: [
      { title : "Office Lunch ",
        yes : '2',
        no: '1',
        undecided : '1'
       },

      { title: "Birthday Dinner at RedRobin",
        yes : '4',
        no: '1',
        undecided : '0'
      }
    ]
  });

}

