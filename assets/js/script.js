var apiKey = "4915deb164cf151c9e3b329f1c2270a7";


$(document).ready(function () {


    displayHistory()

    if (localStorage.length === 0){
            getLocation();
    }
    else {
      let lastCity =  localStorage.getItem(localStorage.key(localStorage.length-1)) 
      console.log("Last city is "+lastCity );
      displayWeather(lastCity);
      displayForecast(lastCity);  
    }
    


    $("#search").on("click", function () {
        var city = $("#searchTerm").val().trim();
        displayWeather(city);
        displayForecast(city);
    

    })



    $(document).on('click', '.saved', function () {
        var city = localStorage.getItem($(this).text())
        console.log(city)
        displayWeather(city)
        displayForecast(city);
        console.log("this was clicked")
        $(this).hide();
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

    function displayWeather(city) {
        $(".city").empty();
        $(".forecast").empty();
        $(".day1").empty();
        $(".day2").empty();
        $(".day3").empty();
        $(".day4").empty();
        $(".day5").empty();


        var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

        // var queryUvUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey &lat={lat}&lon={lon}" (response.coord.lon)(response.coord.lat)
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

                var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png"
                $('.city').append($('<img />').attr('src', iconUrl));

          

                $(".city").append("<h2>" + response.name + "</h2>");
                $(".city").append("<p><ul>" + "Wind Speed:" + response.wind.speed + "</ul></p>");
                $(".city").append("<p><ul>" + "Humidity:" + response.main.humidity + "</ul></p>");
                $(".city").append("<p><ul>" + "Temperature (c)" + ((response.main.temp) - 273).toFixed(2) + "</ul></p>");
               
     

                $(".savedCity").append("<button>" + response.name + "</button>")
                $(".savedCity").children().last().addClass("saved")

               

                localStorage.setItem(city, city)

            })
    }

    function displayForecast(city) {
        $(".city").empty();
        // event.preventDefault();
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

                iconCode1 = response.list[0].icon
                var iconUrl1 = "http://openweathermap.org/img/w/" + iconCode + ".png"
                $('.day1').append($('<img />').attr('src', iconUrl1));

                iconCode2 = response.list[10].icon
                var iconUrl2 = "http://openweathermap.org/img/w/" + iconCode + ".png"
                $('.day2').append($('<img />').attr('src', iconUrl2));

                iconCode3 = response.list[17].icon
                var iconUrl3 = "http://openweathermap.org/img/w/" + iconCode + ".png"
                $('.day3').append($('<img />').attr('src', iconUrl3));

                iconCode3 = response.list[24].icon
                var iconUrl3 = "http://openweathermap.org/img/w/" + iconCode + ".png"
                $('.day4').append($('<img />').attr('src', iconUrl3));

                iconCode3 = response.list[31].icon
                var iconUrl3 = "http://openweathermap.org/img/w/" + iconCode + ".png"
                $('.day5').append($('<img />').attr('src', iconUrl3));

           



                 
                $(".city").prepend("<h4>" + formatedDate1 + "</h4>");
                $(".day1").append("<h4>" + formatedDate1 + "<h4>");
                $(".day1").append("<p>" + "Humidity:" + response.list[0].main.humidity + "</p>");
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
                            $(".city").append("<span>" + "UVindex:" + response.value + "</span>")
                            $("span").addClass("uVIndex")
                           
                           
                           
                        })
                }

                displayUv()
            })
    }



    function getLocation() {



        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude
            var lng = position.coords.longitude

            console.log(lat, lng)

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
                    $('.city').append($('<img />').attr('src', iconUrl));
                    $(".city").prepend("<h2>" + response.name + " Weather today" + "</h2>");
                    $(".city").append("<p>" + "Wind Speed:" + response.wind.speed + "</p>");
                    $(".city").append("<p>" + "Humidity:" + response.main.humidity + "</p>");
                    $(".city").append("<p>" + "Temperature (c)" + ((response.main.temp) - 273).toFixed(2) + "</p>");

                    $(".savedCity").children().last().addClass(response.name)

                })
        })
    }

    function displayHistory() {
        for (i = 0; i < localStorage.length; i++) {
            $(".savedCity").append("<button>" + localStorage.getItem(localStorage.key(i)) + "</button>")
            $(".savedCity").children().last().addClass("saved")
        }
    }

    // function displayLast(){
        
    //     // var savedCityList = []
    //     // for (i=0; i <localStorage.length; i++){
    //     //     savedCityList = localStorage.getItem(localStorage.key(i))
    //     //     console.log(savedCityList)
    //     // }
    //     console.log(localStorage.getItem(localStorage.key(0)));
    //     displayForecast(localStorage.getItem(localStorage.key(0)));
    // }


})









