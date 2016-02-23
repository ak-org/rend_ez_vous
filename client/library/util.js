ratingSymbol = function(price_level) {
               var response = "";
               
               switch (price_level) {
                case 1: 
                   response += " $ ";
                   break;
                case 2 :
                   response += " $$ ";
                   break;
                case 3 :
                   response += " $$$ ";
                   break;
                case 4 :
                   response += " $$$$ ";
                   break;

               }
        return response;

}




findVenue = function(eventDetails) {
          var highestVote = 1;
          var highestIndex = 0;
          var venueDetails;
          var tiedVotes = false;
          var rating;


          for (var index=0; index < eventDetails.pickedRestaurantsVote.length; index++) {
              if (eventDetails.pickedRestaurantsVote[index] > highestVote) {
                  highestVote = eventDetails.pickedRestaurantsVote[index];
                  highestIndex = index;
              }
          }

          // find first instance of highest vote in the array
          // find last instance of the highest vote in the array

          var firstInstance = eventDetails.pickedRestaurantsVote.indexOf(highestVote);
          var lastInstance =  eventDetails.pickedRestaurantsVote.lastIndexOf(highestVote);

          if (firstInstance === lastInstance) {
              //console.log("No Duplicate found for the highest vote.");
          }
          else {
              var indices = [];
              var idx = eventDetails.pickedRestaurantsVote.indexOf(highestVote);

              while (idx != -1) {
                indices.push(idx);
                idx = eventDetails.pickedRestaurantsVote.indexOf(highestVote, idx + 1);
              }
              console.log("We have a tie.", indices);
              tiedVotes = true;
              // among tied restaurants, try to sort by ratings
              var highestRating = 0.0;
              for (var i=0; i < indices.length; i++) {
                  if (eventDetails.pickedRestaurants[indices[i]].rating > highestRating) {
                    highestRating = eventDetails.pickedRestaurants[indices[i]].rating;
                    highestIndex = indices[i];
                  }
              }
              //console.log("Highest rating is ", highestRating);
          }

          //console.log("Highest index is ", highestIndex, eventDetails.pickedRestaurants);

          if (!eventDetails.pickedRestaurants[highestIndex].rating ) {
              rating = "Unavailable";
          }
          else {
              rating = eventDetails.pickedRestaurants[highestIndex].rating + "/5";
          }
          
          venueDetails = '<h3>' + eventDetails.pickedRestaurants[highestIndex].name  + '</h3><br>' + eventDetails.pickedRestaurants[highestIndex].formatted_address + 
                         "<br> Rating is " + rating +
                         "<br> " + ratingSymbol(eventDetails.pickedRestaurants[highestIndex].price_level);
          console.log("return venue " + venueDetails);
          return venueDetails;
}
