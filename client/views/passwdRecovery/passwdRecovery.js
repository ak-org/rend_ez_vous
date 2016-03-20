Template.passwdRecovery.helpers({
	resetPassword: function(t) {
		if ((t != null) && (t != "")) {
			Session.set('resetToken', t);
			//console.log("t is", t);
			return true;
		}
		else {
			return false;
		}

	}

});

Template.passwdRecovery.events({

	'click #new-password-submit' : function (e, t) {
		e.preventDefault();

		var newPasswd = t.find('#new-password').value;
		var newPasswd2 = t.find('#new-password2').value;

		if ((newPasswd != '') && (newPasswd == newPasswd2)) {
			//console.log(newPasswd, newPasswd2);
			Accounts.resetPassword(Session.get('resetToken'), newPasswd, function(err) {
				if (err) {
					alert('Password reset error!');
				}
				else {
					alert('Password Reset successful!');
				}
			});
		}
	},

	'click #recovery-email-submit' : function( e, t) {
		e.preventDefault();

		var email = trimInput(t.find('#recovery-email').value);
 		console.log('email is ', email);
		if (email != "") {
			Session.set('loading', true);
			Accounts.forgotPassword({email: email}, function(err) {
				if (err) {
					alert('Password Reset Error!');
				}
				else {
					alert('Please check your email for password reset instructions.');
				}	
				Session.set('loading' , false);
			});

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

        $( '#new-password-form' ).validate({
        	rules: {
		        'new-password' : {
		          minlength: 8,
		          required: true

		        },
		        'new-password2' : {
		          minlength: 8,
		          required: true,
		          equalTo: "#new-password"

		        }
		    }    
        });
        //console.log("The 'login' template was just rendered.");
  });