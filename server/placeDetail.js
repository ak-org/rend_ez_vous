Meteor.publish('placeDetails', function() {
	
		return PlaceDetails.find();
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
