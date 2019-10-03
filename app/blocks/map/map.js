/* eslint-disable */
// http://leafletjs.com
// Для кластеров использовать: https://github.com/Leaflet/Leaflet.markercluster
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.locatecontrol';

const $ = window.$;

export default function maps() {
  if (!$('#map').length) return;

  const map = L.map('map', {
    scrollWheelZoom: false,
  }).setView([0, 0], 13);

  L.tileLayer('https://api.mapbox.com/styles/v1/{username}/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    username: 'theververy1',
    id: 'cj7vvcf9u3gf02rnpss4fiha8',
    accessToken: 'pk.eyJ1IjoidGhldmVydmVyeTEiLCJhIjoiY2lzZXdzaXZ4MDBjaTJudm93dDI4MGVrMCJ9.Z8KKk0M_lpDTPB6_JtJBxg',
  }).addTo(map);

  // Генерируем иконку нужного цвета
  function myIconGenerator(primary) {
    var myIcon = L.divIcon({
      html: `<div class="marker-icon${!primary ? ' marker-icon_false' : ''}"></div>`,
      iconSize: $(window).width() >= globalOptions.sizes.lg ? [36, 36] : [25, 25],
      iconAnchor: $(window).width() >= globalOptions.sizes.lg ? [18, 18] : [12.5, 12.5],
      popupAnchor: $(window).width() >= globalOptions.sizes.lg ? [0, -32] : [0, -20],
    });

    return myIcon;
  }

  // Генерируем содержимое попапа
  function popupContent (data) {
    let html = `
      <div class="map-popup">
        <div class="map-popup__head">
          <p class="map-popup__address">${data.address}</p>
          <div class="map-popup__image">
            <img src="${data.logo}" alt="${data.name}"/>
          </div>
        </div>
        
        <a href="#" class="map-popup__button">Проложить маршрут</a>
        <a href="#" class="map-popup__button">Выбрать этот магазин</a>  
      </div>
    `;

    return html;
  }

  // Маркеры и кластеры
  const markers = L.markerClusterGroup({
    maxClusterRadius: 80,
  });

  $.getJSON('assets/json/shops.json', function (json) {
    let objects = json;
    let placesArray = [];

    $.each(objects, function (i) {
      markers.addLayer(L.marker([objects[i]["lat"], objects[i]["lng"]], {icon: myIconGenerator(objects[i]["primary"])}).bindPopup(popupContent(objects[i])));

      placesArray.push([objects[i]["lat"], objects[i]["lng"]]);
      map.fitBounds(placesArray);
    });
  });

  map.addLayer(markers);

  // Локация
  L.control.locate({
    position: 'bottomright',
  }).addTo(map);
}
/* eslint-enable */
