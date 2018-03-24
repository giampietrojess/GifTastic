// Declare the Variables
var games = ["Bioshock", "Bioshock Infinite", "The Last of Us", "Tomb Raider", "Mass Effect", "Dragon Age", "Fall Out: New Vegas", "Portal", "Overwatch", "Kingdom Hearts", "Final Fantasy", "Thief", "Sea of Thieves", "Pokemon", "Assasins Creed", "The Wolf Among Us"];

// Make Button Function
function makeButtons(){ 
	// Clears the game buttons before adding more to avoid repeat buttons
	$('#buttonsView').empty();
	// Loop through games
	for (var i = 0; i < games.length; i++){
		// Creates buttons for every game in the array
        var a = $('<button>') 
        // add class to game
        a.addClass('game');
        // add a data attribue
        a.attr('data-name', games[i]); 
        //create button text
        a.text(games[i]); 
        //add the button to the DOM
		$('#buttonsView').append(a);
	}
}

// Calls the makeButtons function
makeButtons();

// The on click function for the add game button
$("#addGame").on("click", function(){

	// Grabs the User input from the DOM
	var game = $("#game-input").val().trim();
	// Add the Input to the array
	games.push(game);
	// Call the MakeButton function
	makeButtons();
	// Added so users can hit 'enter' as well as click the submit button
	return false; 
})

// Display Gifs function
function displayGifs(){
	var game = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
        game 
        //My API key, plus sets the limit to 10 gifs
        + "&limit=10&api_key=b4tP1GQ7KftuMgyxRHjOysFUXPC1BORY";

		// API call
		$.ajax({
            url: queryURL, 
            method: "GET"})
            .done(function (response) {
			console.log(response.data);
            
            // Saves result as variable
            var results = response.data;
            
			// Loop through Gifs 
			for (var i = 0; i < results.length; i++) {
				// Creates Div to dump in Gifs
				var gifDiv = $('<div class=gifs>');
				var gameGif = $('<img>');
                    gameGif.attr('src', results[i].images.fixed_height_still.url);
                    
					// Shows Gif Rating on hover
                    gameGif.attr('title', "Rating: " + results[i].rating);
                    // Gif set to 'still' on load
                    gameGif.attr('data-still', results[i].images.fixed_height_still.url);
                    //Gif attribute set to 'still'
                    gameGif.attr('data-state', 'still');
                    //add class to Gif
                    gameGif.addClass('gif');
                    //add animate attribute
					gameGif.attr('data-animate', results[i].images.fixed_height.url);
                
                    // Append Gif to gameGif
                    gifDiv.append(gameGif)
				
                // PREpend Gif to the DOM
				$("#gifDump").prepend(gifDiv);
			}
			
		});
}

// On click event for animating Gifs
$(document).on('click', '.gif', function(){
    var state = $(this).attr('data-state');
    //If the GIF is still
		if ( state == 'still'){
                //Change the still attribute of 'this' to animate
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                //Otherwise, if the GIF is animated, set the attribute to 'still'
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
});



// function for displaying game gifs
$(document).on("click", ".game", displayGifs);

