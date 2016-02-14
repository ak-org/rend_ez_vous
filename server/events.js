
Meteor.publish('events', function() {
	
		return Events.find();
});


Events.allow({
    'insert': function (userId,doc) {
      /* user and doc checks ,
      return true to allow insert */
      return true; 
    },

    'update': function (userId,doc) {
      /* user and doc checks ,
      return true to allow insert */
      return !! userId
    }

  });
