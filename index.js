//--------------------------------------------------
//  Bi-Directional OSC messaging Websocket <-> UDP
//--------------------------------------------------
var osc = require("osc"),
    WebSocket = require("ws");

var getIPAddresses = function () {
    var os = require("os"),
    interfaces = os.networkInterfaces(),
    ipAddresses = [];

    for (var deviceName in interfaces){
        var addresses = interfaces[deviceName];

        for (var i = 0; i < addresses.length; i++) {
            var addressInfo = addresses[i];

            if (addressInfo.family === "IPv4" && !addressInfo.internal) {
                ipAddresses.push(addressInfo.address);
            }
        }
    }

    return ipAddresses;
};

var udp = new osc.UDPPort({
    localAddress: "127.0.0.1",
    localPort: 8000,
    remoteAddress: "127.0.0.1",
    remotePort: 57120
});

udp.on("ready", function () {
    var ipAddresses = getIPAddresses();
    console.log("Listening for OSC over UDP.");
    ipAddresses.forEach(function (address) {
        console.log(" Host:", address + ", Port:", udp.options.localPort);
    });
    console.log("Broadcasting OSC over UDP to", udp.options.remoteAddress + ", Port:", udp.options.remotePort);

/*
    udp.send({
    timeTag: osc.timeTag(1), // Schedules this bundle 60 seconds from now.
    packets: [
        {
            address: "/rse/setup/request",
            args: 1
        }
        ]
    });
*/

});


udp.on("message", function () {
    console.log("MESSAGE RECEIVED");
});

udp.open();

var wss = new WebSocket.Server({
    port: 8081
});

wss.on("connection", function (socket) {
    console.log("A Web Socket connection has been established!");
    var socketPort = new osc.WebSocketPort({
        socket: socket
    });


    var relay = new osc.Relay(udp, socketPort, {
        raw: true
    });

    console.log("relay",relay);
});


wss.on("message", function (data) {
    console.log("message",data);
});

wss.on("close", function() {
    console.log("client has left");
});



