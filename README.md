# RoSa v2 browser interface

##Javascript and Websockets interface for RoSa v2 http://steim.org/product/rosa/

This project aims to implement the complete specification of control options for RoSa v2 via Javascript/Websockets in order to allow for development of web-based interfaces.

Based on the OSC.js project from Colin Clark https://github.com/colinbdclark/osc.js

The web browser app connects with the nodejs Websocket server to relay messages to OSC via UDP. 

###Default settings in index.js:

Node WebSocket server: 127.0.0.1:8081

    var wss = new WebSocket.Server({
        port: 8081
    });

OSC send and listen ports: 57120 and 8000 (RoSa v2 defaults)

    var udp = new osc.UDPPort({
        localAddress: "127.0.0.1",
        localPort: 8000,
        remoteAddress: "127.0.0.1",
        remotePort: 57120
    });


##Installation

    $ npm install
    $ cd web
    $ npm install bower
    $ bower install

##Running

Start the node server in the base directory where index.js resides

    $ node .

Run web/index.html in the browser e.g. with a Python server and navigate to http://localhost:8080
    
    $ python -m SimpleHTTPServer 8080

You can also just open the index.html file in your web browser

##Try it out

When you have the node server and the index.html file loaded, click on the Setup button. You should see the status in RoSa update to say "osc edit: requested settings for setup to send to host" and the web page will be updated with the received message from RoSa.

![RoSa setup](https://raw.githubusercontent.com/leaves-and-petalz/RoSa-v2-browser-interface/master/files/RoSa.png)

![Message response](https://raw.githubusercontent.com/leaves-and-petalz/RoSa-v2-browser-interface/master/files/setup.png)

