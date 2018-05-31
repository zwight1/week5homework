var giphys = ["Batman", "Captain America", "Wonder Woman", "Scarlet Witch", "The Flash", "Doctor Strange", "Black Canary", "Storm", "Green Arrow", "Jean Grey"];

function alertGiphyName() {
}
function renderButtons() {
   $("#buttons-view").empty();
       for (var i = 0; i < giphys.length; i++) {
           var a = $("<button>");
           a.addClass("giphy");
           a.attr("data-name", giphys[i])
           a.text(giphys[i]);
           $("#buttons-view").append(a);
   }
}

$("#add-giphy").on("click", function (event) {
   event.preventDefault();
   var giphy = $("#giphy-input").val().trim();
   giphys.push(giphy);
   renderButtons();
});

$(document).on("click", "giphy", alertGiphyName);

renderButtons();

$("#buttons-view").on("click", '.giphy', function () {
   var search = $(this).attr("data-name");
   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=ZAUrmddfbtvDt6uk5XeUMAdQssrEE1io&limit=10";
   
   $.ajax({
       url: queryURL,
       method: "GET"
   }).then(function (response) {

       console.log(response);

       var results = response.data

       for (var i = 0; i < results.length; i++) {
           var searchDiv = $("<div>").addClass("imgdiv");
           var p = $("<p>");
           p.text("Rating:" + results[i].rating);
           var searchImage = $("<img>");
           searchImage.attr("src", results[i].images.fixed_height.url);
           searchDiv.append(p);
           searchDiv.append(searchImage);
           $("#gifs-appear-here").prepend(searchDiv);
       }
   });
});

