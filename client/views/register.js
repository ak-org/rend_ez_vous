if (Meteor.isClient) {
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
      

}
 