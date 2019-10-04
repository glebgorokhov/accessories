/* eslint-disable */
// http://leafletjs.com
// Для кластеров использовать: https://github.com/Leaflet/Leaflet.markercluster
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.locatecontrol';

const $ = window.$;

export function maps() {
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
  function popupContent(data) {
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

  // Функция разметки списка магазинов
  const
    shopsBlock = $(document).find('.search-results__shops');

  function shopCard(data, id) {
    const html = `
      <div class="shops__item">
          <p class="shops__title">${data.address}</p>
          <button class="shops__map-button" type="button" data-show-on-map-id="${id}">
            <svg><use xlink:href="assets/images/icon.svg#icon_shops"></use></svg>
            <p>Показать на карте</p>
          </button>
          <div class="shops__image"><img src="${data.logo}" alt="${data.address}"></div>
      </div>
    `;

    return html;
  }

  // Маркеры и кластеры
  const markers = L.markerClusterGroup({
    maxClusterRadius: 80,
  });

  let placesArray = [];

  function loadShopsForUrl(url) {
    $.getJSON(url, function (json) {
      let objects = json;

      // Очищаем все массивы, слои и т.д.
      placesArray = [];
      markers.clearLayers();
      shopsBlock.html('');

      // Добавляем всё на карту и в список
      $.each(objects, function (i) {
        markers.addLayer(L.marker([objects[i]["lat"], objects[i]["lng"]], {icon: myIconGenerator(objects[i]["primary"])}).bindPopup(popupContent(objects[i])));
        shopsBlock.append(shopCard(objects[i], i));
        placesArray.push([objects[i]["lat"], objects[i]["lng"]]);
        map.fitBounds(placesArray);
      });
    });

    map.addLayer(markers);

    console.log('Подгружены карта и список для URL: ' + url);
  }

  loadShopsForUrl($(document).find('[data-default-url]').data('default-url'));

  // Открываем маркер по клику на ссылку
  $(document).on('click', '[data-show-on-map-id]', function () {
    $(document).find('.search-results__tabs .tabs__tab[data-tab-target="map"]')[0].click();
    map.flyTo(markers.getLayers()[$(this).data('show-on-map-id')]._latlng, 16, {
      duration: .5,
    });

    setTimeout(() => {
      markers.getLayers()[$(this).data('show-on-map-id')].openPopup();
    }, 550);
  });

  // Локация
  L.control.locate({
    position: 'bottomright',
  }).addTo(map);

  // ####################################
  // Работа поля поиска
  // Клик по товару
  $(document).on('click', '.search-form__item', function () {
    const
      id = $(this).data('product-id'),
      url = $(document).find('[data-url-for-loading-shops]').data('url-for-loading-shops') + id;

    loadShopsForUrl(url);
  });
}

/* eslint-enable */
