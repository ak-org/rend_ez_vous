Template.landing.events({

		'click #user-profile' : function(e, data) {
            e.preventDefault();
            console.log("You clicked profile");
            Router.go('profile')
        }
});