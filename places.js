// Kartenhintergründe der basemap.at definieren
let baselayers = {
    highdpi: L.tileLayer.provider("BasemapAT.highdpi"),
    ortho_overlay: L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ]),
};

let overlays = {
    wish: L.featureGroup()
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
}, {
    "Wünsche und Vorschläge": overlays.wish,
}
)
.addTo(map);

overlays.wish.addTo(map);

/* let drawWish = (wish) => {
    L.geoJson(wish, {
        onEachFeature: (feature, layer) => {
            layer.bindPopup(`<strong>${feature.properties.stadtteil}</strong>
            <hr>
            Wunsch: ${feature.properties.wish}`)
        },
        pointToLayer: (geoJsonPoint, latlng) => {
            return L.marker(latlng, {
                icon: L.icon({
                    iconUrl: 'images/icons/welfareroom.png',
                    iconSize: [35, 35]
                })
            })
        }
    }).addTo(overlays.wish);
}
*/
L.geoJSON(WISH).addTo(map);
// 
function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.STADTTEIL) {
    layer.bindPopup(`
    <h2>Stadtteil: ${feature.properties.STADTTEIL}
    <h3>Wunsch: ${feature.properties.WISH} 
    `)}
}

L.geoJSON(WISH, {
    onEachFeature: onEachFeature
}).addTo(map);


/* var marker = (function () {
    for (let index = 0; index < WISH.length; index++) {
        let marker = L.marker([WISH[index].lat, WISH[index].lon],
            )
    marker.bindPopup(`
    <h2>${WISH[index].stadtteil}</h2>
    <p>${WISH[index].wish}</p>
    `)
    .addTo(map)        
    }
})
*/


/* let marker = L.marker([WISH.lat, WISH.long])
marker.bindPopup(`
    <h2>${WISH[index].stadtteil}</h2>
    <p>${WISH[index].wish}</p>
    `)
    .addTo(map) 
*/


// Leaflet hash einfügen
new L.Hash(map);