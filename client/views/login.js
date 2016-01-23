
	Template.login.events({
        'submit #login-form' : function(e, data) {
            e.preventDefault();

            var username  = data.find('#username').value;	
            var password  = data.find('#password').value; 

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

	});





