const mymap = L.map('issMap').setView([0, 0], 2);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution }); 
tiles.addTo(mymap);

//set icon
var myIcon = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/17/ISS_U.S._National_Lab.svg',
    iconSize: [66, 20],
    iconAnchor: [33, 10]
});

//set the marker on map
const marker = L.marker([0, 0], {icon: myIcon}).addTo(mymap);

async function whereIss() {
  var url = 'https://api.wheretheiss.at/v1/satellites/25544';
  const response = await fetch(url);
  const data = await response.json();
  const { latitude, longitude, velocity, altitude } = data; 
  console.log(data);
  
  //L.marker([latitude, longitude]).addTo(mymap);
  marker.setLatLng([latitude, longitude]);
  
  document.querySelector("#lat").textContent = latitude.toFixed(2);
  document.querySelector("#lon").textContent = longitude.toFixed(2);
  document.querySelector("#vel").textContent = velocity.toFixed(2);
  document.querySelector("#altitude").textContent = altitude.toFixed(2);
}
  
whereIss();
setInterval(whereIss, 1000);
