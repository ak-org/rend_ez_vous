
Meteor.subscribe('inviteRequests', function() {

    console.log("Number of Invite Rquests  = " , InviteRequests.find().count());

});



Template.requestInvite.onRendered( function() {
  $("#requestInvite-form").validate({

      rules: {
        inviteRealname : {
                required: true
        },
        
        inviteEmail: {
                required: true,
                email: true
        }

      }

  });
        console.log("The 'requestInvite' template was just rendered.");
});


Template.requestInvite.events({
      'click #requestInvite-submit' : function(e, data) {
          e.preventDefault();

          var inviteRealname = data.find('#inviteRealname').value;
          var inviteEmail = data.find('#inviteEmail').value;
          var token = Random.hexString(256).toLowerCase(); 
          console.log("You clicked on submit"); 
          console.log("Name is ", inviteRealname);
          console.log("Email is ", inviteEmail);
          console.log("Token is ", token);

          var joinRequest = {};
          var emailObj = {};

          Meteor.call('isEmailRegistered', inviteEmail, function(err, res) {
            if (res != null) {
              console.log("Result is ", res);
              Session.set('bailOut', true);
            }
          }); 

          var bailOut = Session.get('bailOut');
          console.log("bailout is ", bailOut);

          if (bailOut == true) {
            alert("Email Address is already in Use. Please use a different email address.");
            Session.set('bailOut', false);
            return;
          }
          joinRequest.name = inviteRealname;
          joinRequest.email = inviteEmail;
          joinRequest.createdAt = new Date();
          joinRequest.token = token;
          joinRequest.status = "PENDING";
          joinRequest.referredBy = "admin";
          joinRequest.category = "None";

          // insert a record in the invite pending list
          console.log("About to enter the record");
          if ((inviteRealname != "") && (inviteEmail != "")) {

              // insert a record in the inviteRequest document

              var checkDup;
              checkDup = InviteRequests.findOne( { email: inviteEmail });

              if (checkDup) {
                  console.log("Email already registered in the invite request!");
                  
                  console.log(checkDup);
                  inviteRealname = checkDup.name;
                  inviteEmail = checkDup.email;
                  token = checkDup.token;
              }
              else {
                InviteRequests.insert(joinRequest, function(err, id) {
                  if (id) { 
                    console.log("Result of add is ", id); 
                  }
                  if (err)  { 
                    console.log("Result of add is ", err); 
                }
                });
              }

              //var regUrl = "http://localhost:3000/register/" + token;
              var regUrl = Meteor.absoluteUrl("/register", {}) + "/" + token;
              console.log("regUrl is " + regUrl);
              emailObj.sendFrom = "support@hakusocial.com"
              emailObj.sendTo = inviteEmail;
              emailObj.subject = "Invitation to Join Haku Social";
              emailObj.content = "Hi " + inviteRealname + ", <br>";
              emailObj.content += "Welcome to Haku Social. Please click on the link below to complete your registration process.<br><br>"
              emailObj.content += "<a href=\"" + regUrl + "\">" + regUrl + "</a> <br>";
              emailObj.content += "<br> If you did not request this invite, please ignore this email. If you need help, please contact us at support@hakusocial.com.<br>";
              emailObj.content += "<br><br>Regards, <br> The Haku Social Team" ;
              emailObj.content += "<br> <br>";

              console.log(emailObj);  
              
              Meteor.call('sendInvites', emailObj, function (err, res) {
                  console.log("Results of registration invite send is ", res);
              });
                  

              // send an email to requestor

              alert("Request received. Please check your email in few minutes."); 

              //Router.go('/login');   
          }
          else {
            alert("Please fill all fields!");
          }
          
      }
});
      