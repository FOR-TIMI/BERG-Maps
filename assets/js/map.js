//Where are you going today? BERG map can show you the way :)
//Happy Coding!
//Our api KEY hardcoded so you dont have to use it everytime

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FoZWJiaGFsbGEiLCJhIjoiY2w2bXg2MXYwMDM3ZzNxcWoxYzdmbjhkeSJ9.5HnzmM4U9a2dpxbBlxO4mA';
const WEATHER_API_KEY = 'd582054f0f0dcf06c41ec1c6aa2bd8a9'
var defaultPostion = "mapbox://styles/mapbox/streets-v11";


var getPostion = function (postion) {
  if (postion == null) {
    return "mapbox://styles/mapbox/streets-v11";
  } else {
    switch (postion) {
      case "outdoor":
        defaultPostion = "mapbox://styles/mapbox/outdoors-v11";
        navigator.geolocation.getCurrentPosition(
          locationSuccess,
          locationError,
          { enableHighAccuracy: true }
        );
        break;
      case "light":
        defaultPostion = "mapbox://styles/mapbox/light-v10";
        navigator.geolocation.getCurrentPosition(
          locationSuccess,
          locationError,
          { enableHighAccuracy: true }
        );
        break;
      case "dark":
        defaultPostion = "mapbox://styles/mapbox/dark-v10";
        navigator.geolocation.getCurrentPosition(
          locationSuccess,
          locationError,
          { enableHighAccuracy: true }
        );
        break;
      case "satellite":
        defaultPostion = "mapbox://styles/mapbox/satellite-v9";
        navigator.geolocation.getCurrentPosition(
          locationSuccess,
          locationError,
          { enableHighAccuracy: true }
        );
        break;
      case "satelliteStreets":
        defaultPostion = "mapbox://styles/mapbox/satellite-streets-v11";
        navigator.geolocation.getCurrentPosition(
          locationSuccess,
          locationError,
          { enableHighAccuracy: true }
        );
        break;
      case "navigationDay":
        defaultPostion = "mapbox://styles/mapbox/navigation-day-v1";
        navigator.geolocation.getCurrentPosition(
          locationSuccess,
          locationError,
          { enableHighAccuracy: true }
        );
        break;
      case "navigationNight":
        defaultPostion = "mapbox://styles/mapbox/navigation-night-v1";
        navigator.geolocation.getCurrentPosition(
          locationSuccess,
          locationError,
          { enableHighAccuracy: true }
        );
        break;
    }
  }
};

// enable maplayer menu buttons
document.querySelectorAll(".mapLayer").forEach((multiAction) => {
  const menuButton = multiAction.querySelector(".primaryButton");
  const list = multiAction.querySelector(".popup");

  menuButton.addEventListener("click", () => {
    list.classList.toggle("popup--visible");
  });
});
//Hide the mapLayer buttons
document.addEventListener("click", (e) => {
  const keepOpen =
    e.target.matches(".popup") || e.target.matches(".primaryButton");


  if (e.target.matches(".menuButton")) {
    getPostion(e.target.id);
  }
  if (keepOpen) return;

  document.querySelectorAll(".popup").forEach((list) => {
    list.classList.remove("popup--visible");
  });
});






function locationSuccess(position){
    setLocationToMap([position.coords.longitude,position.coords.latitude])
    getLocationName(position.coords.latitude,position.coords.longitude)
    getWeather(position.coords.longitude,position.coords.latitude)
}

//if the getPosition is unsuccessful, Longitude and latitude defaults to Downtown Toronto
function locationError(){
    getLocationName(43.6547567,-79.3966769)
    setLocationToMap([-79.3966769,43.6547567])

}




//To get weather data
function getWeather(lon, lat) {
  console.log("Longitude is ", lon, "latitude is", lat);
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=b3d233c09be1dd283fac50c81f1249cd&exclude=hourly,daily&unit=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}


//To get the location's Name from google maps API
function getLocationName(lat,lon){
    var geocoder;
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, lon);

    geocoder.geocode(
        {'latLng': latlng}, 
        function(results, status) {



            if (status == google.maps.GeocoderStatus.OK) {

                if (results[1]) {
           
                //find country name
                     for (var i=0; i<results[0].address_components.length; i++) {
                    for (var b=0;b<results[0].address_components[i].types.length;b++) {
        
                    //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                        if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                            //this is the object you are looking for
                            city = results[0].address_components[i];
                            break;
                        }
                    }
                  
                }
                //city data
               finalCity = city.long_name || city.short_Name || "" + results[1].address_components[4].long_name || results[1].address_components[4].short_Name
               return getWeather(lon,lat,finalCity)
        
                }
              
        }

} )
 
}

// //To set the location to the map
function setLocationToMap(position){
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: defaultPostion, // style URL can also be used to change styles
        center: position, // starting position [lng, lat]
        zoom: 14, // starting zoom
        projection: 'globe' // display the map as a 3D globe
        });
    
    map.on('style.load', () => {
        map.setFog({}); // Set the default atmosphere style
        });

  //Controls the marker 
    map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
        }));

  //Buttons to zoom in and out of the map and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl());

  //To get directions
  map.addControl(
    new MapboxDirections({
      accessToken: mapboxgl.accessToken,
    }),
    "top-left"
  );
}


//To get weather data
function getWeather(lon,lat,city){

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=b3d233c09be1dd283fac50c81f1249cd&exclude=hourly,daily,minutely&units=metric`
    fetch(url).then(response => response.json())
    .then(data => {
          showWeatherData(data.current,city);
    })
}




//To set current weather to the page
function showWeatherData(data,city){

    return document.getElementById("weather").innerHTML =`<div class="flex flex-row justify-around items-center">
    <h5 id="city" class="text-lg">${city}</h5>
    <div class=" flex ml-12 items-center">
        <p class="text-sm">${Math.floor(data.temp)}°C</p>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">
    </div>
    </div>`
}
//First Call of the page
//LocationSucess is a mothod
//locationError is a method
//To get the user's current location//This method will get the First
navigator.geolocation.getCurrentPosition(locationSuccess, locationError, {
    enableHighAccuracy: true,
  });
  







