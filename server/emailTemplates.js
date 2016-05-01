
Accounts.emailTemplates.siteName = "Haku Social App";
Accounts.emailTemplates.from = "Haku Social Support Team <support@hakusocial.com>";
 Accounts.urls.resetPassword = function(token) {
    return Meteor.absoluteUrl('passwdRecovery/' + token);
  };