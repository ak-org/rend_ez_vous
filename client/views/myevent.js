
var objArr = [
      { name: "Dan"} 
    ];

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
    friendlist : objArr

});



Template.myevent.events({
    "change #ampm-select": function (event, template) {
        var category = $(event.currentTarget).val();
        console.log("category : " + category);
        // additional code to do what you want with the category
    },

    "change #month-select": function (event, template) {
        var category = $(event.currentTarget).val();
        console.log("category : " + category);
        // additional code to do what you want with the category
    },

    "change #year-select": function (event, template) {
        var category = $(event.currentTarget).val();
        console.log("category : " + category);
        // additional code to do what you want with the category
    },

    "change #hour-select": function (event, template) {
        var category = $(event.currentTarget).val();
        console.log("category : " + category);
        // additional code to do what you want with the category
    },

    "change #min-select": function (event, template) {
        var category = $(event.currentTarget).val();
        console.log("category : " + category);
        // additional code to do what you want with the category
    },

    "change #day-select": function (event, template) {
        var category = $(event.currentTarget).val();
        console.log("category : " + category);
        // additional code to do what you want with the category
    },

    "click #addfriend" : function (event, data) {
    	var name = data.find('#friendname').value;
    	var res = Profiles.findOne({username : name});
    	if (res)
    	{
    	    alert("you want to add a friend " + name);	
    	}
    	else {
    		alert("No Match found");
    	}
    	
         data.find('#friendname').value = "";
    	//  var username  = data.find('#username').value;	
    }
});


