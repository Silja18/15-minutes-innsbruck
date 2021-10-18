// Kartenhintergründe der basemap.at definieren
let baselayers = {
    standard: L.tileLayer.provider("BasemapAT.basemap"),
    terrain: L.tileLayer.provider("BasemapAT.terrain"),
    ortho_overlay: L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ]),
};
// // Overlays für die Themen zum Ein- und Ausschalten definieren
let overlays = {
    busLines: L.featureGroup(),
    busStops: L.markerClusterGroup(),
    pedAreas: L.featureGroup(),
    sights: L.featureGroup()
};

// Karte initialisieren und auf Innsbruck Wikipedia Koordinaten blicken
let map = L.map("map", {
    fullscreenControl: true,
    center: [47.267222, 11.392778],
    zoom: 13,
    layers: [
        baselayers.grau
    ]
});