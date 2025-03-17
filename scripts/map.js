function initMap() {
    const map = new ymaps.Map("map", {
        center: [53.927072, 27.594050], // Координаты ул. Якуба Коласа, дом 28
        zoom: 15
    });

    const placemark = new ymaps.Placemark([53.927072, 27.594050], {
        balloonContent: 'ул. Якуба Коласа, дом 28'
    });

    map.geoObjects.add(placemark);
}

// Функция для загрузки карты после загрузки страницы
function loadMap() {
    ymaps.ready(initMap);
}