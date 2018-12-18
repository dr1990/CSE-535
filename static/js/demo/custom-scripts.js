function getHttpRequest(url) {

    const params = {
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
        method: "GET"
    };

    fetch(url, params)
        .then(data => { return data.json() })
        .then(res => console.log(res))
        .catch(err => console.log(err))
};

function postHttpRequest(url, data) {

    const params = {
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
        body: data,
        method: "POST"
    };

    fetch(url, params)
        .then(data => { return data.json() })
        .then(res => console.log(res))
        .catch(err => console.log(err))
};

Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Search
$("#searchBtn").on('click', function () {
    var ico = document.getElementById("collapseImage");
    var freeText = document.getElementById("freeText").value;
    console.log(freeText);
    if (ico.className == 'fa fa-chevron-circle-down') {
        var cities = $('#cities').val();
        var langs = $("#langs").val();
        var topics = $("#topics").val();
        //TODO: Fix datetimepicker
        // var searchDate = $('#datetimes').data("datetime").date();
        // console.log(searchDate);
        console.log(cities);
        console.log(langs);
        console.log(topics);

        searchRequest = {
            "cities": cities,
            "langs": langs,
            "topics": topics,
            "query": freeText
        }

        //var resultData = postHttpRequest('http://localhost:8000/home/getSearch/', searchRequest);



        var resultData = $.ajax({
      type: 'POST',
      url: "http://localhost:8000/home/getSearch/",
      async: false,
      data: JSON.stringify(searchRequest),
      dataType: "json",
      contentType: "application/json ; charset=utf-8"

})
.done(function(res) {
  console.log("success");
  return res.responseJSON;
})
.fail(function(e) {
  console.log("error"+e);
})
.always(function() {
  console.log('complete');
});

resultData = resultData.responseJSON;

        var timeSeriesData = {
            "nyc": {
                label: 'NYC',
                borderColor: 'rgba(255, 99, 132, 0.2)',
                fill: false,
                data: resultData.timeSeriesMap.nyc
            },
            "delhi": {
                label: 'Delhi',
                borderColor: 'rgba(54, 162, 235, 0.2)',
                fill: false,
                data: resultData.timeSeriesMap.delhi
            },
            "bangkok": {
                label: 'Bangkok',
                borderColor: 'rgba(255, 206, 86, 0.2)',
                fill: false,
                data: resultData.timeSeriesMap.bangkok
            },
            "mexicoCity": {
                label: 'Mexico City',
                borderColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
                data: resultData.timeSeriesMap.mexicoCity
            },
            "paris": {
                label: 'Paris',
                borderColor: 'rgba(153, 102, 255, 0.2)',
                fill: false,
                data: resultData.timeSeriesMap.delhi
            },
        }

        pushResults(resultData.rawtweets);
        pushAnalytics(resultData.cityList, resultData.topicList, resultData.langList, timeSeriesData, resultData.sentimentList);
    }
});

$(document).ready(function () {

    var table = $('#trendTable').DataTable({
    serverSide: true,
    ajax: {
        url: 'http://localhost:8000/home/getGeneralHashtags/',
        type: 'GET'
    },
        columns: [
            { title: "Rank" },
            { title: "Hashtag" },
            { title: "Count" }
        ],
        "paging": false,
        "ordering": false,
        "info": false,
        "searching": false,
        "autoWidth": true
    });
});



$(document).ready(function () {

    var table = $('#topicTrendTable').DataTable({
    serverSide: true,
    ajax: {
        url: 'http://localhost:8000/home/getTopicHashtags/',
        type: 'GET'
    },
        columns: [
            { title: "Topic" },
            { title: "Hashtag" }
        ],
        "paging": false,
        "ordering": false,
        "info": false,
        "searching": false,
        "autoWidth": true
    });
});

// const myData = getHttpRequest('url-to-query');
const myData = [{
    "id": 1,
    "name": 'Item 1',
    "ignore": false
}, {
    "id": 2,
    "name": 'Item 2',
    "ignore": false
}, {
    "id": 3,
    "name": 'Item 3',
    "ignore": false
}
]



// var trend = getHttpRequest('url-to-query');
var trend = {
    "hashtags": {
        "paris": "#Louvre, #EifellTower, #Bridge, #Foo, #Bar",
        "delhi": "#Capital, #City, #Foo, #Bar, #FooBar",
        "nyc": "#City, #Thanksgiving, #Foo, #Bar, #FooBar",
        "mex": "#Foo, #Bar, #FooFoo, #FooBarBar, #FooBarFoo",
        "bangkok": "#Foo, #Bar, #FooFoo, #FooBarBar, #FooBarFoo"
    }
}

