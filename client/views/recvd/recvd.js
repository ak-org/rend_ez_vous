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
            console.log(recvdEvents);
            return  recvdEvents;
        },

        organizerFullName : function(username) {
          fullName = Profiles.find({username: username}).fetch();
          //console.log("find full name ", fullName[0].realname, username);
          return fullName[0].realname;
        },

        listRestaurants : function (tracker, index, eventDetails) {
          var response = "";
          //console.log(selectedRestaurants);
          //console.log("index is " + index.length, tracker);
          //console.log(eventDetails.returnedResults[tracker]);
       
            if (index[tracker] === true) {
               response = "<li class=\"list-group-item\">";
               //response = eventDetails.returnedResults[index].name;
               response += "<h4>" + eventDetails.returnedResults[tracker].name + "</h4>";
               
               if (eventDetails.returnedResults[tracker].rating) {
                  response += "<h4> Rating " + eventDetails.returnedResults[tracker].rating + "/5, ";
               }
               
               switch (eventDetails.returnedResults[tracker].price_level) {
                case 1: 
                   response += " $ </h4>";
                   break;
                case 2 :
                   response += " $$ </h4>";
                   break;
                case 3 :
                   response += " $$$ </h4>";
                   break;
                case 4 :
                   response += " $$$$ </h4>";
                   break;

               }
               response += "<h5>" + eventDetails.returnedResults[tracker].formatted_address + "</h5>";
               response += "</li>";
               console.log("Found a match", response);
               return Spacebars.SafeString(response);
            }
          
          
        },

        trackIndex : function() {
            indexer++;
            return indexer - 1;
        }
      
  });


