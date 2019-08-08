

function getMap(){

  require([
        // mappa 2d
        "esri/Map",
        "esri/views/MapView",

        //*** layer siti archeologici ***//
        "esri/layers/FeatureLayer",
        "esri/geometry/Point",

        // Widget di ricerca
        "esri/widgets/Search",

        //geolocation
        "esri/widgets/Locate",
      ],
      function(
        Map,
        MapView,
        FeatureLayer,
        Point,
        Search,
        Locate
      ) {

      var map = new Map({
        basemap: "streets-navigation-vector"
      });

      var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [ 9.19034, 45.46416], // longitude, latitude for center the map in Milan
        zoom: 11
      });

      var siteLayer = new FeatureLayer({
        url: "https://services2.arcgis.com/wi2OtdeV76SnZCKG/arcgis/rest/services/Milano_Archeologica/FeatureServer/0",
        // outFields: ["*"], // Return all fields so it can be queried client-side

        title: "Siti archeologici Milano",  // get the name and description of points from services
        popupTemplate: {
          title: "{name}",
          content: "{description}",

        },
      });

      map.add(siteLayer);

      // generazione della barra di ricerca
      var searchWidget = new Search({
        view: view
      });
      // Adds the search widget below other elements in the top left corner of the view
      view.ui.add(searchWidget, {
        position: "top-left",
        index: 2
      });

      var sqlExpressions = [
        "Anfiteatro Romano",
        "Il Circo",
        "Il Foro Romano",
        "Il Palazzo Imperiale",
        "Il Recinto di San Vittore al Corpo",
        "Il Teatro Romano",
        "Le Mura Massimianee",
        "Le Terme",
        "San Giovanni in Conca",
        "La Torre Poligonale",
        "Le Colonne di San Lorenzo",
        "Gli Archi di Porta Nuova"
      ];

      var selectFilter = document.createElement("select");
      selectFilter.setAttribute("class", "esri-widget esri-select");
      selectFilter.setAttribute("style", "width: 200px; font-family: Avenir Next W00; font-size: 1em;");

      sqlExpressions.forEach(function(sql){
        var option = document.createElement("option");
        option.value = sql;
        option.innerHTML = sql;
        selectFilter.appendChild(option);
      });

      function setFeatureLayerFilter(sqlExpressions) {
        console.log();
        siteLayer.definitionExpression = "name =" + "'" + sqlExpressions + "'";
      }

      selectFilter.addEventListener('change', function (event) {
        console.log(event.target.value);
        setFeatureLayerFilter(event.target.value);
      });

      view.ui.add(selectFilter, "top-right");

      var locate = new Locate({
          view: view,
          useHeadingEnabled: false,
          goToOverride: function(view, options) {
            options.target.scale = 1500;  // Override the default map scale
            return view.goTo(options.target);
          }
        });

        view.ui.add(locate, "bottom-right");


    });
}


function slider(){  //FUNZIONE per cambiare il background dello slider ogni 2 secondi

   var imagesUrl = [
     "https://www.in-lombardia.it/sites/default/files/luogo/images/624/808/id391_colonne-di-san-lorenzo_milano_01_fotolia.jpg",
     "https://images.unsplash.com/photo-1532969476555-7a4eb819a357?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
     "https://images.unsplash.com/photo-1541514254856-8caa32916423?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80"
   ];

   var sliderWrap = document.getElementById("slider-wrap");
   var i = 0;

   setInterval(function() {
     if (sliderWrap) {
       sliderWrap.style.backgroundImage = "url(" + imagesUrl[i] + ")";
       i = i + 1;
       if (i == imagesUrl.length) {
         i =  0;
       }
 }
     }
         , 2000);
}

function dropdownMenu(){ // funzione per mostrare il dropdown menu al click

  $('.menu-icon').click(function(){
    $('.dropdown').toggleClass('hidden');
  });

}



function init(){

  slider()
  getMap();
  dropdownMenu()
}

$(document).ready(init);
