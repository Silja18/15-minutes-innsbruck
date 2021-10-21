// Kartenhintergründe der basemap.at definieren
let baselayers = {
    standard: L.tileLayer.provider("BasemapAT.basemap"),
    grau: L.tileLayer.provider("BasemapAT.grau"),
    terrain: L.tileLayer.provider("BasemapAT.terrain"),
    surface: L.tileLayer.provider("BasemapAT.surface"),
    highdpi: L.tileLayer.provider("BasemapAT.highdpi"),
    ortho_overlay: L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ]),
};

// Overlay für Punkte zur Daseinsvorsorge
let overlays = {
    dasein: L.featureGroup()
};

// Karte initialisieren
let map = L.map(`map`, {
    center: [47.267222, 11.392778],
    zoom: 12,
    layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    ]
})

// Kartenhintergründe und Overlays zur Layer-Control hinzufügen
let layerControl = L.control.layers({
    "basemap.at Standard": baselayers.standard,
    "basemap.at grau": baselayers.grau,
    "basemap.at Relief": baselayers.terrain,
    "basemap.at Oberfläche": baselayers.surface,
    "basemap.at hochauflösend": baselayers.highdpi,
    "basemap.at Orthofoto beschriftet": baselayers.ortho_overlay
}, {
    "Daseinsvorsorge": overlays.dasein,
}).addTo(map);


// Overlays nach dem Laden anzeigen
overlays.dasein.addTo(map);

// hier weiter machen um Daseinsvorsorge Daten zu visualisieren
let drawDasein = (geojsonData) => {
    L.geojsonData(geojsonData, { //geoJSON Aufruf von leaflet Bibliothek
        onEachFeauture: (feature, layer) => {
            layer.bindPopup(`<strong>${feature.properties.NAME}</strong>
            <hr>
            Station: ${feature.properties.Name}
            `)
        },
        pointToLayer: (geoJSONPoint, latlng,) =>
        {
            return L.marker(latlng, {
                icon: L.icon({
                    iconUrl: `icons/welfareroom.png`,
                    iconSize: [38,38]
                })
            })
        },
        attribution: `<a href="://data-tiris.opendata.arcgis.com/search?tags=US">Land Tirol</a>`
    }).addTo(overlays.dasein);
}

for (let config of OGDTIROL) {
    fetch(config.data)
    .then(response => response.json())
    .then(geojsonData => {
        if (config.title == "Daseinsvorsorge Innsbruck") {
            drawDasein(geojsonData);
        }
    })
}

// Leaflet hash einfügen
new L.Hash(map);

//Reachability plugin und Intervalle stylen
let styleIntervals = (feature) => {
    let color = "";
    let range = feature.properties.Range;
    if (feature.properties.Measure === "time") {
        color = COLORS.minutes[range];
    } else if (feature.properties.Measure === "distance") {
        color = COLORS.kilometers[range];
    } else {
        color = "black";
    }
    return {
        color: color,
        opacity: 0.5,
        fillOpacity: 0.2
    }; 
};

L.control.reachability({
    // add settings/options here
    apiKey: '5b3ce3597851110001cf6248b8d6b6ede5124788bbc04a5ceb51108f',
    styleFn: styleIntervals,
    drawButtonContent: '',
    drawButtonStyleClass: 'fa fa-pencil-alt fa-2x',
    deleteButtonContent: '',
    deleteButtonStyleClass: 'fa fa-trash fa-2x',
    distanceButtonContent: '',
    distanceButtonStyleClass: 'fa fa-road fa-2x',
    timeButtonContent: '',
    timeButtonStyleClass: 'fa fa-clock fa-2x',
    travelModeButton1Content: '',
    travelModeButton1StyleClass: 'fa fa-car fa-2x',
    travelModeButton2Content: '',
    travelModeButton2StyleClass: 'fa fa-bicycle fa-2x',
    travelModeButton3Content: '',
    travelModeButton3StyleClass: 'fa fa-male fa-2x',
    travelModeButton4Content: '',
    travelModeButton4StyleClass: 'fa fa-wheelchair fa-2x'
}).addTo(map);
