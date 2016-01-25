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

Router.route('/register', {
    template: 'register'

});


Router.route('/landing', function() {
     this.render('upcoming');
     this.layout('landing');


});


Router.route('/profile', {
    template: 'profile'

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

Router.route('contacts', function() {
     this.render('contacts');
     this.layout('landing');

});



