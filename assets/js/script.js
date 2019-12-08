var apiKey = "4915deb164cf151c9e3b329f1c2270a7"
var cityName = "Sydney"
var queryUrl = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=" + apiKey
console.log(queryUrl)

$("#search").on("click", function () {
    event.preventDefault();
    console.log($(this))
    $.ajax({
        url: queryUrl,
        method: "get",

    })
})
    .then(function (response) {
        console.log(response)
        console.log(response )
    })
