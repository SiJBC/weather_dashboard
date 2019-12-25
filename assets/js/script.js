var apiKey = "4915deb164cf151c9e3b329f1c2270a7";


$(document).ready(function () {

    // displays the previous searches in a list on the side
    displayHistory()

    // checks if there are no previous searches and then asks user to activate geolocation tracking services
    if (localStorage.length === 0) {
        getLocation();
    }
    else {
        let lastCity = $(".savedCity").children().last().attr('id')
        console.log("Last city is " + lastCity);
        displayWeather(lastCity);
        displayForecast(lastCity);
       
    }


    // implements the search function from the users input
    $("#search").on("click", function () {
        var city = $("#searchTerm").val().trim();
        displayWeather(city);
        displayForecast(city);

        $("#searchTerm").val('')


    })


    // the on click function for the previously searched for history
    // also clears the previous results
    $(document).on('click', '.saved', function () {
        var city = localStorage.getItem($(this).text())
        console.log(city)
        displayWeather(city)
        displayForecast(city);
        console.log("this was clicked")
        $(".city").empty();
        $(".forecast").empty();
        $(".day1").empty();
        $(".day2").empty();
        $(".day3").empty();
        $(".day4").empty();
        $(".day5").empty();
        $(".savedCity").empty();
        localStorage.clear()

    })

    // the clear button to clear all the local storage values 
    $("#clear").on("click", function () {
        localStorage.clear()
        $("#searchTerm").val('')
        $(".savedCity").empty();
        $(".city").empty();
        $(".forecast").empty();
        $(".day1").empty();
        $(".day2").empty();
        $(".day3").empty();
        $(".day4").empty();
        $(".day5").empty();
    })

    // the my local weather button
    $("#myLocation").on("click", function () {
        $(".city").empty();
        $(".forecast").empty();
        $(".day1").empty();
        $(".day2").empty();
        $(".day3").empty();
        $(".day4").empty();
        $(".day5").empty();
        getLocation()

    })
    // the function to display the current weather
    function displayWeather(city) {
        $(".city").empty();
        $(".forecast").empty();
        $(".day1").empty();
        $(".day2").empty();
        $(".day3").empty();
        $(".day4").empty();
        $(".day5").empty();

        // the ajax api call for todays weather

        var httpsUrl = ""
                    
        if (location.protocol === 'http:') {
            httpsUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
         } else {
            httpsUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
         }
        var queryUrl = httpsUrl + city + "&appid=" + apiKey;

        console.log($(this))
        $.ajax({
            url: queryUrl,
            method: "GET",
        })

            .then(function (response) {

                console.log(response);
                console.log(queryUrl)

                iconCode = response.weather[0].icon
                console.log(iconCode)
                // conveerting the icon into a formatted attribute that can be displayed
                var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png"
                $('.city').append($('<img />').attr('src', iconUrl));



                $(".city").append("<h2>" + response.name + "</h2>");
                $(".city").append("<p><ul>" + "Wind Speed:" + response.wind.speed + "</ul></p>");
                $(".city").append("<p><ul>" + "Humidity:" + response.main.humidity + "</ul></p>");
                // converting the temperature to celcius
                $(".city").append("<p><ul>" + "Temperature (c)" + ((response.main.temp) - 273).toFixed(2) + "</ul></p>");


                // adding the buttons to access the previous history

                if (localStorage.getItem(response.name) === null) {
                    $(".savedCity").append("<ol><button>" + response.name + "<ol></button>")
                    $(".savedCity").children().last().addClass("saved")
                    $(".savedCity").children().last().attr("Id", response.name)
                }


                localStorage.setItem(city, city)

            })
    }
    // displaying the 5 day forecast
    function displayForecast(city) {
        $(".city").empty();

        var httpsUrl = ""
                    
        if (location.protocol === 'http:') {
            httpsUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=';
         } else {
            httpsUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';
         }
        var queryUrl = httpsUrl + city + "&appid=" + apiKey;

        console.log($(this))
        $.ajax({
            url: queryUrl,
            method: "GET",
        })


            .then(function (response) {

                console.log(response);
                console.log(queryUrl)
                console.log(response.list[0].main.temp)


                // formatting the date so that it no longer includes the time as well by treating it as a string the length can be reduced with the .slice()
                // function in javascript

                var date1 = response.list[0].dt_txt
                var formatedDate1 = date1.slice(0, -8);
                var date2 = response.list[10].dt_txt
                var formatedDate2 = date2.slice(0, -8);
                var date3 = response.list[17].dt_txt
                var formatedDate3 = date3.slice(0, -8);
                var date4 = response.list[24].dt_txt
                var formatedDate4 = date4.slice(0, -8);
                var date5 = response.list[31].dt_txt
                var formatedDate5 = date5.slice(0, -8);

                // formatting icons 
                iconCode1 = response.list[0].weather[0].icon
                var iconUrl1 = "http://openweathermap.org/img/w/" + iconCode1 + ".png"
                $('.day1').append($('<img />').attr('src', iconUrl1));

                iconCode2 = response.list[10].weather[0].icon
                var iconUrl2 = "http://openweathermap.org/img/w/" + iconCode2 + ".png"
                $('.day2').append($('<img />').attr('src', iconUrl2));

                iconCode3 = response.list[17].weather[0].icon
                var iconUrl3 = "http://openweathermap.org/img/w/" + iconCode3 + ".png"
                $('.day3').append($('<img />').attr('src', iconUrl3));

                iconCode4 = response.list[24].weather[0].icon
                var iconUrl4 = "http://openweathermap.org/img/w/" + iconCode4 + ".png"
                $('.day4').append($('<img />').attr('src', iconUrl4));

                iconCode5 = response.list[31].weather[0].icon
                var iconUrl5 = "http://openweathermap.org/img/w/" + iconCode5 + ".png"
                $('.day5').append($('<img />').attr('src', iconUrl5));






                $(".city").prepend("<h4>" + formatedDate1 + "</h4>");
                $(".day1").append("<h4>" + formatedDate1 + "<h4>");
                $(".day1").append("<p>" + "Humidity1:" + response.list[0].main.humidity + "</p>");
                $(".day1").append("<p><ul>" + "Temperature (c)" + ((response.list[0].main.temp) - 273).toFixed(2) + "<ul></p>");

                $(".day2").append("<h4>" + formatedDate2 + "<h4>");
                $(".day2").append("<p>" + "Humidity:" + response.list[10].main.humidity + "</p>");
                $(".day2").append("<p>" + "Temperature (c)" + ((response.list[10].main.temp) - 273).toFixed(2) + "</p>");

                $(".day3").append("<h4>" + formatedDate3 + "<h4>");
                $(".day3").append("<p>" + "Humidity:" + response.list[17].main.humidity + "</p>");
                $(".day3").append("<p>" + "Temperature (c)" + ((response.list[17].main.temp) - 273).toFixed(2) + "</p>");

                $(".day4").append("<h4>" + formatedDate4 + "<h4>");
                $(".day4").append("<p>" + "Humidity:" + response.list[24].main.humidity + "</p>");
                $(".day4").append("<p>" + "Temperature (c)" + ((response.list[24].main.temp) - 273).toFixed(2) + "</p>");

                $(".day5").append("<h4>" + formatedDate5 + "<h4>");
                $(".day5").append("<p>" + "Humidity:" + response.list[31].main.humidity + "</p>");
                $(".day5").append("<p>" + "Temperature (c)" + ((response.list[31].main.temp) - 273).toFixed(2) + "</p>");



                console.log(response.city.coord.lat)
                console.log(response.city.coord.lon)
                // to display the uv in the current weather we need the lat and lon from the forecast api call this can then be transfered over into the display UV function
                var lat = response.city.coord.lat
                var lon = response.city.coord.lon

                // this function ammends the current weather element even though it runs at a different time, this is the assynchronous feature of ajax
                // this can be demonstrated by the different times which the information is displayed on the page

                function displayUv() {
                    var httpsUrl = ""
                    
                    if (location.protocol === 'http:') {
                        httpsUrl = 'http://api.openweathermap.org/data/2.5/uvi?';
                     } else {
                        httpsUrl = 'https://api.openweathermap.org/data/2.5/uvi?';
                     } 
                    url = httpsUrl + "&lon" + lat + "&lon=" + lon;
                    $.ajax({
                        url: uvUrl,
                        method: "GET",
                    })
                        .then(function (response) {
                            console.log(response)
                            console.log(uvUrl)
                            $(".city").append("<span>" + "UVindex:" + response.value + "</span>")
                            $("span").addClass("uVIndex")



                        })
                }

                displayUv()
            })
    }


    // to get the current location we use the getCurrentPostion() function of javscript
    function getLocation() {



        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude
            var lng = position.coords.longitude

            console.log(lat, lng)
            var httpsUrl = ""
                    
            if (location.protocol === 'http:') {
                httpsUrl = 'http://api.openweathermap.org/data/2.5/weather?';
             } else {
                httpsUrl = 'https://api.openweathermap.org/data/2.5/weather?';
             }
            latLonUrl = httpsUrl + "lat=" + lat + "&lon=" + lng + "&appid=" + apiKey

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
                    
                    var httpsUrl = ""
                    
                    if (location.protocol === 'http:') {
                        httpsUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=21.1682895&lon=-101.6723306&units=imperial&APPID=ec50a6072ac189dee111acdd3a38ab9f';
                     } else {
                        httpsUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=21.1682895&lon=-101.6723306&units=imperial&APPID=ec50a6072ac189dee111acdd3a38ab9f';
                     }
                    var iconUrl = httpsUrl + iconCode + ".png"
                    $('.city').append($('<img />').attr('src', iconUrl));
                    $(".city").prepend("<h2>" + response.name + " Weather today" + "</h2>");
                    $(".city").append("<p>" + "Wind Speed:" + response.wind.speed + "</p>");
                    $(".city").append("<p>" + "Humidity:" + response.main.humidity + "</p>");
                    $(".city").append("<p>" + "Temperature (c)" + ((response.main.temp) - 273).toFixed(2) + "</p>");

                    // $(".savedCity").children().last().addClass(response.name)

                })
        })
    }
    // we loop through the local storage to make sure that each previously searched for city remains on the page

    function displayHistory() {
        for (i = 0; i < localStorage.length; i++) {
            $(".savedCity").append("<ol><button>" + localStorage.getItem(localStorage.key(i)) + "<ol></button>")
            $(".savedCity").children().last().addClass("saved")
            $(".savedCity").children().last().attr("Id", localStorage.getItem(localStorage.key(i)))
        }
    }

})









