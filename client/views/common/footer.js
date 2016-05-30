Template.footer.events({
    'click #shareFeedback' : function(e) {
    	
    	e.preventDefault();

    	Modal.show('feedbackModal');
    },



});

Template.feedbackModal.onRendered( function() {
  $("#sendFeedback-form").validate({

      rules: {
        feedbackName : {
                required: true
        },
        
        feedbackEmail: {
                required: true,
                email: true
        },

        feedbackMessage: {
                required: true
            
        },


      }

  });
        
});


Template.feedbackModal.events({
     'click #submitFeedback' : function(e, data) {
     	//console.log("You clicked submit feedback");

     	var emailObj = {};

     	var feedbackUser = data.find('#feedbackName').value;
     	var feedbackEmail = data.find('#feedbackEmail').value;
     	var feedbackMsg = data.find('#feedbackMessage').value;

     	if (feedbackUser == '') {
     		feedbackUser = "Anonymous";
     	}


     	if (feedbackEmail == '') {
     		feedbackEmail = "no@email.com";
     	}

     		  emailObj.sendFrom = "support@hakusocial.com"
              emailObj.sendTo = "ashish@ashishkumar.org";
              emailObj.subject = "User Feedback";
              emailObj.content = "Hi, <br>";
              emailObj.content += feedbackUser + " has sent following feedback <br>";
              emailObj.content += feedbackMsg;
              emailObj.content += "<br> <br>";
              emailObj.content += "User Email : " + feedbackEmail + "<br>";
              emailObj.content += "<br> <br>";

              //console.log(emailObj);  
              
              Meteor.call('sendFeedback', emailObj, function (err, res) {
                  //console.log("Results of sendFeedback is ", err, res);
              });

              emailObj.sendFrom = "support@hakusocial.com"
              emailObj.sendTo = "ashish@twopebbl.es";
              emailObj.subject = "User Feedback";
              emailObj.content = "Hi, <br>";
              emailObj.content += feedbackUser + " has sent following feedback <br>";
              emailObj.content += feedbackMsg;
              emailObj.content += "<br> <br>";
              emailObj.content += "User Email : " + feedbackEmail + "<br>";
              emailObj.content += "<br> <br>";

              //console.log(emailObj);  
              
              Meteor.call('sendFeedback', emailObj, function (err, res) {
                  //console.log("Results of sendFeedback is ", err, res);
              });
                  

        Modal.hide('feedbackModal');
     },

     'click #cancelFeedback' : function(e, data) {
     	    console.log("Cancelled send feedback");
     		Modal.hide('feedbackModal');
     },



   
});
