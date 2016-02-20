
var userEvents;

Meteor.subscribe('events', function() {
  console.log("Number of Sent Events = "  + Events.find({"eventDetails.organizer" : Meteor.user().username}).count() );
});

Meteor.subscribe('profiles', function() {
  console.log("Number of Profiles = "  + Profiles.find({}).count() );
});


Template.sent.onRendered(function() {
        console.log(Meteor.user().username);
        
    }
);

Template.sent.helpers({
    eventList : function() {
        console.log("Inside eventlist");
        userEvents = Events.find({"eventDetails.organizer" : Meteor.user().username},{sort: {_id: 1}});
        console.log(Events.find({"eventDetails.organizer" : Meteor.user().username}).count(), userEvents.collection);
            return  userEvents;
        },

    eventStatus : function(eventDetails) {
      var acceptCount = 0;
     
      for (var index=0;index < eventDetails.inviteeCount; index++) {
           if (eventDetails.invitees[index].response == "Accepted") {
              acceptCount++;
           }
      }

      if (eventDetails.inviteeCount == acceptCount) {
        return "Confirmed";
      }
      else {
        return "Pending Confirmation";
      }
    },

    totalEvents : function () {
           return Events.find({"eventDetails.organizer" : Meteor.user().username}).count() ;
    },


    findRestaurantName : function(eventDetails) {
      console.log("event details" , eventDetails); 
      var restaurantList = "";
      for (var index=0; index < eventDetails.pickedRestaurants.length; index++) {
          restaurantList += "<h4>" + eventDetails.pickedRestaurants[index].name + "</h4>"
      }
      console.log(restaurantList);
      return restaurantList;
    },    

    isEventConfirmed : function(eventDetails) {
      var acceptCount = 0;
     
      for (var index=0;index < eventDetails.inviteeCount; index++) {
           if (eventDetails.invitees[index].response == "Accepted") {
              acceptCount++;
           }
      }

      if (eventDetails.inviteeCount == acceptCount) {
        return true;
      }
      else {
        return false;
      }

      
    },

    findVoteCount : function (eventDetails) {
      console.log("Inside find vote count ", eventDetails);
      var voteList = "";
      for (var index=0; index < eventDetails.pickedRestaurantsVote.length; index++) {
          if (eventDetails.pickedRestaurantsVote[index]) {
              voteList += "<h4>" + eventDetails.pickedRestaurantsVote[index] + "</h4>";
          }
          
      }
      console.log(voteList);
      return voteList;
    }      
    
  });


Template.sent.events({
    'click button' : function(e, tmpl) {

      var emailObj= {};
      var thisId = $(e.target).attr("id");

      var myEvents = Events.find({"_id" : thisId}).fetch();

      //console.log(myEvents[0].eventDetails.date);

      //alert("You click this id " + thisId);

      // find the organizer name

      var senderProfile = Profiles.find({"username" : myEvents[0].eventDetails.organizer}).fetch();
      console.log("An email will be sent on behalf of " + senderProfile[0].realname + " from email address " + Meteor.user().emails[0].address);
      emailObj.sendFrom = Meteor.user().emails[0].address;

      for (var index=0; index < myEvents[0].eventDetails.inviteeCount; index++) {

          var sendTo ;
         Meteor.call('get_user_by_username' ,  myEvents[0].eventDetails.invitees[0].name, function (err, result) {
          if (err != undefined) console.log(err);
          if (result) {
              sendTo = result;
              Session.set('sendTo', result);
              //console.log("assigning result" , result);
              sendTo =  Session.get('sendTo');
              //console.log("to " + sendTo.profile.realname + " at email address " + sendTo.emails[0].address );
              emailObj.sendTo = sendTo.emails[0].address;
              emailObj.subject = "Invite for " + myEvents[0].eventDetails.eventname + " on " + myEvents[0].eventDetails.date;
              emailObj.content = "Hello " + myEvents[0].eventDetails.invitees[0].realname + ", <br>";
              emailObj.content +=  "You are invited to <strong>" + myEvents[0].eventDetails.eventname + " <strong> at " + findVenue(myEvents[0].eventDetails);
              emailObj.content += "<br><br>Regards, <br>" + senderProfile[0].realname;
              emailObj.content += "<br><br>Courtesy : Rendezvous Team <br>";

              console.log(emailObj);  
              Meteor.call('sendInvites', emailObj, function (err, res) {
                console.log("Results of send is ", res);
              });


          } 
        });
        


      }
         

      //for (var index = 0; myEvents[0].eventDetails.inviteeCount; index++) {
      //    console.log(myEvents[0].eventDetails.invitees[index].name);
          //console.log(" to " , Meteor.call('get_users_by_username', myEvents[0].eventDetails.invitees[index].name));
      //}
     

      // find the invitees 
      // create email text
    }


});

function findVenue(eventDetails) {
          var highestVote = 1;
          var highestIndex = 0;
          var venueDetails;
          var tiedVotes = false;


          for (var index=0; index < eventDetails.pickedRestaurantsVote.length; index++) {
              if (eventDetails.pickedRestaurantsVote[index] > highestVote) {
                  highestVote = eventDetails.pickedRestaurantsVote[index];
                  highestIndex = index;
              }
          }

          // find first instance of highest vote in the array
          // find last instance of the highest vote in the array

          var firstInstance = eventDetails.pickedRestaurantsVote.indexOf(highestVote);
          var lastInstance =  eventDetails.pickedRestaurantsVote.lastIndexOf(highestVote);

          if (firstInstance === lastInstance) {
              //console.log("No Duplicate found for the highest vote.");
          }
          else {
              var indices = [];
              var idx = eventDetails.pickedRestaurantsVote.indexOf(highestVote);

              while (idx != -1) {
                indices.push(idx);
                idx = eventDetails.pickedRestaurantsVote.indexOf(highestVote, idx + 1);
              }
              console.log("We have a tie.", indices);
              tiedVotes = true;
              // among tied restaurants, try to sort by ratings
              var highestRating = 0.0;
              for (var i=0; i < indices.length; i++) {
                  if (eventDetails.pickedRestaurants[indices[i]].rating > highestRating) {
                    highestRating = eventDetails.pickedRestaurants[indices[i]].rating;
                    highestIndex = indices[i];
                  }
              }
              //console.log("Highest rating is ", highestRating);
          }

          //console.log("Highest index is ", highestIndex, eventDetails.pickedRestaurants);
          
          venueDetails = '<h3>' + eventDetails.pickedRestaurants[highestIndex].name  + '</h3><br>' + eventDetails.pickedRestaurants[highestIndex].formatted_address + 
                         "<br> Rating is " + eventDetails.pickedRestaurants[highestIndex].rating + "/5" +
                         "<br> " + ratingSymbol(eventDetails.pickedRestaurants[highestIndex].price_level);
          console.log("return venue " + venueDetails);
          return venueDetails;
}



