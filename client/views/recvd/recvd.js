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

});




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

               return ratingSymbol(index, eventDetails);


               
        },

        restaurantAddress : function(index, eventDetails) {
              return eventDetails.returnedResults[index].formatted_address;
        },

        updateVotes: function(index, id, eventDetails) {

          var updatedVotesSession = "updatedVotes"+index;
          var updatedVotesId = "updatedVotesId"+index;
          Session.set(updatedVotesSession, eventDetails);
          Session.set(updatedVotesId, id);
          console.log("Update Votes ", index, id, eventDetails);
          console.log(updatedVotesSession, updatedVotesId);
        }
      
  });

  Template.recvd.events({



    'click .invite-choices-accept' : function (e, data) {
      
      var acceptedRestaurant = [];
      var thisId = $(e.target).attr("id");
      var updatedVotesSession = "updatedVotes"+thisId;
      var updatedVotesId = "updatedVotesId"+thisId;

      console.log(e,thisId, updatedVotesSession, updatedVotesId );
      
      var updateEventDetails = Session.get(updatedVotesSession);
      var idToUpdate = Session.get(updatedVotesId);
      console.log("Event details");
      console.log( updateEventDetails, idToUpdate );

      //var rejectedRestaurant = [];
      var restaurantChosen = false;
      var returnAccept = false;
      var userVotes;
      var inviteeIndex = 0;


       for (var index=0; index < updateEventDetails.inviteeCount; index++) {
          if ( (updateEventDetails.invitees[index].name ==  Meteor.user().username) )
             {
                  inviteeIndex = index;
                  userVotes = updateEventDetails.invitees[index].votes;

             }
      }

      for (var index=0; index < updateEventDetails.inviteeCount; index++) {
          if ( (updateEventDetails.invitees[index].name ==  Meteor.user().username) && 
               (updateEventDetails.invitees[index].response == "Accepted"))
             {
              
              console.log('You have already accepted the invite');
              returnAccept = true;
             }
      }

      for (var index = 0; index < 20; index++ ) {
         var idYes = '#responseYes'  + index;
         var idNo = '#responseNo' + index;
         if (data.find(idYes) != null) {
            acceptedRestaurant[index] = data.find(idYes).checked;
            if (acceptedRestaurant[index] == true) {
               restaurantChosen = true;
            }
            console.log("Toggling checked flags - Yes");

            //rejectedRestaurant[index] = data.find(idNo).checked;
         }
         else {
            acceptedRestaurant[index] = null;
            
         }

         if (data.find(idNo) !== null) {
          console.log("Toggling checked flags - no");


         }

      }
      
      if (restaurantChosen == false) {
        alert("Please chose a restaurant before accepting the invite");
      }
      else {

        console.log("You accepted the event", acceptedRestaurant, idToUpdate, userVotes); 
        var updateIndex = 0;


        for (var index = 0; index < 20; index++ ) { 

           if ((acceptedRestaurant[index] == true) && (userVotes[updateIndex] == false)) {
                  console.log("Added one vote", index);
                  updateEventDetails.pickedRestaurantsVote[updateIndex] += 1;
                  userVotes[updateIndex] = true;       
                  
           }
           if ((acceptedRestaurant[index] == false) && ((userVotes[updateIndex] == true) )) {
              // Remove vote only if user voted yes for this restaurant
                    console.log("Removed one vote", index);
                   updateEventDetails.pickedRestaurantsVote[updateIndex] -= 1;
                   userVotes[updateIndex] = false;
             
           }
           if (acceptedRestaurant[index] != null) {
              updateIndex++;
           }
            
              
       }   

       for (var index=0; index < updateEventDetails.inviteeCount; index++) {
          if (updateEventDetails.invitees[index].name ==  Meteor.user().username) {
              console.log('Changed accept to invite for ' + updateEventDetails.invitees[index].name);
              updateEventDetails.invitees[index].response = "Accepted";
          }
          else {
              console.log("Error : cannot " + updateEventDetails.invitees[index].name + " in the invitee list");
          }
       }

           console.log("Vote Count", userVotes); 
       // We have updated votecount and changed status to accept 
            for (var index=0; index < updateEventDetails.pickedRestaurantsVote.length; index++) {
                 updateEventDetails.invitees[inviteeIndex].votes[index] = userVotes[index];
            }

            Events.update(idToUpdate, {$set : { "eventDetails.invitees" : updateEventDetails.invitees }}, function(error) {
                                                console.log("update 1 results = " , error);
            });
      
                                          

            Events.update(idToUpdate, {$set : {  "eventDetails.pickedRestaurantsVote" : updateEventDetails.pickedRestaurantsVote} }, function(error) {

                                                console.log("update 3 results = " , error);
            });

       
   

        }
        alert("Thanks for accepting the Invite");


 

    },


    'click .invite-choices-decline' : function (e, data) {
          var idToUpdate = Session.get('updateVotesId');
          var updateEventDetails = Session.get('updateVotes');

          if (updateEventDetails.invitees[0].response == "Declined") {
             alert("You have already declined the event");
          }
          else {


             for (var index=0; index < updateEventDetails.inviteeCount; index++) {
                  if (updateEventDetails.invitees[0].name ==  Meteor.user().username) {
                console.log('Changed accept to declined');
                updateEventDetails.invitees[0].response = "Declined";
                }
              } 

          }
   
          
          Events.update(idToUpdate, {$set : { "eventDetails.invitees" : updateEventDetails.invitees }}, function(error) {
                                                console.log("update results = " , error);
     

      //console.log("You declined the event", e, data);
          });

          alert("Sorryou can't make it. You can accept invite if you chane your mind.");
     }

   });


function ratingSymbol(index, eventDetails) {
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

}