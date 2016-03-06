
Meteor.subscribe('inviteRequests', function() {

    console.log("Number of Invite Rquests  = " , InviteRequests.find().count());

});



Template.shareRendezvous.onRendered( function() {
  $("#shareInvite-form").validate({

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


Template.shareRendezvous.events({
      'click #shareInvite-submit' : function(e, data) {
          e.preventDefault();

          var inviteRealname = data.find('#inviteRealname').value;
          var inviteEmail = data.find('#inviteEmail').value;
          var isFamilySelected = data.find('#myfamily').checked;
          var isFriendSelected = data.find('#myfriend').checked;
          var isCoworkerSelected = data.find('#mycoworker').checked;
          var token = Random.hexString(256).toLowerCase(); 
          var username = data.find('#username').value;
          var referredBy;

          console.log("You clicked on submit"); 
          console.log("Name is ", inviteRealname);
          console.log("Email is ", inviteEmail);
          console.log("Token is ", token);

          var joinRequest = {};
          var emailObj = {};
          Session.set('bailOut', false);

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

          joinRequest.referredBy = username;
          joinRequest.name = inviteRealname;
          joinRequest.email = inviteEmail;
          joinRequest.createdAt = new Date();
          joinRequest.token = token;
          joinRequest.status = "PENDING";
          if (isFamilySelected) {
              joinRequest.category = "Family";
          }
            
          if (isFriendSelected) {
               
              joinRequest.category = "Friend";    
          }  
            
          if (isCoworkerSelected) {             
              joinRequest.category = "Co Worker";
          }


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
                  category = checkDup.category;
                  referredBy = checkDup.referredBy;

                  InviteRequests.update(checkDup._id, {
                                                $set: {category : joinRequest.category, 
                                                       name : joinRequest.name}
                                                }, function(err, id) {
                                                if (id) { 
                                                  console.log("Result of update is ", id); 
                                                }
                                                if (err)  { 
                                                  console.log("Result of update is ", err); 
                                              }
                                              });
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

              var regUrl = "http://localhost:3000/register/" + token;
              console.log("regUrl is " + regUrl);
              emailObj.sendFrom = "Rendezvous@ashishkumar.org"
              emailObj.sendTo = inviteEmail;
              emailObj.subject = Meteor.user().profile.realname + " would like you to join the Rendezvous App";
              emailObj.content = "Hi " + inviteRealname + ", <br>";
              emailObj.content += "Your friend " + Meteor.user().profile.realname + " has invited you to join Rendezvous. Please click on the link below to complete the registration process.<br>"
              emailObj.content += "<a href=\"" + regUrl + "\">" + regUrl + "</a><br>";
              emailObj.content += "<br>If you need help, please contact us at rendezvous@ashishkumar.org.<br>";
              emailObj.content += "<br><br>Regards, <br> The Rendezvous Team" ;
              emailObj.content += "<br> <br>";

              console.log(emailObj);  
              
              Meteor.call('sendInvites', emailObj, function (err, res) {
                  console.log("Results of registration invite send is ", res);
              });
                  

              // send an email to requestor

              alert("Invite Sent. Your friend will receive invite via email in few minutes."); 

              //Router.go('/login');   
          }
          else {
            alert("Please fill all fields!");
          }
          
      }
});
      