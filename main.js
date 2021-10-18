const map = L.map("map", {
    fullscreenControl: true,
    center: [ stop.lat, stop.lng ], 
    zoom: 13,
    layers: [
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
    ]
});
