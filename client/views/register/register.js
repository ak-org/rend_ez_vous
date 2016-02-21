
Template.register.onRendered( function() {
  $("#register-form").validate({

      rules: {
        realname : {
                required: true
        },
        username : {
                required: true,
                minlength : 8
        },
        email: {
                required: true,
                email: true
        },
        password : {
          minlength: 8,
          required: true

        },
        'confirm-password' : {
          minlength: 8,
          required: true,
          equalTo: "#password"

        }

      }
      /*

    messages: {
      realname {
        required: "Please enter your First and Last Name."
        
      },
      email: {
        required: "Please enter your email address to login."
        email: "Please enter a valid email address."
      },
      password {
        required: "Please enter your password to login."
      }
    }
    */
  });
});



	Template.register.events({
        'submit #register-form' : function(e, data) {
              e.preventDefault();

              Accounts.createUser({
              	username: data.find('#username').value,
              	password: data.find('#password').value,
              	email: data.find('#email').value,
              	profile: {
              		realname: data.find('#realname').value

              	}
              }, function (err) {
              	   if (err) {
              	   	   console.log("Unable to create account!" + err.reason);
                       Router.go('/');
              	   }
              	   else   {
              	   	   
                       console.log('Registgration Successful');
                       Router.go('profile')
              	   }	

              });
          }    
      });
      


 