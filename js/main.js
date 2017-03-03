/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [39.952, -75.1638],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

/* CLEANING UP MY DATA */
var HRTFilter;
var LRTFilter;
var BusFilter;

var septaUrl= "https://gist.githubusercontent.com/jtoups/76820cf5f221aa82bd2a76f4778b2a1d/raw/c206c172df551aed8df859e373b0c061bb208334/PhillySepta.geojson";
var cleanTransit;
var parseData = $.ajax(septaUrl).done(function(rawTransit){
  state.transitData = JSON.parse(rawTransit);
  // return cleanTransit;
  // console.log(cleanTransit);
  // console.log("inside");
  HRTFilter = _.filter(state.transitData.features,
    function(datum){
      return datum.properties.MODE === "HRT";
  })

  BusFilter = _.filter(state.transitData.features,
      function(datum){
        return datum.properties.MODE === "Bus";
      })

  LRTFilter = _.filter(state.transitData.features,
        function(datum){
          return datum.properties.MODE === "Trolley";
        })
});
  console.log("Outside");


/* Establishing the Slides */

var state = {
  "slideNumber": 0,
  // "transitData" = JSON.parse(rawTransit);
  "mapped": undefined,
  "slideData": [
    {
      "mode": "Heavy Rapid Transit",
      "description": "Philadelphia's Subways and Elevated Systems",
      "lines": "Market-Franford Line, Broad Street Line",
      "mode code": "HRT",
    },
    {
      "mode": "Light Rail",
      "description": "The Subway-Surface Trolleys",
      "lines": "10,11,13,15,34, and 36",
      "mode code": "Trolley",
    },
    {
      "mode": "Bus",
      "description": "Buses that run all over the city!",
      "lines": "Too many to list!",
      "mode code": "BUS",
    }
  ]
};

/* Click Function */


var clickNext = function(){
  state.slideNumber ++;
  if (state.slideNumber > state.slideData.length) {
    state.slideNumber = 0;
  }
  return(state.slideNumber);
  console.log(state.slideNumber);
}

var clickPrev = function(){
  state.slideNumber --;
  if (state.slideNumber < 0 ) {
    state.slideNumber = 0;
  }
  return(state.slideNumber);
  console.log(state.SlideNumber);
}

$(".prev").click(function(){
  clickPrev();
  if(state.slideNumber ===1) {
    map.removeLayer(state.mapped);
    state.mapped = L.geoJson(HRTFilter).addTo(map);
  }else if(state.slideNumber ===2) {
      map.removeLayer(state.mapped);
      state.mapped = L.geoJson(LRTFilter).addTo(map);
  }else if (state.slideNumber ===3){
    map.removeLayer(state.mapped);
    state.mapped = L.geoJson(BusFilter).addTo(map);
  }else if (state.slideNumber===0){
    map.removeLayer(state.mapped);
  }
  console.log(state.slideNumber);
});

$(".next").click(function(){
  clickNext();
  if(state.slideNumber ===1) {
    state.mapped = L.geoJson(HRTFilter).addTo(map);
    $("#modeID").text(state.slideData[state.slideNumber-1].mode);
    $("#des").text(state.slideData[state.slideNumber-1].description);
    $("#lines").text(state.slideData[state.slideNumber-1].lines);
  }else if(state.slideNumber ===2) {
      map.removeLayer(state.mapped);
      state.mapped = L.geoJson(LRTFilter).addTo(map);
      $("#modeID").text(state.slideData[state.slideNumber-1].mode);
      $("#des").text(state.slideData[state.slideNumber-1].description);
      $("#lines").text(state.slideData[state.slideNumber-1].lines);
  }else if (state.slideNumber ===3){
    map.removeLayer(state.mapped);
    $("#modeID").text(state.slideData[state.slideNumber-1].mode);
    $("#des").text(state.slideData[state.slideNumber-1].description);
    $("#lines").text(state.slideData[state.slideNumber-1].lines);
    state.mapped = L.geoJson(BusFilter).addTo(map);
  }else if (state.slideNumber===0){
    map.removeLayer(state.mapped);
    $("#modeID").hide();
    $("#des").hide();
    $("#lines").hide();
  }
  console.log(state.slideNumber);

});


/*How to Filter Data*/
