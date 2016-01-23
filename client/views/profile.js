//Profiles = new Mongo.Collection("profiles");

Meteor.subscribe('profiles');

    Template.profile.helpers({
            profiles: function() {
                return Profiles.find();
            }
    });

    Template.profile.events({

        'click #profile-save' : function(e, data) {
            e.preventDefault();
            var city ;
            var distance; 
            var username = data.find('#username').value;
            var americanSelected = data.find('#american').checked;
            var italianSelected = data.find('#italian').checked;
            var chineseSelected = data.find('#chinese').checked;
            var japaneseSelected = data.find('#italian').checked;
            var mexicanSelected = data.find('#mexican').checked;
            var walkSelected = data.find('#walk').checked;
            var driveSelected = data.find('#drive').checked;
            var shortDriveSelected = data.find('#shortDrive').checked;
            var sfoSelected = data.find('#sfo').checked;
            var mspSelected = data.find('#msp').checked;


            
            if (sfoSelected) { city = "sfo"; }
            if (mspSelected) { city = "msp"; }

            if (walkSelected) { distance = 1; }
            if (shortDriveSelected) { distance = 2; }
            if (driveSelected) { distance = 3; }
            if ( !(americanSelected) &&
                 !(italianSelected) &&
                 !(chineseSelected) &&
                 !(japaneseSelected) && 
                 !(mexicanSelected) )
            {
                console.log("Please select atleast one cuisine");
                alert("Please select atleast one cuisine");
                
            }  
            else {
                var res = Profiles.findOne({username : username});
                if (res) {
                    // update the document
                    console.log("Updating the Profile collection for " + res.username);
                    Profiles.update(res._id, 
                        {
                            $set: {
                                cuisine : [
                                    { mexican : mexicanSelected } ,
                                    { american : americanSelected } ,
                                   { italian : italianSelected } ,
                                    { chinese : chineseSelected } ,
                                  { japanese : japaneseSelected}
                                ],
                                city : city,
                                distance : distance,

                                updatedAt: new Date() 
                            }
                        });
                }
                else {
                    console.log("New User, new emtry!");
                    Profiles.insert({
                      username: username,
                      cuisine : [
                       { mexican : mexicanSelected } ,
                        { american : americanSelected } ,
                          { italian : italianSelected } ,
                         { chinese : chineseSelected } ,
                          { japanese : japaneseSelected}
                        ],
                     city : city,
                     distance : distance,

                     createdAt: new Date() 
                     });


                

                
                }
                // Saved the profile data in the backend
                Router.go('landing');
            }

            

            

            
         }
     });

