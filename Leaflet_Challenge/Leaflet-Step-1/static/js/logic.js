//Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.

//Your data markers should reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes should appear larger and darker in color.

//Include popups that provide additional information about the earthquake when a marker is clicked.

//Create a legend that will provide context for your map data.

//Your visualization should look something like the map above.

// Store API link
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

d3.json(link, function(data){
  createFeatures(data.features);
  console.log(data.features)
});

function createFeatures(earthquakeData) {
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

  function radiusSize(mag) {
    return mag * 3000;
  }

  function circleColor(mag) {
    if (mag < 1) {
      return "#ccff33"
    }
    else if (mag < 2){
      return "#ffff33"
    }
    else if (mag < 3) {
      return "#ffcc33"
    }
    else if (mag > 4) {
      return "#ff9933"
    }
    else if (mag <5) {
      return"#ff6633"
    }
    else {
      return "#ff3333"
    }
  }

  var earthquakes =L.geoJSON(earthquakeData, {
    pointToLayer: function(earthquakeData, latlng) {
      return L.circle(latlng, {
        radius: radiusSize(earthquakeData.properties.mag),
        color: circleColor(earthquakeData.properties.mag),
        fillOpacity: 1

      });
    },
    onEachFeature: onEachFeature
  });
  createMap(earthquakes)
}



function createMap(earthquakes) {

  // Define satelitemap and darkmap layers
  var satelitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });

  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY

  });

  

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Satelite Map": satelitemap,
    "Light Map": lightmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the satelitemap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [37.0902405,-95.7128906],
    zoom: 5,
    layers: [satelitemap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  var info = L.control({position: 'bottomright'});

  info.onAdd = function () {
  
    var div = L.DomUtil.create('div', 'info legend'),
        mags = [0, 1, 2, 3, 4, 5];

    for (var i = 0; i < mags.length; i++) {
      div.innerHTML +=
            '<i style="background:' + circleColor(mags[i] + 1) + '"></i> ' + 
    + mags[i] + (mags[i + 1] ? ' - ' + mags[i + 1] + '<br>' : ' + ');
    }
    return div;
};

info.addTo(myMap);

}
