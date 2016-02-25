//Profiles = new Mongo.Collection("profiles");


var username;

var profileDetails;

Meteor.subscribe('profiles', function() {
    //username = Session.get('loggedinusername') ;

    console.log("Number of user profiles [/profile] = " + Profiles.find().count());

});


    Template.profileSF.helpers({

            currentProfile : function() {
                username = Meteor.user().username;
                profileDetails = Profiles.find({username : username}).fetch();
                console.log("Profile for " + username + " is ", profileDetails[0]);
                return profileDetails[0];

            },

            isMexicanChecked : function () {
                if ((profileDetails[0]) && (profileDetails[0].cuisine[0].mexican)) {
                  console.log("Mexican = ", profileDetails[0].cuisine[0])
                  return true;
                }
                else {
                  return false;
                }
            },
            isAmericanChecked : function () {
                if ((profileDetails[0]) && (profileDetails[0].cuisine[1].american)) {
                  console.log("American = ", profileDetails[0].cuisine[1])
                  return true;
                }
                else {
                  return false;
                }
            },
            isItalianChecked : function () {
                if ((profileDetails[0]) && (profileDetails[0].cuisine[2].italian)) {
                  console.log("Italian = ", profileDetails[0].cuisine[2])
                  return true;
                }
                else {
                  return false;
                }
            },
            isChineseChecked : function () {
                if ((profileDetails[0]) && (profileDetails[0].cuisine[3].chinese)) {
                  console.log("Chinese = ", profileDetails[0].cuisine[3])
                  return true;
                }
                else {
                  return false;
                }
            },
            
            isJapaneseChecked : function () {
                if ((profileDetails[0]) && (profileDetails[0].cuisine[4].japanese)) {
                  console.log("Japanese = ", profileDetails[0].cuisine[4])
                  return true;
                }
                else {
                  return false;
                }
            },

            isIndianChecked : function () { 
               if ((profileDetails[0]) && (profileDetails[0].cuisine[5].indian)) {
                  console.log("Indian = ", profileDetails[0].cuisine[5])
                  return true;
                }
                else {
                  return false;
                }
            },
            isGreekChecked : function () { 
                if ((profileDetails[0]) && (profileDetails[0].cuisine[6].greek)) {
                  console.log("Greek = ", profileDetails[0].cuisine[6])
                  return true;
                }
                else {
                  return false;
                }
            },
            isMediterraneanChecked : function () { 
                if ((profileDetails[0]) && (profileDetails[0].cuisine[7].mediterranean)) {
                  console.log("Mediterranean = ", profileDetails[0].cuisine[7])
                  return true;
                }
                else {
                  return false;
                }              
            },
            isThaiChecked : function () { 
                if ((profileDetails[0]) && (profileDetails[0].cuisine[8].thai)) {
                  console.log("Thai = ", profileDetails[0].cuisine[8])
                  return true;
                }
                else {
                  return false;
                }              
            }, 
            isVietnameseChecked : function () { 
                if ((profileDetails[0]) && (profileDetails[0].cuisine[9].vietnamese)) {
                  console.log("Vietnamese = ", profileDetails[0].cuisine[9])
                  return true;
                }
                else {
                  return false;
                }
            },

            isBerkeleyChecked: function() {
                if ((profileDetails[0]) && (profileDetails[0].city === "Berkeley")) {
                       return true;
                   }
                   else {
                       return false;
                   }
            },


            isSanFranciscoChecked: function() {
                if ((profileDetails[0]) && (profileDetails[0].city === "San Francisco")) {
                       return true;
                   }
                   else {
                       return false;
                   }
            },

            isSanMateoChecked: function() {
                if ((profileDetails[0]) && (profileDetails[0].city === "San Mateo")) {
                       return true;
                   }
                   else {
                       return false;
                   }
            },

            isOaklandChecked : function() {
              if ((profileDetails[0]) && (profileDetails[0].city === "Oakland")) {
                       return true;
                   }
                   else {
                       return false;
                   }
            },


            isDanvilleChecked: function() {
                if ((profileDetails[0]) && (profileDetails[0].city === "Danville")) {
                       return true;
                   }
                   else {
                       return false;
                   }
            },  

            isDublinChecked: function() {
                if ((profileDetails[0]) && (profileDetails[0].city === "Dublin")) {
                       return true;
                   }
                   else {
                       return false;
                   }
            },

            isOrindaChecked: function () {
                if ((profileDetails[0]) && (profileDetails[0].city === "Orinda")) {
                       return true;
                   }
                   else {
                       return false;
                   }
            },

            isWalnutCreekChecked: function() {
                if ((profileDetails[0]) && (profileDetails[0].city === "Walnut Creek")) {
                       return true;
                   }
                   else {
                       return false;
                   }
            },

            walkOption: function() {
                if ((profileDetails[0]) && (profileDetails[0].distance == 1)) {
                  return true;
                }
                else {
                  return false;
                }
            },

             shortDriveOption: function() {
                if ((profileDetails[0]) && (profileDetails[0].distance == 2)) {
                  return true;
                }
                else {
                  return false;
                }
            },

            justDriveOption: function() {
                if ((profileDetails[0]) && (profileDetails[0].distance == 3)) {
                  return true;
                }
                else {
                  return false;
                }
            },
            fname : function(fullName) {
                return fullName.split(" ")[0];
              }


    });


    Template.profileSF.events({

        'click #profile-save' : function(e, data) {

            e.preventDefault();
            var city ;
            var distance; 
            
            var state = "CA"  ;

            // cuisine selection
            console.log('state is CA');
            var username = data.find('#username').value;

            var americanSelected = data.find('#american').checked;
            var italianSelected = data.find('#italian').checked;
            var chineseSelected = data.find('#chinese').checked;
            var japaneseSelected = data.find('#japanese').checked;
            var mexicanSelected = data.find('#mexican').checked;
            var indianSelected = data.find('#indian').checked;
            var greekSelected = data.find('#greek').checked;
            var mediterraneanSelected = data.find('#mediterranean').checked;
            var thaiSelected = data.find('#thai').checked;
            var vietnameseSelected = data.find('#vietnamese').checked;  

            // Distance selection
            var walkSelected = data.find('#walk').checked;
            var driveSelected = data.find('#drive').checked;
            var shortDriveSelected = data.find('#shortDrive').checked;

            // City selection

            var berkeleySelected = data.find('#Berkeley').checked;
            var sanfranciscoSelected = data.find('#SanFrancisco').checked;
            var sanmateoSelected = data.find('#SanMateo').checked;
            var oaklandSelected = data.find('#Oakland').checked;
            var danvilleSelected = data.find('#Danville').checked;
            var dublinSelected = data.find('#Dublin').checked;
            var orindaSelected = data.find('#Orinda').checked;
            var walnutcreekSelected = data.find('#WalnutCreek').checked;                                    
            var realname = Meteor.users.find({username: username}).fetch();
            console.log("Real name = " , realname[0].profile.realname);
            
            if (berkeleySelected) { city = "Berkeley"; }
            if (sanfranciscoSelected) { city = "San Francisco"; }
            if (sanmateoSelected) { city = "San Mateo"; }
            if (oaklandSelected) { city = "Oakland"; }
            if (danvilleSelected) { city = "Danville"; }
            if (dublinSelected) { city = "Dublin";}
            if (orindaSelected) { city = "Orinda"; }
            if (walnutcreekSelected) { city = "Walnut Creek"; }
            

            if (walkSelected) { distance = 1; }
            if (shortDriveSelected) { distance = 2; }
            if (driveSelected) { distance = 3; }
            if ( !(americanSelected) &&
                 !(italianSelected) &&
                 !(chineseSelected) &&
                 !(japaneseSelected) && 
                 !(mexicanSelected) && 
                 !(indianSelected) &&
                 !(greekSelected) && 
                 !(mediterraneanSelected) &&
                 !(thaiSelected) &&
                 !(vietnameseSelected) )
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
                                  { japanese : japaneseSelected}, 
                                  { indian : indianSelected}, 
                                  { greek : greekSelected} , 
                                  { mediterranean : mediterraneanSelected}, 
                                  { thai : thaiSelected }, 
                                  { vietnamese : vietnameseSelected}
                                ],
                                city : city,
                                metro: "sanfrancisco",
                                state : state,
                                distance : distance,
                                realname : realname[0].profile.realname,
                                updatedAt: new Date() 
                            }
                        });
                }
                else {
                    console.log("New User, new entry!");
                    Profiles.insert({
                      username: username,
                      realname : realname[0].profile.realname,
                      cuisine : [
                       { mexican : mexicanSelected } ,
                        { american : americanSelected } ,
                          { italian : italianSelected } ,
                         { chinese : chineseSelected } ,
                          { japanese : japaneseSelected}, 
                          { indian : indianSelected}, 
                          { greek : greekSelected} , 
                          { mediterranean : mediterraneanSelected}, 
                          { thai : thaiSelected }, 
                          { vietnamese : vietnameseSelected}
                        ],
                     city : city,
                     metro: "sanfrancisco",
                     state: state,
                     distance : distance,

                     createdAt: new Date() 
                     });             

                
                }
                // Saved the profile data in the backend
                Router.go('landing');
            }

            
         }
     });

