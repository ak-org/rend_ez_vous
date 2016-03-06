
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

Template.contacts.onRendered(function(){
      Session.set('partialSearch', '');
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
    },

    showRealname : function(username) {
      var result = Profiles.find({username: username}).fetch();
      return result[0].realname;
    },

    partialSearchResults : function() {

      console.log("partialSearchResults", Session.get('partialSearch'));
      return Session.get('partialSearch');
    }

    

});


Template.contacts.events({
   "keyup input#contactname" : function(event, data) {
        

        
        var partialSearchResults = [];
        var searchUser = data.find('#contactname').value;
        username = data.find('#username').value;
        console.log("search field length ", searchUser.length);
        if (searchUser.length == 0 ) {

        }
        else {
          partialSearch1 = Profiles.find({realname: {$regex : new RegExp(searchUser, "i")}}).fetch();
          for (var i=0; i < partialSearch1.length; i++) {
              res1 = Friends.find({username : username, contactname : partialSearch1[i].username}).fetch();
              res2 = Family.find({username : username, contactname : partialSearch1[i].username}).fetch();
              res3 = CoWorkers.find({username : username, contactname : partialSearch1[i].username}).fetch();

              if ( (res1.length == 0) && (res2.length == 0) && (res3.length == 0) ) {
                partialSearchResults.push(partialSearch1[i]);
              }

          }
          
        }
        
        
        console.log("keyup : ", partialSearchResults);
        Session.set('partialSearch', partialSearchResults);
        return partialSearchResults;       

    },
  "click #addOneFriend" : function( event, data) {
    console.log(event.currentTarget.value);
    data.find('#contactname').value = event.currentTarget.value;
    Session.set('partialSearch', '');
  },

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
