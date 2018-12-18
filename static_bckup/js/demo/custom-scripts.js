async function getHttpRequest(url) {

    const params = {
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
        method: "GET"
    };

    let response = await fetch(url, params)
    let result = await response.json()
    return result;

/*    fetch(url, params)
        .then(data => { return data.json() })
        .then(res => console.log(res))
        .catch(err => console.log(err))*/
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
var tweets = [
    ["tweet-date", "City", "Topic", "Language", "Content"],
    ["tweet-date", "City", "Topic", "Language", "Content"]
]

$(document).ready(function () {
    var table = $('#tweetTable').DataTable({
        data: tweets,
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

// Load Bar chart
$(document).ready(function () {
    var cityCtx = document.getElementById("cityBarChart").getContext('2d');
    // var cityData = getHttpRequest('url-to-query');
    var cityData = [
        ["Paris", "Bangkok", "NYC", "Delhi", "Mexico City"],
        [2134, 12314, 50000, 23000, 8000]
    ]
    var cityChart = new Chart(cityCtx, {
        type: 'bar',
        data: {
            datasets: [{
                label: cityData[0][0],
                data: [cityData[1][0]],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1
            },
            {
                label: cityData[0][1],
                data: [cityData[1][1]],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: cityData[0][2],
                data: [cityData[1][2]],
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            },
            {
                label: cityData[0][3],
                data: [cityData[1][3]],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: cityData[0][4],
                data: [cityData[1][4]],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'No. of tweets'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Cities'
                    }
                }]
            },
            legend: {
                display: true
            }
        }
    });

    var topicCtx = document.getElementById("topicBarChart").getContext('2d');
    // var topicData = getHttpRequest('url-to-query');
    var topicData = [
        ["Social Unrest", "Environment", "Politics", "Crime", "Infrastructure"],
        [2134, 12314, 50000, 23000, 8000]
    ]
    var topicChart = new Chart(topicCtx, {
        type: 'bar',
        data: {
            datasets: [{
                label: topicData[0][0],
                data: [topicData[1][0]],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1
            },
            {
                label: topicData[0][1],
                data: [topicData[1][1]],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: topicData[0][2],
                data: [topicData[1][2]],
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            },
            {
                label: topicData[0][3],
                data: [topicData[1][3]],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: topicData[0][4],
                data: [topicData[1][4]],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'No. of tweets'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Topics'
                    }
                }]
            },
            legend: {
                display: true
            }
        }
    });

    var langCtx = document.getElementById("langBarChart").getContext('2d');
    // var langData = getHttpRequest('url-to-query');
    var langData = [
        ["English", "Hindi", "Thai", "French", "Spanish"],
        [2134, 12314, 50000, 23000, 8000]
    ]
    var langChart = new Chart(langCtx, {
        type: 'bar',
        data: {
            datasets: [{
                label: langData[0][0],
                data: [langData[1][0]],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1
            },
            {
                label: langData[0][1],
                data: [langData[1][1]],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: langData[0][2],
                data: [langData[1][2]],
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            },
            {
                label: langData[0][3],
                data: [langData[1][3]],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: langData[0][4],
                data: [langData[1][4]],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'No. of tweets'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Languages'
                    }
                }]
            },
            legend: {
                display: true
            }
        }
    });

    var timeCtx = document.getElementById("timeSeriesChart").getContext('2d');
    // var langData = getHttpRequest('url-to-query');
    var timeData = [
        ["24/11/18", "25/11/18", "26/11/18", "27/11/18", "28/11/18"],
        [[2134, 12314, 50000, 23000, 8000], [2134, 12314, 50000, 23000, 8000], [2134, 12314, 50000, 23000, 8000], [2134, 12314, 50000, 23000, 8000], [2134, 12314, 50000, 23000, 8000]],
        ["Paris", "Bangkok", "NYC", "Delhi", "Mexico City"]
    ]
    console.log(timeData[1][0]);
    var timeChart = new Chart(timeCtx, {
        type: 'bar',
        data: {
            labels: timeData[0],
            datasets: [{
                label: timeData[2][0],
                data: timeData[1][0],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 1
            },
            {
                label: timeData[2][1],
                data: timeData[1][1],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 1
            },
            {
                label: timeData[2][2],
                data: timeData[1][2],
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 0.2)',
                borderWidth: 1
            },
            {
                label: timeData[2][3],
                data: timeData[1][3],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1
            },
            {
                label: timeData[2][4],
                data: timeData[1][4],
                backgroundColor: 'rgba(153, 102, 255, 1)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'No. of tweets'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Dates'
                    }
                }]
            },
            legend: {
                display: true
            }
        }
    });

    // $('#collapseClick').click();
    $('#resultCollapseClick').click();
    // $('#analyticsCollapseButton').click();

});