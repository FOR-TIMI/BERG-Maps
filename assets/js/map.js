mapboxgl.accessToken = 'pk.eyJ1Ijoic2FoZWJiaGFsbGEiLCJhIjoiY2w2bXg2MXYwMDM3ZzNxcWoxYzdmbjhkeSJ9.5HnzmM4U9a2dpxbBlxO4mA';

 
//To get the user's current location
navigator.geolocation.getCurrentPosition(locationSuccess,locationError, {enableHighAccuracy:true})

//if the getPosition request is sucessful
function locationSuccess(position){
    setLocationToMap([position.coords.longitude,position.coords.latitude])
}

//if the getPosition is unsuccessful, Longitude and latitude defaults to Downtown Toronto
function locationError(){
    setLocationToMap([-79.3966769,43.6547567])
}


//To set the location to the map
function setLocationToMap(position){
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: position, // starting position [lng, lat]
        zoom: 16, // starting zoom
        projection: 'globe' // display the map as a 3D globe
        });
    
    map.on('style.load', () => {
        map.setFog({}); // Set the default atmosphere style
        });

    //Buttons to zoom in and out of the map and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());


    //To get directions
    map.addControl(
        new MapboxDirections({
        accessToken: mapboxgl.accessToken
        }),
        'top-left'
        );
}

