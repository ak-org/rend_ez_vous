//Profiles = new Mongo.Collection("profiles");


var username;

var profileDetails;

Meteor.subscribe('profiles', function() {
    //username = Session.get('loggedinusername') ;

    console.log("Number of user profiles [/profile] = " + Profiles.find().count());

});


    Template.profile.helpers({

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

            isMinneapolisChecked: function() {
                if ((profileDetails[0]) && (profileDetails[0].city === "Minneapolis")) {
                       return true;
                   }
                   else {
                       return false;
                   }
            },


            isStPaulChecked: function() {
                if ((profileDetails[0]) && (profileDetails[0].city === "St. Paul")) {
                       return true;
                   }
                   else {
                       return false;
                   }
            },

            isMapleGroveChecked: function() {
                if ((profileDetails[0]) && (profileDetails[0].city === "Maple Grove")) {
                       return true;
                   }
                   else {
                       return false;
                   }
            },

            isPlymouthChecked : function() {
              if ((profileDetails[0]) && (profileDetails[0].city === "Plymouth")) {
                       return true;
                   }
                   else {
                       return false;
                   }
            },


            isEdenPrairieChecked: function() {
                if ((profileDetails[0]) && (profileDetails[0].city === "Eden Prairie")) {
                       return true;
                   }
                   else {
                       return false;
                   }
            },  

            isBloomingtonChecked: function() {
                if ((profileDetails[0]) && (profileDetails[0].city === "Bloomington")) {
                       return true;
                   }
                   else {
                       return false;
                   }
            },

            isWhiteBearLakeChecked: function () {
                if ((profileDetails[0]) && (profileDetails[0].city === "White Bear Lake")) {
                       return true;
                   }
                   else {
                       return false;
                   }
            },

            isWoodburyChecked: function() {
                if ((profileDetails[0]) && (profileDetails[0].city === "Woodbury")) {
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


    Template.profile.events({

        'click #profile-save' : function(e, data) {

            e.preventDefault();
            var city ;
            var distance; 
            
            var state = "MN";

            // cuisine selection
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

            var minneapolisSelected = data.find('#Minneapolis').checked;
            var stpaulSelected = data.find('#StPaul').checked;
            var maplegroveSelected = data.find('#MapleGrove').checked;
            var plymouthSelected = data.find('#Plymouth').checked;
            var edenprairieSelected = data.find('#EdenPrairie').checked;
            var bloomingtonSelected = data.find('#Bloomington').checked;
            var whitebearlakeSelected = data.find('#WhiteBearLake').checked;
            var woodburySelected = data.find('#Woodbury').checked;                                    
            var realname = Meteor.users.find({username: username}).fetch();
            console.log("Real name = " , realname[0].profile.realname);
            
            if (minneapolisSelected) { city = "Minneapolis"; }
            if (stpaulSelected) { city = "St. Paul"; }
            if (plymouthSelected) { city = "Plymouth"; }
            if (edenprairieSelected) { city = "Eden Prairie"; }
            if (bloomingtonSelected) { city = "Bloomington"; }
            if (whitebearlakeSelected) { city = "White Bear Lake";}
            if (woodburySelected) { city = "Woodbury"; }
            if (maplegroveSelected) { city = "Maple Grove";}
            

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
                                metro: "twincities",
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
                     metro: "twincities",
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

