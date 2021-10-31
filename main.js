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



// Karte initialisieren
let map = L.map("map", {
    center: [47.267222, 11.392778],
    zoom: 12,
    layers: [
        baselayers.grau
    ]
});

let overlays = {
    ds: L.featureGroup(),
    dazt101:L.featureGroup(),
    dbaekr: L.featureGroup(),
    dbank: L.featureGroup(),
    dflsch: L.featureGroup(),
    dghaus: L. featureGroup(),
    dkindb:L.featureGroup(),
    dlebmt: L.featureGroup(),
    dpoliz: L.featureGroup(),
    dpost1: L.featureGroup(),
    dpost2:L.featureGroup(),
    dpsch1: L.featureGroup(),
    dpsch2: L.featureGroup(),
    dpsch3: L.featureGroup(),
    dpsch4: L.featureGroup(),
    dpsch5:L.featureGroup(),
    dpsch6: L.featureGroup(),
    dpsch7: L.featureGroup(),
    dpsch9:L.featureGroup(),
    dtanks: L.featureGroup(),
}

// Kartenhintergründe und Overlays zur Layer-Control hinzufügen
let layerControl = L.control.layers({
    "basemap.at Standard": baselayers.standard,
    "basemap.at grau": baselayers.grau,
    "basemap.at Relief": baselayers.terrain,
    "basemap.at Oberfläche": baselayers.surface,
    "basemap.at hochauflösend": baselayers.highdpi,
    "basemap.at Orthofoto beschriftet": baselayers.ortho_overlay
}, {
    "Daseinsvorsorge": overlays.ds,
    "AHS - Allgemeinbildende Höhere Schule": overlays.dpsch5,
    "Arzt Allgemeinmedizin": overlays.dazt101,
    "Bäckerei": overlays.dbaekr,
    "Bank, Sparkasse": overlays.dbank,
    "Fleischhauerei": overlays.dflsch,
    "Gasthaus": overlays.dghaus,
    "Kinderbetreuung": overlays.dkindb,
    "Lebensmittelhandel": overlays.dlebmt,
    "Polizei": overlays.dpoliz,
    "Posteinrichtung- Postamt": overlays.dpost1,
    "Posteinrichtung - Post-Partner": overlays.dpost2,
    "Pflichtschule - Volksschule": overlays.dpsch1,
    "Pflichtschule - Neue Mittelschule": overlays.dpsch2,
    "Pflichtschule - Sonderschule": overlays.dpsch3,
    "Pflichtschule - Polytechnische Schule": overlays.dpsch4,
    "AHS - Allgemeinbildende Höhere Schule": overlays.dpsch5,
    "BHS - Berufsbildende Höhere Schule HAK / HTL": overlays.dpsch6,
    "Fachberufsschule": overlays.dpsch7,
    "Sonstige Schule": overlays.dpsch9,
    "Tankstelle mit Shop": overlays.dtanks,
}).addTo(map);

// Overlays nach dem Laden anzeigen
overlays.ds.addTo(map);

// icon einfügen
var welfare = L.icon({
    iconUrl: 'welfareroom.png',
    iconSize: [20,20],
    iconAnchor: [10,10],
    popupAnchor: [0,0]
}); 
 // hier weiter machen um Daseinsvorsorge Daten zu visualisieren 
 
 var marker = (function () {
     for (let index = 0; index < DASEINSVORSORGE.length; index++) {
         let marker = L.marker([DASEINSVORSORGE[index]. lat, DASEINSVORSORGE[index].lon], {
             icon: welfare
         })
         marker.bindPopup(`
         <h2>${DASEINSVORSORGE[index].OBJEKTBEZEICHNUNG} </h2>)
         <p>${DASEINSVORSORGE[index].NAME}</p>
         <p>${DASEINSVORSORGE[index].STR}</p>`)
     }
 }).addTo(overlays.ds)


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
