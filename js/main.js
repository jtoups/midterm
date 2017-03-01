/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [40.000, -75.1090],
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

var septaUrl= "https://gist.githubusercontent.com/jtoups/76820cf5f221aa82bd2a76f4778b2a1d/raw/c206c172df551aed8df859e373b0c061bb208334/PhillySepta.geojson";
var cleanTransit;
var parseData = $.ajax(septaUrl).done(function(rawTransit){
  cleanTransit = JSON.parse(rawTransit);
  return cleanTransit;
});

var state = {
  "slideNumber": -1,
  "slideData": [
    {
      "mode": "Heavy Rapid Transit",
      "description": "Philadelphia's Subways and Elevated Systems",
      "lines": "Market-Franford Line, Broad Street Line",
    },
    {
      "mode": "Light Rail",
      "description": "The Subway-Surface Trolleys",
      "lines": "10,11,13,15,34, and 36",
    },
    {
      "mode": "Bus",
      "description": "Buses that run all over the city!",
      "lines": "Too many to list!",
    }
  ]
};
