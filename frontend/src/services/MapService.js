var map

function initMap() {
    map = new google.maps.Map(document.querySelector('.map'), {
        center: {
            lat: 29.55805,
            lng: 34.94821
        },
        zoom: DEFAULT_ZOOM
    });

    map.addListener('click', onMapCoordClick);

    gMarker = new google.maps.Marker({
        position: {
            lat: 29.55805,
            lng: 34.94821
        },
        map: map,
    });
}