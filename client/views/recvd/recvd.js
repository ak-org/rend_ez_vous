var recvdEvents;
var indexer = 0;

Meteor.subscribe('events', function() {
  console.log("Number of Recvd Events = "  + Events.find({"eventDetails.invitees.name" : Meteor.user().username}).count() );
});

Meteor.subscribe('profiles', function() {
  console.log("Number of Events = "  + Profiles.find({}).count() );
});


Template.recvd.onRendered(function() {
        console.log(Meteor.user().username);
        indexer = 0;
        
    }
);




	  // This code only runs on the client
  Template.recvd.helpers({
        invitees: function() {
        
        recvdEvents = Events.find({"eventDetails.invitees.name" : Meteor.user().username});
            //console.log(userEvents.collection);
            //console.log(recvdEvents);
            return  recvdEvents;
        },

        organizerFullName : function(username) {
          fullName = Profiles.find({username: username}).fetch();
              //console.log("find full name ", fullName[0].realname, username);
              return fullName[0].realname;
        },

        restaurantName : function(index, eventDetails) {
              return eventDetails.returnedResults[index].name;
        },

        ratingRanking : function(index, eventDetails) {
               var response = "";
               var tracker = index;
               if (eventDetails.returnedResults[tracker].rating) {
                  response += "Rating " + eventDetails.returnedResults[tracker].rating + "/5, ";
               }

               switch (eventDetails.returnedResults[tracker].price_level) {
                case 1: 
                   response += " $ ";
                   break;
                case 2 :
                   response += " $$ ";
                   break;
                case 3 :
                   response += " $$$ ";
                   break;
                case 4 :
                   response += " $$$$ ";
                   break;

               }
              return response;
        },

        restaurantAddress : function(index, eventDetails) {
              return eventDetails.returnedResults[index].formatted_address;
        }
      
  });


