
Meteor.subscribe('friends', function() {
  console.log("count of friends = "  + Friends.find({}).count() );
});
Meteor.subscribe('family', function() {
  console.log("count of family = "  + Family.find({}).count() );
});
Meteor.subscribe('coworkers', function() {
  console.log("count of coworkers = "  + CoWorkers.find({}).count() );
});

Meteor.subscribe('profiles', function() {
  console.log("count of Profiles = "  + Profiles.find({}).count() );
});

var ampm;
var day;
var year;
var month;
var hour;
var min;
var contactname;
var username;
var res1, res2, res3;
var eventname;
var eventDetails = {};
var orgLoc;

// local object to make the invitee list dynamic 
var invitees = new Mongo.Collection(null);
var searchResults = new Mongo.Collection(null);



Template.myevent.onRendered(function() {
    this.$('.datetimepicker').datetimepicker({
         useCurrent : true,
         viewMode: 'years'
    });
    Session.set('partialSearch', []);
    invitees.remove({});
    searchResults.remove({});
});



Template.myevent.helpers({
    ampm: function(){
        return ["AM", "PM"];
    },
    months: function() {
    	return ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", 
    	        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    },

    years: function() {
    	return ["2016", "2017"];
    },

    hours: function() {   
    	return [1,2,3,4,5,6,7,8,9,10,11,12];
    },

    minutes: function() {
    	return ["00", "15", "30", "45"];
    },

    years: function() {
    	return ["2016", "2017"];
    },
    days: function() {
    	return [1,2,3,4,5,6,7,8,9,10,
    			11,12,13,14,15,16,17,18,19,20,
    			21,22,23,24,25,26,27,28,29,30,
    			31];
    },
    friendlist : function() {
      return invitees.find({});
    },
    currentDate: function() {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();

      if(dd<10) {
          dd='0'+dd
      } 

      if(mm<10) {
          mm='0'+mm
      } 
      time = today.getHours() + ":" + today.getMinutes();

      today = mm+'/'+dd+'/'+yyyy+time;
      return (today);
    },


    partialSearchResults : function() {

      console.log("partialSearchResults", Session.get('partialSearch'));
      return Session.get('partialSearch');
    },

    locationSearchResults : function() {

        
        var returnData = Session.get('locationSearchResults');
        
        
        if (returnData.status == "OK") {
           //console.log(returnData.predictions);
           return returnData.predictions;
           
        }

        
       

      }
     
    


      

});



