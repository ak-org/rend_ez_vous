Template.passwdRecovery.helpers({
	resetPassword: function(t) {
		return Session.get('resetPassword');
	}

});

Template.passwdRecovery.events({

	'click #recovery-email-submit' : function( e, t) {
		e.preventDefault();

		var email = trimInput(t.find('#recovery-email').value);
 		console.log('email is ', email);
		if (email != "") {
			Session.set('loading', true);

		}
		else {
			alert("Please specify a valid email address");
		}
		console.log('Your clicked on password reset link');
	}

});

  var trimInput = function(val) {
    return val.replace(/^\s*|\s*$/g, "");
  }


  Template.passwdRecovery.onRendered (function() {
      

        $(' #recover-password-form' ).validate({
        	rules: {
		        'recovery-email': {
		                required: true,
		                email: true
		        }
		    }    
        });
        //console.log("The 'login' template was just rendered.");
  });