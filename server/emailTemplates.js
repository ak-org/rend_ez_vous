
Accounts.emailTemplates.siteName = "Rendezvous App";
Accounts.emailTemplates.from = "Rendezvous Team <rendezvous@ashishkumar.org>";
 Accounts.urls.resetPassword = function(token) {
    return Meteor.absoluteUrl('passwdRecovery/' + token);
  };