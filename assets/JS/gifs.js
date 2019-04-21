
var topics = ["Fabulous", "GetHype", "BabyElephants", "Game Of Thrones" ,"Nooooo", "funny", ]
window.onload = function makeButtons(){
  event.preventDefault();
  for(i=0; i<topics.length; i++){
    console.log("Iwork");
    var newButton = $("<button>");
  
      // adding the Id to grab it later 
      newButton.attr("id", "button");
  
      // bootstrap styling
      newButton.addClass("btn gifButton btn-success");
  
      // add the search vield into the button.
      newButton.text(topics[i]);
     
      // adding it to a specific location 
      $("#buttons-go-here").append(newButton);
  
  }
}



$("#submit").on("click", function (){
    // this is to prevent the form from resubmitting the html page
    event.preventDefault();

    // show the button section 
    $("#buttons-go-here").show();
    
    // creating one of the buttons that will contain the new gif options
    var newButton = $("<button>");

    // adding the Id to grab it later 
    newButton.attr("id", "button");

    // bootstrap styling
    newButton.addClass("btn gifButton btn-success");


    // add the search vield into the button.
    newButton.text($("#inputField").val().trim());
   
    // adding it to a specific location 
    $("#buttons-go-here").append(newButton);

    // clear the input field
    $("#inputField").val("");
    
})


$(document).on("click", "#button", function(){
   
    // this grabs the name of the button and what will be the gif searched
    var gifName = $(this).text();
    console.log(gifName);
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Awo0Pw0g9K5ZzMvdUtLMqukEjVsz5LoF&q="+gifName+"&limit=10&offset=0"
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response){

        console.log(response);
          // Storing an array of results in the results variable
          var results = response.data;

          console.log(response);

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "pg-13" && results[i].rating !== "r") {
              // Creating a div for the gif
              var gifDiv = $("<div>");

              // adding a class to the gif div 
              gifDiv.addClass("gif");

              // Storing the result item's rating
              var rating = results[i].rating;


              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating.toUpperCase() );
                
              //  adding style to the labels.
              p.addClass("titles");

              // Creating an image tag
              var personImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              personImage.attr("src", results[i].images.fixed_height_still.url);

              // adding an attribute change that we will be able t oindentify if it is animating or still
              personImage.attr("data-state", "still");

              // saving the animated url.
              personImage.attr("data-animate", results[i].images.fixed_height.url);

              personImage.attr("data-still", results[i].images.fixed_height_still.url)

              personImage.addClass("gifImage");

              // adding a hodling attr
              personImage.attr("alt", results[i].title )

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(personImage);
              gifDiv.append(p);
              

              // Prepending the gifDiv to the "#gifs-go-here" div in the HTML
              $("#gifs-go-here").prepend(gifDiv);
            }
        }
        $(document).on( "click", ".gifImage", function() {

  
          // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
          var state = $(this).attr("data-state");
    
          // If the clicked image's state is still, update its src attribute to what its data-animate value is.
          // Then, set the image's data-state to animate
          // Else set src to the data-still value
          if (state === "still") {
      
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
  
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });
      })
})
