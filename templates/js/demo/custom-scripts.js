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



// var tableTrend = getHttpRequest('url-to-query');
var tableTrend = [
    ["1", "#Foo"],
    ["2", "#Bar"],
    ["3", "#Foo"],
    ["4", "#Foo"],
    ["5", "#Foo"]
];

$(document).ready(function () {
    var table = $('#trendTable').DataTable({
        data: tableTrend,
        columns: [
            { title: "Rank" },
            { title: "Hashtag" },
        ],
        "paging": false,
        "ordering": false,
        "info": false,
        "searching": false,
        "autoWidth": true
    });
});



// var topicTableTrend = getHttpRequest('url-to-query');
var topicTableTrend = [
    ["Politics", "#Foo, #Bar, #FooBar"],
    ["Environment", "#Foo, #Bar, #FooBar"],
    ["Social Unrest", "#Foo, #Bar, #FooBar"],
    ["Crime", "#Foo, #Bar, #FooBar"],
    ["Infrastructure", "#Foo, #Bar, #FooBar"],
];

$(document).ready(function () {
    var table = $('#topicTrendTable').DataTable({
        data: topicTableTrend,
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

window.onload = function initMap() {

    var mapProp = {
        center: new google.maps.LatLng(51.508742, -0.120850),
        zoom: 3,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    var parisMarker = new google.maps.Marker({ position: new google.maps.LatLng(48.8566, 2.3522) });
    parisMarker.setMap(map);
    var parisInfowindow = new google.maps.InfoWindow({
        content: "Paris: " + trend.hashtags.paris
    });
    parisInfowindow.open(map, parisMarker);

    var nycMarker = new google.maps.Marker({ position: new google.maps.LatLng(40.7128, -74.0060) });
    nycMarker.setMap(map);
    var nycInfowindow = new google.maps.InfoWindow({
        content: "NYC: " + trend.hashtags.nyc
    });
    nycInfowindow.open(map, nycMarker);

    var delhiMarker = new google.maps.Marker({ position: new google.maps.LatLng(28.7041, 77.1025) });
    delhiMarker.setMap(map);
    var delhiInfowindow = new google.maps.InfoWindow({
        content: "Delhi: " + trend.hashtags.delhi
    });
    delhiInfowindow.open(map, delhiMarker);

    var bangkokMarker = new google.maps.Marker({ position: new google.maps.LatLng(13.7563, 100.5018) });
    bangkokMarker.setMap(map);
    var bangkokInfowindow = new google.maps.InfoWindow({
        content: "Bangkok: " + trend.hashtags.bangkok
    });
    bangkokInfowindow.open(map, bangkokMarker);

    var mexMarker = new google.maps.Marker({ position: new google.maps.LatLng(19.4326, -99.1332) });
    mexMarker.setMap(map);
    var mexInfowindow = new google.maps.InfoWindow({
        content: "Mexico City: " + trend.hashtags.mex
    });
    mexInfowindow.open(map, mexMarker);


};

