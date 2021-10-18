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

// Overlay zur Layer Control hinzufügen
let layerControl = L.control.layers({
    "Daseinsvorsorge": overlays.dasein,
}).addTo(map);

// Overlays nach dem Laden anzeigen
overlays.dasein.addTo(map);

// hier weiter machen um Daseinsvorsorge Daten zu visualisieren
let drawDasein = (geojsonData) => {
    L.geojsonData(geojsonData), {
        onEachFeauture: (feature, layer) => {
            layer.bindPopup(`<strong>${feature.properties.LINE_NAME}</strong>
            <hr>
            `)
        }
    }
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
