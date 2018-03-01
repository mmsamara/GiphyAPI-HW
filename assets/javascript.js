var topics = ["Dwyane Wade", "Lebron James", "Michael Jordan", "Kemba Walker", "Steph Curry", "Kobe Bryant"];

function createButtons() {
	$("#playerButtons").empty();

	for (i=0; i<topics.length; i++) {
		var newButton = $("<button>").text(topics[i]);
		newButton.attr("class", "btn btn-default player");
		newButton.attr("data-player", topics[i]);
		$("#playerButtons").append(newButton);
	}

	$(".player").on("click", function() {
		$("#gifs").empty();

		var player = $(this).attr("data-player");

		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + player + "&api_key=yvHlGfzY6CPZ0XcqzVJCCaW2YJQ6XpJL&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
		})

		.then(function(response) {

			var results = response.data

			for (var i=0; i < results.length; i++) {

				var gifDiv = $("<div>");
				gifDiv.attr("class", "col-md-4");

				var rating = results[i].rating;
				var p = $("<p>").text("Rating: " + rating);

				var playerImage = $("<img>");
				playerImage.attr("src", results[i].images.fixed_height_still.url);
				playerImage.attr("data-still", results[i].images.fixed_height_still.url);
				playerImage.attr("data-animate", results[i].images.fixed_height.url);
				playerImage.attr("data-state", "still");

				gifDiv.append(playerImage);
				gifDiv.append(p);

				$("#gifs").prepend(gifDiv);

			}
		});
	});
};

$(document).on("click", "img", function() {

	var state = $(this).attr("data-state");

	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animated");
	} 
	else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
})

// $("img").on("click", function() {
// 	var state = $(this).attr("data-state");

// 	if (state === "still") {
// 		$(this).attr("src", $(this).attr("data-animate"));
// 		$(this).attr("data-state", "animated");
// 	} 
// 	else {
// 		$(this).attr("src", $(this).attr("data-still"));
// 		$(this).attr("data-state", "still");
// 	}
// });


$("#addPlayer").on("click", function() {
	event.preventDefault();
	var userInput = $("#user-input").val().trim();
	topics.push(userInput);
	createButtons();
});

createButtons(); 