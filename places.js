// Kartenhintergründe der basemap.at definieren
let baselayers = {
    highdpi: L.tileLayer.provider("BasemapAT.highdpi"),
    ortho_overlay: L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ]),
};

// Overlays für Kategorien zum Ein- und Ausschalten
let overlays = {
    FussRad: L.featureGroup(),
    Rad: L.featureGroup(),
    Fuss: L.featureGroup()
};

// Karte initialisieren
let map = L.map("map", {
    center: [47.267222, 11.392778],
    zoom: 12,
    layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'  
        })
    ]
});

// Kartenhintergründe und Overlays zur Layer-Control hinzufügen
let layerControl = L.control.layers({
    "basemap.at hochauflösend": baselayers.highdpi,
    "basemap.at Orthofoto beschriftet": baselayers.ortho_overlay
}, {
    "Vorschläge Fuß und Rad": overlays.FussRad,
    "Vorschläge Radfahren": overlays.Rad,
    "Vorschläge Gehen": overlays.Fuss
}
)
.addTo(map);

// alle Overlays nach dem Laden zeigen

overlays.FussRad.addTo(map);
overlays.Rad.addTo(map);
overlays.Fuss.addTo(map);

// Fuß und Raffahren Layer
L.geoJSON(FUSSRAD).addTo(overlays.FussRad);

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.Dokumentname) {
        layer.bindPopup(`<h2>${feature.properties.Dokumentgruppe}</h2>
        <h3>Kategorie:</h3>${feature.properties.Kategorie}
        <h3>Wunsch:</h3> ${feature.properties.Segment}`);
    }
}

L.geoJSON(FUSSRAD, {
    onEachFeature: onEachFeature
}).addTo(overlays.FussRad);

// Radfahren Layer
L.geoJSON(RAD).addTo(overlays.Rad);

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.Dokumentname) {
        layer.bindPopup(`<h2>${feature.properties.Dokumentgruppe}</h2>
        <h3>Kategorie:</h3>${feature.properties.Kategorie}
        <h3>Wunsch:</h3> ${feature.properties.Segment}`);
    }
}

L.geoJSON(RAD, {
    onEachFeature: onEachFeature
}).addTo(overlays.Rad);

// Fuß Layer

L.geoJSON(FUSS).addTo(overlays.Fuss);

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.Dokumentname) {
        layer.bindPopup(`<h2>${feature.properties.Dokumentgruppe}</h2>
        <h3>Kategorie:</h3>${feature.properties.Kategorie}
        <h3>Wunsch:</h3> ${feature.properties.Segment}`);
    }
}

L.geoJSON(FUSS, {
    onEachFeature: onEachFeature
}).addTo(overlays.Fuss);


/*let drawFussRad = (geojsonData) => {
    L.geoJson(geojsonData, {
        onEachFeature: (feature, layer) => {
            layer.bindPopup(`<strong>${feature.properties.Dokumentgruppe}</strong>
            <hr> Wunsch:${feature.properties.Segment}`)
        },
        pointToLayer: (geoJSONPoint, latlng) => {
            return L.marker(latlng,)
        }
    }).addTo(overlays.FussRad);
}*/

/* L.geoJSON(ORTE).addTo(map);

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.Dokumentname) {
        layer.bindPopup(`
        <h2>Stadtteil:</h2> ${feature.properties.Dokumentgruppe}
        <h3>Wunsh:</h3> ${feature.properties.Segment}
        `);
    } 
}

L.geoJSON(ORTE, {
    onEachFeature: onEachFeature
}).addTo(map); */


/* L.geoJSON(WISH).addTo(map);

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.stadtteil) {
        layer.bindPopup(`
        <h2>Stadtteil: ${feature.properties.stadtteil}</h2>
        <p>Vorschlag: ${feature.properties.wish}</p>
        `);
    }
}

L.geoJSON(WISH, {
    onEachFeature: onEachFeature
}).addTo(map); */


// Leaflet hash einfügen
new L.Hash(map);