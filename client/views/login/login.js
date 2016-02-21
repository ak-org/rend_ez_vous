
	Template.login.events({
        'submit #login-form' : function(e, data) {
            e.preventDefault();

            var username  = data.find('#username').value;	
            var password  = data.find('#password').value; 
            if ((username != "") && (password != "")) {
                Meteor.loginWithPassword(username, password, function(error){
                if(error){
                       console.log("Invalid Username or password" + error.reason);
                       Router.go('/');
                } else {
                     console.log("Successful login");
                       Router.go('upcoming');
                } 
              });
            }
            else {
              alert("Please specify username and password");
            }
            

        }

	});

  Template.login.onRendered (function() {
      

        $(' #login-form' ).validate();
        console.log("The 'login' template was just rendered.");
  });