$(document).ready(function () {

    $.ajax({
    type: "GET",
    url: 'http://localhost:8000/home/getCityHashtags',
    success: function(data)
    {

        trend = data.data;
        initMap();

    }
});

});


 function initMap() {

    var mapProp = {
        center: new google.maps.LatLng(51.508742, -0.120850),
        zoom: 3,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    var parisMarker = new google.maps.Marker({ position: new google.maps.LatLng(48.8566, 2.3522) });
    parisMarker.setMap(map);
    var parisInfowindow = new google.maps.InfoWindow({
        content: "Paris: " + trend.paris
    });
    parisInfowindow.open(map, parisMarker);

    var nycMarker = new google.maps.Marker({ position: new google.maps.LatLng(40.7128, -74.0060) });
    nycMarker.setMap(map);
    var nycInfowindow = new google.maps.InfoWindow({
        content: "NYC: " + trend.nyc
    });
    nycInfowindow.open(map, nycMarker);

    var delhiMarker = new google.maps.Marker({ position: new google.maps.LatLng(28.7041, 77.1025) });
    delhiMarker.setMap(map);
    var delhiInfowindow = new google.maps.InfoWindow({
        content: "Delhi: " + trend.delhi
    });
    delhiInfowindow.open(map, delhiMarker);

    var bangkokMarker = new google.maps.Marker({ position: new google.maps.LatLng(13.7563, 100.5018) });
    bangkokMarker.setMap(map);
    var bangkokInfowindow = new google.maps.InfoWindow({
        content: "Bangkok: " + trend.bangkok
    });
    bangkokInfowindow.open(map, bangkokMarker);

    var mexMarker = new google.maps.Marker({ position: new google.maps.LatLng(19.4326, -99.1332) });
    mexMarker.setMap(map);
    var mexInfowindow = new google.maps.InfoWindow({
        content: "Mexico City: " + trend.mexico
    });
    mexInfowindow.open(map, mexMarker);


};

// var tweets = getHttpRequest('url-to-query');
// var tweets = [
//     ["tweet-date", "City", "Topic", "Language", "Content"],
//     ["tweet-date", "City", "Topic", "Language", "Content"]
// ]

$(document).ready(function () {
    var table = $('#tweetTable').DataTable({
        columns: [
            { title: "Time", width: "15%" },
            { title: "City", width: "15%" },
            { title: "Topic", width: "15%" },
            { title: "Language", width: "15%" },
            { title: "Content", width: "40%" }
        ],
        "autoWidth": false
    });
});

function pushResults(rawTweets) {
    var table = $('#tweetTable').DataTable();
    table.clear();
    table.rows.add(rawTweets);
    table.draw();
    var ico = document.getElementById('resultCollapseImage');
    if (ico.className == 'fa fa-chevron-circle-left') {
        $('#resultCollapseClick').click();
    }
    // $('#analyticsCollapseButton').click();


};

// $(document).ready(function() {
//     var cityCtx = document.getElementById("cityBarChart").getContext('2d');
//     var cityChart = new Chart(cityCtx, {
//         type: 'bar',
//         data: {},
//         options: {
//             maintainAspectRatio: false,
//             scales: {
//                 yAxes: [{
//                     ticks: {
//                         beginAtZero: true
//                     },
//                     scaleLabel: {
//                         display: true,
//                         labelString: 'No. of tweets'
//                     }
//                 }],
//                 xAxes: [{
//                     scaleLabel: {
//                         display: true,
//                         labelString: 'Cities'
//                     }
//                 }]
//             },
//             legend: {
//                 display: true
//             }
//         }
//     });
// });

// Load Bar chart

function pushAnalytics(cityData, topicData, langData, timeData, sentData) {
    var ico = document.getElementById('analyticsCollapseImage');
    if (ico.className == 'fa fa-chevron-circle-left') {
        $('#analyticsCollapseButton').click();
    }



    var cityCtx = document.getElementById("cityBarChart").getContext('2d');
    var cityChart = new Chart(cityCtx, {
        type: 'pie',
        data: {
            datasets: [{
                data: cityData[1],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderWidth: 1
            }],
            labels: cityData[0]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: true
            }
        }
    });

    var topicCtx = document.getElementById("topicBarChart").getContext('2d');

    var topicChart = new Chart(topicCtx, {
        type: 'pie',
        data: {
            datasets: [{
                data: topicData[1],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderWidth: 1
            }],
            labels: topicData[0]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: true
            }
        }
    });

    var langCtx = document.getElementById("langBarChart").getContext('2d');
    var langData = langData
    var langChart = new Chart(langCtx, {
        type: 'pie',
        data: {
            datasets: [{
                data: langData[1],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderWidth: 1
            }],
            labels: langData[0]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: true
            }
        }
    });

    var timeCtx = document.getElementById("timeSeriesChart").getContext('2d');
    var timeData = timeData;

    var timeChart = new Chart(timeCtx, {
        type: 'line',
        data: { datasets: [timeData.delhi, timeData.bangkok, timeData.paris, timeData.mexicoCity, timeData.nyc] },
        options: {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                }]
            }
        }
    });

    var sentCtx = document.getElementById("sentimentChart").getContext('2d');
    var sentData = sentData;
    console.log(sentData);

    var sentChart = new Chart(sentCtx, {
        type: 'bubble',
        data: {
            datasets: [{
                data: sentData,
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)'
            }]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Positive sentiment'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Negative sentiment'
                    }
                }]
            }
        }
    })


    // $('#collapseClick').click();

};