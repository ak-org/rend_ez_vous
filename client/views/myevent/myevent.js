
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

// local object to make the invitee list dynamic 
var invitees = new Mongo.Collection(null);


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
    }

});



Template.myevent.events({



    "change #ampm-select": function (event, template) {
        ampm = $(event.currentTarget).val();
        
        // additional code to do what you want with the category
    },

    "change #month-select": function (event, template) {
        month = $(event.currentTarget).val();
        
        // additional code to do what you want with the category
    },

    "change #year-select": function (event, template) {
        year = $(event.currentTarget).val();
        
        // additional code to do what you want with the category
    },

    "change #hour-select": function (event, template) {
        hour = $(event.currentTarget).val();
        
        // additional code to do what you want with the category
    },

    "change #min-select": function (event, template) {
        min = $(event.currentTarget).val();
       
        // additional code to do what you want with the category
    },

    "change #day-select": function (event, template) {
        day = $(event.currentTarget).val();
        
        // additional code to do what you want with the category
    },

    "click #addfriend" : function (event, data) {
        eventname = data.find('#eventName').value;
        contactname = data.find('#friendname').value;
        username = data.find('#username').value;

        res1 = Friends.find({username : username, contactname : contactname}).fetch();
        res2 = Family.find({username : username, contactname : contactname}).fetch();
        res3 = CoWorkers.find({username : username, contactname : contactname}).fetch();
       

        

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
                console.log(realname[0].realname);
                invitees.insert({name : contactname, realname : realname[0].realname, loc : realname[0].city, cuisine: realname[0].cuisine});
                console.log("Added " + contactname + " to the invitee list!");
                console.log("Invitees for  your event " , invitees.find().count());
            }
    	}
    	else {
    		alert("No Match found");
    	}
    	
         data.find('#friendname').value = "";
    	//  var username  = data.find('#username').value;	
    },


    "click #event-next" : function( event, data) {
        
         var date = "" + month + "/" + day + "/" + year + " at " + hour + ":" + min + " " + ampm;
         var eventFlag = true;
         var dateFlag = true;
         var inviteeFlag = true;
         eventname = data.find('#eventName').value;


         console.log("You clicked review restaurants");

         if (!eventname) {
            console.log("Please specify event name");
            eventFalg = false;
         }

         if ( (!month) || (!day) || (!year) || (!hour) || (!min) || (!ampm) ) {
            console.log("Please specify date and time");
            dateFlag = false;
         }

        if (invitees.find().count() < 1) {
            console.log("Please invite guests !");
            inviteeFlag = false;
        }




        /* Data collection is complete at the moment */
        if ( (eventFlag) && (dateFlag) && (inviteeFlag) ) {


            eventDetails.eventname = eventname;
            eventDetails.date = date;
            eventDetails.organizer = username;
            eventDetails.inviteeCount = invitees.find().count();
            eventDetails.invitees = invitees.find().fetch();

            console.log(eventDetails);

            Session.set('eventDetails', eventDetails);
            Router.go('schedule');

        }



    }
});


