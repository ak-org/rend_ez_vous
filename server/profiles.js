//Profiles = new Meteor.Collection('profiles');

Meteor.publish('profiles', function() {
	
		return Profiles.find();
});

Meteor.publish('userprofiles', function() {
    console.log('Publishing userprofiles ' + Profiles.find().count());
    return Profiles.find();

});



Profiles.allow({
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

