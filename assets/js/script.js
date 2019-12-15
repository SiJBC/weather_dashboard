var apiKey = "4915deb164cf151c9e3b329f1c2270a7";




$("#search").on("click", function () {
    displayWeather()
    displayForecast()
    displayUv()

})

$(document).on('click', '.savedCity', function () {
    // var city = localStorage.getItem(savedCity)
    displayWeather()
    displayForecast()
    displayUv()
    console.log("this was clicked")
    $(".savedCity").empty();
    $(".city").empty();
    $(".forecast").empty();
    $(".day1").empty();
    $(".day2").empty();
    $(".day3").empty();
    $(".day4").empty();
    $(".day5").empty();

})

$("#clear").on("click", function () {
    localStorage.clear()
    $(".savedCity").empty();
    $(".city").empty();
    $(".forecast").empty();
    $(".day1").empty();
    $(".day2").empty();
    $(".day3").empty();
    $(".day4").empty();
    $(".day5").empty();
})


$("#myLocation"). on("click", function (){
 getLocation()
})

function displayWeather() {
    $(".city").empty();
    $(".forecast").empty();
    $(".day1").empty();
    $(".day2").empty();
    $(".day3").empty();
    $(".day4").empty();
    $(".day5").empty();

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

            iconCode = response.weather[0].icon
            console.log(iconCode)
            var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png"
            
            $("#cityImage").attr('src', iconUrl)
            $(".city").append("<h2>" + response.name + " Weather today" + "</h2>");
            $(".city").append("<p>" + "Wind Speed:" + response.wind.speed + "</p>");
            $(".city").append("<p>" + "Humidity:" + response.main.humidity + "</p>");
            $(".city").append("<p>" + "Temperature (c)" + ((response.main.temp) - 273).toFixed(2) + "</p>");

            $(".savedCity").append("<button>" + response.name + "</button>")
            $(".savedCity").children().last().addClass(response.name)

            localStorage.setItem("savedCity", city)

        })
}

function displayForecast() {
    $(".city").empty();
    event.preventDefault();
    var city = $("#searchTerm").val().trim();
    var queryUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

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

            



            $(".day1").append("<h3>" + response.list[0].dt_txt + "<h3>");
            $(".day1").attr("<img>" + response.list[0].weather[0].icon + ".png" + "<img>")
            $(".day1").append("<p>" + "Humidity:" + response.list[0].main.humidity + "</p>");
            $(".day1").append("<p>" + "Temperature (c)" + ((response.list[0].main.temp) - 273).toFixed(2) + "</p>");

            $(".day2").append("<h3>" + response.list[4].dt_txt + "<h3>");
            $(".day2").append("<p>" + "Humidity:" + response.list[1].main.humidity + "</p>");
            $(".day2").append("<p>" + "Temperature (c)" + ((response.list[1].main.temp) - 273).toFixed(2) + "</p>");

            $(".day3").append("<h3>" + response.list[10].dt_txt + "<h3>");
            $(".day3").append("<p>" + "Humidity:" + response.list[2].main.humidity + "</p>");
            $(".day3").append("<p>" + "Temperature (c)" + ((response.list[2].main.temp) - 273).toFixed(2) + "</p>");

            $(".day4").append("<h3>" + response.list[15].dt_txt + "<h3>");
            $(".day4").append("<p>" + "Humidity:" + response.list[3].main.humidity + "</p>");
            $(".day4").append("<p>" + "Temperature (c)" + ((response.list[3].main.temp) - 273).toFixed(2) + "</p>");

            $(".day5").append("<h3>" + response.list[20].dt_txt + "<h3>");
            $(".day5").append("<p>" + "Humidity:" + response.list[4].main.humidity + "</p>");
            $(".day5").append("<p>" + "Temperature (c)" + ((response.list[4].main.temp) - 273).toFixed(2) + "</p>");



            console.log(response.city.coord.lat)
            console.log(response.city.coord.lon)

            var lat = response.city.coord.lat
            var lon = response.city.coord.lon


            function displayUv() {
                var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=9edde4d3d50871b7d0d7074d24782ded&lat=" + lat + "&lon=" + lon;
                $.ajax({
                    url: uvUrl,
                    method: "GET",
                })
                    .then(function (response) {
                        console.log(response)
                        console.log(uvUrl)
                        $(".city").append("<p>" + "UVindex:" + response.value + "</p>")
                        // .addClass(".uVindex");
                    })
            }

            displayUv()
        })
}



function getLocation(){


  
    navigator.geolocation.getCurrentPosition(function(position){
        var lat = position.coords.latitude
        var lng = position.coords.longitude

        console.log(lat,lng)

       latLonUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&appid=" + apiKey   
       
       $.ajax({
           url: latLonUrl,
           method: "Get",
       })
       
     
        .then(function (response) {
            // Log the queryURL
            // console.log(queryURL);
            // Log the resulting object
            console.log(response);
            console.log(latLonUrl)

            iconCode = response.weather[0].icon
            console.log(iconCode)
            var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png"

            $("#cityImage").attr('src', iconUrl)
            $(".city").append("<h2>" + response.name + " Weather today" + "</h2>");
            $(".city").append("<p>" + "Wind Speed:" + response.wind.speed + "</p>");
            $(".city").append("<p>" + "Humidity:" + response.main.humidity + "</p>");
            $(".city").append("<p>" + "Temperature (c)" + ((response.main.temp) - 273).toFixed(2) + "</p>");

            $(".savedCity").children().last().addClass(response.name)

          

       })
    })
}


    



    // wrap up all the ajax method into a function and store that function as the value 