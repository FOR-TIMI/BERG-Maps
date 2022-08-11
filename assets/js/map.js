//Where are you going today? BERG map can show you the way :)
//Happy Coding!
//Our api KEY hardcoded so you dont have to use it everytime
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2FoZWJiaGFsbGEiLCJhIjoiY2w2bXg2MXYwMDM3ZzNxcWoxYzdmbjhkeSJ9.5HnzmM4U9a2dpxbBlxO4mA";
const WEATHER_API_KEY = "2e1ebfe75535cfe66e25a2a55515c1e0";
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

//if the getPosition request is sucessful
function locationSuccess(position) {
  setLocationToMap([position.coords.longitude, position.coords.latitude]);
  getWeather(position.coords.longitude, position.coords.latitude);
}

//if the getPosition is unsuccessful, Longitude and latitude defaults to Downtown Toronto
function locationError() {
  setLocationToMap([-79.3966769, 43.6547567]);
}

//To set the location to the map
function setLocationToMap(position) {
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: defaultPostion, // style URL can also be used to change styles
    center: position, // starting position [lng, lat]
    zoom: 14, // starting zoom
    projection: "globe", // display the map as a 3D globe
  });

  map.on("style.load", () => {
    map.setFog({}); // Set the default atmosphere style
  });

  //Controls the marker
  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    })
  );

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
function getWeather(lon, lat) {
  console.log("Longitude is ", lon, "latitude is", lat);
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=b3d233c09be1dd283fac50c81f1249cd&exclude=hourly,daily&unit=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
//First Call of the page
//LocationSucess is a mothod
//locationError is a method
//To get the user's current location//This method will get the First
navigator.geolocation.getCurrentPosition(locationSuccess, locationError, {
  enableHighAccuracy: true,
});
