var map = L.map(`map`, {
    center: [47.267222, 11.392778],
    zoom: 25,
    layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    ]
})