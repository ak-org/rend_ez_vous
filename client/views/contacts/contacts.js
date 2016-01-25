
/* 
  Subscribe to publish by the servers 

*/
Meteor.subscribe('userprofiles', function() {
  console.log("count of userprofiles = "  + Profiles.find({}).count() );
});
Meteor.subscribe('friends', function() {
  console.log("count of friends = "  + Friends.find({}).count() );
});
Meteor.subscribe('family', function() {
  console.log("count of family = "  + Family.find({}).count() );
});
Meteor.subscribe('coworkers', function() {
  console.log("count of coworkers = "  + CoWorkers.find({}).count() );
});


Template.contacts.helpers({
    friends: function() {
      return Friends.find({username : Meteor.user().username});
    },

    family : function() {
      return Family.find({username : Meteor.user().username});
    
    },

    coworkers : function() {
      return CoWorkers.find({username : Meteor.user().username});
    }
    

});


Template.contacts.events({
  'click #addcontact' : function(e, data) {

      e.preventDefault();

      var contactName = data.find('#contactname').value;
      var isFamilySelected = data.find('#myfamily').checked;
      var isFriendSelected = data.find('#myfriend').checked;
      var isCoworkerSelected = data.find('#mycoworker').checked;
      var username = data.find('#username').value;



      console.log("Total records = " + Profiles.find({}).count());
      console.log("looking for " + contactName);

      var res = Profiles.find({username : contactName}).fetch();
      var friendRes = Friends.find({username : username, contactname : contactName}).fetch();
      var familyRes = Family.find({username : username, contactname : contactName}).fetch();
      var coworkersRes = CoWorkers.find({username : username, contactname : contactName}).fetch();


      console.log("result is" , res.length);
      console.log("Contact check results " , contactName, friendRes.length, familyRes.length, coworkersRes.length);

      if ( (contactName === "") || (!res.length) ) {
          alert("Specified name is not a valid user or you left the field empty!" + contactName);

      }
      else if ( (friendRes.length) || (familyRes.length) || (coworkersRes.length)) {
          alert(contactName + " is already in your contact list.", friendRes.length, 
                                                                    familyRes.length, 
                                                                    coworkersRes.length);
      }
      else if ( contactName === username) {
           alert(" You are trying to add yourself to the contact list."); 
      }
      else {
            
            if (isFamilySelected) {
              category = "Family";
              Family.insert({
                  username : username,
                  contactname : contactName
              });
            }
            
            if (isFriendSelected) {
               Friends.insert({
                  username : username,
                  contactname : contactName
              });
              category = "Friend";    
            }  
            
            if (isCoworkerSelected) {
               CoWorkers.insert({
                  username : username,
                  contactname : contactName
              });              
              category = "Co Worker";
            }

            console.log("You want to add " + contactName + " in your " + category + " list.");


      }
      


    }
});

/*
  Template.contacts.helpers({
    friends: [
      { name : "Don"},
      { name: "Bob"}
    ],
    family : [
    { name : "Danny"},
      { name: "Amy"}
    ],
    coworkers: [
           { name : "Ken"},
      { name: "Tony"},
          { name : "Charles"},
      { name: "Ron"},
          { name : "Leif"},
      { name: "Beth"}
    ]
  });

*/
