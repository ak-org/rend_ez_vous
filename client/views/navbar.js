 if (Meteor.isClient) {


 Template.navbar.events({
      'click #logout' : function( e, t) {
        e.preventDefault();

        Meteor.logout(function(error) {
        	 if (error) {
        	 	console.log("Error while logging out!! " + error.reason);
        	 }
        	 else {
                console.log("Logout Successful! ");
                Router.go('login')
        	 }
             
        });
      } 
  });
}

