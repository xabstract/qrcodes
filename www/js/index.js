



var resultDiv;
var socket;

document.addEventListener("deviceready", init, false);
function init() {
    
    //socket = io.connect('http://192.168.0.4:3000');
    socket = io.connect('http://10.100.0.29:3000');
        socket.on('connect', function() {
        socket.on('scanQR', function(text) {
            startScan();
        });
    });
    
/*    var server = require('http').createServer();
    var io = require('socket.io')(server);

    io.sockets.on('connection', function (socket) {
        console.log('socket connected');

        socket.on('disconnect', function () {
            console.log('socket disconnected');
        });

        socket.emit('text', 'wow. such event. very real time.');
    });

    server.listen(3000);
    
    socket.on('connect', function() {
      socket.on('text', function(text) {
        alert(text);
       });
     });
*/

    document.querySelector("#startScan").addEventListener("touchend", startScan, false);
    resultDiv = document.querySelector("#results");
    

}

function startScan() {

    cordova.plugins.barcodeScanner.scan(
        function (result) {
            var s = "Result: " + result.text + "<br/>" +
            "Format: " + result.format + "<br/>" +
            "Cancelled: " + result.cancelled;
            resultDiv.innerHTML = s;
            if(confim("enviar codigo QR:"+s)){
                socket.emit('scanned',result.text);
            }
        },
        function (error) {
            alert("Scanning failed: " + error);
        }
    );

}