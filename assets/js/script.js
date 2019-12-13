var apiKey = "4915deb164cf151c9e3b329f1c2270a7";




$("#search").on("click", function () {
    
displayWeather()
displayForecast()

    })
    
    $("#clear").on("click", function(){
        localStorage.clear()
        $(".savedCity").empty();
    })

    function displayWeather(){
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
                $(".savedCity").append("<ul><button>" + response.name + "</ul></button>")
                $(".savedCity").children().last().addClass(response.name)
                
            localStorage.setItem("savedCity", city)
            
           })
        }
           
           function displayForecast(){
            $(".city").empty();
            event.preventDefault();
            var city = $("#searchTerm").val().trim();
            var queryUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
            
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
                    // console.log(response.list[0].clouds)
                    console.log(response.list[0].main.temp)
                    

                    $(".forecast").append("<h2>" + response.city.name + " 5 day forecast" + "</h2>");
                    $(".day1"). append("<h2>" + response.list[0].dt_txt + "<h2>");  
                    $(".day1").append("<p>" +  "Humidity:"  + response.list[0].main.humidity + "</p>");
                    $(".day1").append("<p>" + "Temperature (c)" + ((response.list[0].main.temp) - 273).toFixed(2) + "</p>");
                    
                    $(".day2"). append("<h2>" + response.list[4].dt_txt + "<h2>");  
                    $(".day2").append("<p>" +  "Humidity:"  + response.list[1].main.humidity + "</p>");
                    $(".day2").append("<p>" + "Temperature (c)" + ((response.list[1].main.temp) - 273).toFixed(2) + "</p>");
                
                    $(".day3"). append("<h2>" + response.list[10].dt_txt + "<h2>");  
                    $(".day3").append("<p>" +  "Humidity:"  + response.list[2].main.humidity + "</p>");
                    $(".day3").append("<p>" + "Temperature (c)" + ((response.list[2].main.temp) - 273).toFixed(2) + "</p>");

                    $(".day4"). append("<h2>" + response.list[15].dt_txt + "<h2>");  
                    $(".day4").append("<p>" +  "Humidity:"  + response.list[3].main.humidity + "</p>");
                    $(".day4").append("<p>" + "Temperature (c)" + ((response.list[3].main.temp) - 273).toFixed(2) + "</p>");
                    
                    $(".day5"). append("<h2>" + response.list[20].dt_txt + "<h2>");  
                    $(".day5").append("<p>" +  "Humidity:"  + response.list[4].main.humidity + "</p>");
                    $(".day5").append("<p>" + "Temperature (c)" + ((response.list[4].main.temp) - 273).toFixed(2) + "</p>");
               })
            }


    // wrap up all the ajax method into a function and store that function as the value 