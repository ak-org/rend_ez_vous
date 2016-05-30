/*
Router.configure({
    layoutTemplate: 'tmpl'
});


*/


Router.route('/', {
    template: 'login'

});

Router.route('/login', {
    template: 'login'

});

Router.route('/passwdRecovery', {
    template: 'passwdRecovery'

});

Router.route('/passwdRecovery/:resetToken', {
    template: 'passwdRecovery',
    data : function() {
        //console.log(this.params.resetToken);
        return { resetToken: this.params.resetToken };
    }


});

Router.route('/register/:token', {
    template: 'register',
    data : function() {
        //console.log(this.params.token);
        return { token: this.params.token };
    }


});




Router.route('/requestInvite', {
    template: 'requestInvite'


});

Router.route('/share', function() {
    this.render('shareHakuSocial');
    this.layout('landing');


});


Router.route('/landing', function() {
     this.render('upcoming');
     this.layout('landing');


});


Router.route('/profile', {
    template: 'profile'

});

Router.route('/profileSF', {
    template: 'profileSF'

});


Router.route('messages', function() {
     this.render('messages');
     this.layout('landing');

});


Router.route('upcoming', function() {
     this.render('upcoming');
     this.layout('landing');

});


Router.route('sent', function() {
     this.render('sent');
     this.layout('landing');

});


Router.route('recvd', function() {
     this.render('recvd');
     this.layout('landing');

});

Router.route('myevent', function() {
     this.render('myevent');
     this.layout('landing');

});

Router.route('schedule', function() {
     this.render('schedule');
     this.layout('landing');

});

Router.route('scheduleMN', function() {
     this.render('scheduleMN');
     this.layout('landing');

});

Router.route('scheduleSF', function() {
     this.render('scheduleSF');
     this.layout('landing');

});

Router.route('contacts', function() {
     this.render('contacts');
     this.layout('landing');

});