Template.myevent.events({


    "keyup input#friendname" : function(event, data) {
        

        
        var partialSearchResults = [];
        var searchUser = data.find('#friendname').value;
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

              if ( (res1.length > 0) || (res2.length > 0) || (res3.length > 0) ) {
                partialSearchResults.push(partialSearch1[i]);
              }

          }
          
        }
        
        
        console.log("keyup : ", partialSearchResults);
        Session.set('partialSearch', partialSearchResults);
        return partialSearchResults;

        

    },


    "keyup input#eventLocation" : function(event, data) {

          var search = data.find('#eventLocation').value;

          if (search.length < 2) {
              Session.set('locationSearchResults', '');
          }
          if (search.length > 1) {
            Meteor.call('validateLocationForEvent', search, function(err, results) {
              console.log("Server responded with ", JSON.parse(results.content));
              Session.set('locationSearchResults', JSON.parse(results.content));
          });

          }
          
          
    },

    "click #selectLocation" : function( event, data) {
    console.log(event.currentTarget.value);
    data.find('#eventLocation').value = event.currentTarget.value;
    Session.set('locationSearchResults', '');
  },

    /*
    "click #addfriend" : function (event, data) {
        eventname = data.find('#eventName').value;
        contactname = data.find('#friendname').value;
        username = data.find('#username').value;


        res1 = Friends.find({username : username, contactname : contactname}).fetch();
        res2 = Family.find({username : username, contactname : contactname}).fetch();
        res3 = CoWorkers.find({username : username, contactname : contactname}).fetch();
        
        var userVotes = new Array(20);
        console.log("User Votes ",  userVotes);

        for (var i=0; i < userVotes.length; i++) {
          userVotes[i] = false;
        }
        console.log("User Votes ",  userVotes);
        

    	if ( (res1.length > 0) || 
             (res2.length > 0) || 
             (res3.length > 0) )

      	{
    	    console.log("you want to add a friend " + contactname + " in " + eventname);	
            var myres = invitees.find({name : contactname}).fetch();
            if ((myres.length) && (myres.length > 0))  {
                console.log( contactname + " is already in the invitee list!");
            }
            else {
                realname = Profiles.find({username: contactname}).fetch();
                orgLoc = Profiles.find({username: username}).fetch();
                Session.set('organizerLoc', orgLoc[0].city);
                Session.set('organizerCuisinePref', orgLoc[0].cuisine);
                console.log(realname[0].realname);
                console.log("User Votes ",  userVotes);
                invitees.insert({name : contactname, realname : realname[0].realname, loc : realname[0].city, cuisine: realname[0].cuisine, votes : userVotes, response : 'NoResponse'});
                console.log("Added " + contactname + " to the invitee list!");
                console.log("Invitees for  your event " , invitees.find().count());
            }
    	}
    	else {
    		alert("No Match found");
    	}
    	
         data.find('#friendname').value = "";
         data.find('')
    	//  var username  = data.find('#username').value;	
    },

    */

    "click #addOneFriend" : function( event, data) {
          //console.log("You clicked on one friend");
          //console.log(data);
          console.log(event.currentTarget.value);
          var addUser = event.currentTarget.value;
          var myres = invitees.find({name : addUser}).fetch();
          username = data.find('#username').value;

          var userVotes = new Array(20);
          console.log("User Votes ",  userVotes);

          for (var i=0; i < userVotes.length; i++) {
            userVotes[i] = false;
          }
          
            if ((myres.length) && (myres.length > 0))  {
                console.log( contactname + " is already in the invitee list!");
            }
            else {
                realname = Profiles.find({username: addUser}).fetch();
                orgLoc = Profiles.find({username: username}).fetch();
                Session.set('organizerLoc', orgLoc[0].city);
                Session.set('organizerCuisinePref', orgLoc[0].cuisine);
                console.log(realname[0].realname);
                console.log("User Votes ",  userVotes);
                invitees.insert({name : addUser, realname : realname[0].realname, loc : realname[0].city, cuisine: realname[0].cuisine, votes : userVotes, response : 'NoResponse'});
                console.log("Added " + addUser + " to the invitee list!");
                console.log("Invitees for  your event " , invitees.find().count());
            }

          /* data.find('#friendname').value = event.currentTarget.value; */
          data.find('#friendname').value = "";
          Session.set('partialSearch', []);



    },


    "click #event-next" : function( event, data) {
        
         var eventDate = data.find('.set-due-date').value;
         var eventFlag = true;
         var dateFlag = true;
         var inviteeFlag = true;

         var min_price = data.find('#min_price').value;
         var max_price = data.find('#max_price').value;

         console.log("min_price is " + min_price + " max_price is " + max_price);
         eventname = data.find('#eventName').value;
         


         console.log("You clicked review restaurants");

         if (!eventname) {
            console.log("Please specify event name");
            eventFalg = false;
         }

         if ( eventDate == undefined) {
            console.log("Please specify date and time");
            dateFlag = false;
         }
         else {
            console.log(eventDate);
         }

        if (invitees.find().count() < 1) {
            console.log("Please invite guests !");
            inviteeFlag = false;
        }




        /* Data collection is complete at the moment */
        if ( (eventFlag) && (dateFlag) && (inviteeFlag) ) {

      


            eventDetails.eventname = eventname;
            eventDetails.date = eventDate;
            eventDetails.organizer = username;
            eventDetails.organizerLoc = Session.get('organizerLoc');
            eventDetails.organizerCuisinePef = Session.get('organizerCuisinePref');
            eventDetails.inviteeCount = invitees.find().count();
            eventDetails.invitees = invitees.find().fetch();
            
            eventDetails.selectedLocation = data.find('#eventLocation').value;
            if (eventDetails.selectedLocation != '') {
                eventDetails.overrideLocation = true;
            } else {
                eventDetails.overrideLocation = false;
            }
            
            console.log(eventDetails);

            Session.set('eventDetails', eventDetails);
            Session.set('minPrice', min_price);
            Session.set('maxPrice', max_price);

            if (eventDetails.overrideLocation == true) {
              Meteor.call('geocodeLocation', eventDetails.selectedLocation, function(err, results) {
                //console.log("Server responded with ", results);
                returnedResults = JSON.parse(results.content);
                console.log(returnedResults.results[0].geometry.location);
                Session.set('getLocationCoords', returnedResults.results[0].geometry.location);
                Router.go('schedule');
              });
              
            }
            else {
              if (orgLoc[0].state == "MN") {
                  Router.go('scheduleMN');
              }
              else  if (orgLoc[0].state == "CA") {
                  Router.go('scheduleSF');
              }
              else {
                  console.log("Coming soon!!");
              }
            }

            

            

        }



    }
});


