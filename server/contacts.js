//Friends = new Meteor.Collection('friends');

Meteor.publish('friends', function() {
	
		return Friends.find();
});

Friends.allow({
    'insert': function (userId,doc) {
      /* user and doc checks ,
      return true to allow insert */
      return true; 
    },

    'update': function (userId,doc) {
      /* user and doc checks ,
      return true to allow insert */
      return true; 
    }

});


//Family = new Meteor.Collection('family');

Meteor.publish('family', function() {
  
    return Family.find();
});

Family.allow({
    'insert': function (userId,doc) {
      /* user and doc checks ,
      return true to allow insert */
      return true; 
    },

    'update': function (userId,doc) {
      /* user and doc checks ,
      return true to allow insert */
      return true; 
    }

});


//CoWorkers = new Meteor.Collection('coworkers');

Meteor.publish('coworkers', function() {
  
    return CoWorkers.find();
});

CoWorkers.allow({
    'insert': function (userId,doc) {
      /* user and doc checks ,
      return true to allow insert */
      return true; 
    },

    'update': function (userId,doc) {
      /* user and doc checks ,
      return true to allow insert */
      return true; 
    }

});