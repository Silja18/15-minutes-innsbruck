// Kartenhintergründe der basemap.at definieren
let baselayers = {
    highdpi: L.tileLayer.provider("BasemapAT.highdpi"),
    ortho_overlay: L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ]),
};


// Karte initialisieren
let map = L.map("map", {
    center: [47.267222, 11.392778],
    zoom: 12,
    layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    ]
});

// Kartenhintergründe und Overlays zur Layer-Control hinzufügen
let layerControl = L.control.layers({
    "basemap.at hochauflösend": baselayers.highdpi,
    "basemap.at Orthofoto beschriftet": baselayers.ortho_overlay
}, 
)
.addTo(map);

L.geoJSON(WISH, {
pointToLayer: function (feature, latlng) {
    return L.marker(latlng);
}
}).addTo(map);



/* function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.stadtteil) {
        layer.bindPopup(`
        <h2>Stadtteil: ${feature.properties.stadtteil}</h2>
        <p>Vorschlag: ${feature.properties.wish}</p>
        `);
    }
}
*/


// Leaflet hash einfügen
new L.Hash(map);