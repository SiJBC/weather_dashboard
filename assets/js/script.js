var apiKey = "N4KDYCMADBLj1t8ZaAsTK4n8tLw8tSyi"
    var title = "fire"
    var userNumber = $("userInput").val()
    var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=" + apiKey + "&fq=" + title
    console.log(queryUrl)

    $("#search").on("click", function(){
    event.preventDefault();
    console.log($(this))
    $.ajax({
        url: queryUrl,
        method: "get",
    })
        .then(function (response) {
            console.log(response)
            console.log(response.response.docs[0].web_url)
            var webURL = JSON.stringify(response.response.docs[0].web_url);
            var author = JSON.stringify(response.response.docs[0].byline.original);
            var dateEl = JSON.stringify(response.response.docs[0].pub_date);
            var sectionEl  = JSON.stringify(response.response.docs[0].section_name);
            var headline  = JSON.stringify(response.response.docs[0].headline.main);

            console.log(sectionEl)
            console.log(dateEl)

            $("#title").text(headline)
            $("#writtenBy").text(author)
            $("#section").text(sectionEl)
            $("#dateWritten").text(dateEl)
            $("#newsLink").text(webURL)
        
        });
    });