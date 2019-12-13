var apiKey = "4915deb164cf151c9e3b329f1c2270a7";




$("#search").on("click", function () {
    $(".city").empty();
    event.preventDefault();
    var city = $("#searchTerm").val().trim();
    var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    
    // var queryUvUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey &lat={lat}&lon={lon}" (response.coord.lon)(response.coord.lat)
    console.log($(this))
    $.ajax({
        url: queryUrl,
        method: "GET",
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {
            // Log the queryURL
            // console.log(queryURL);
            // Log the resulting object
            console.log(response);
            console.log(queryUrl)


            $(".city").append("<h2>" + response.name + " Weather Details" + "</h2>");
            $(".city").append("<p>" + "Wind Speed:"  + response.wind.speed + "</p>");
            $(".city").append("<p>" +  "Humidity:"  + response.main.humidity + "</p>");
            $(".city").append("<p>" + "Temperature (c)" + ((response.main.temp) - 273).toFixed(2) + "</p>");
            $(".savedCity").append("<button><ul>" + response.name + "</ul></button>")
            // $(".savedCity").child().addClass(response.name)
            
        localStorage.setItem("savedCity", city)
        
        })


    })
    
    $("#clear").on("click", function(){
        localStorage.clear()
        $(".savedCity").empty();
    })


    // wrap up all the ajax method into a function and store that function as the value 