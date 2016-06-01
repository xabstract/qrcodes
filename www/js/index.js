



var resultDiv;

document.addEventListener("deviceready", init, false);
function init() {
    
    var server = require('http').createServer();
    var io = require('socket.io')(server);

    io.sockets.on('connection', function (socket) {
        console.log('socket connected');

        socket.on('disconnect', function () {
            console.log('socket disconnected');
        });

        socket.emit('text', 'wow. such event. very real time.');
    });

    server.listen(3000);

    document.querySelector("#startScan").addEventListener("touchend", startScan, false);
    resultDiv = document.querySelector("#results");
    
    socket.on('connect', function() {
      socket.on('text', function(text) {
        alert(text);
       });
     });
}

function startScan() {

    cordova.plugins.barcodeScanner.scan(
        function (result) {
            var s = "Result: " + result.text + "<br/>" +
            "Format: " + result.format + "<br/>" +
            "Cancelled: " + result.cancelled;
            resultDiv.innerHTML = s;
        },
        function (error) {
            alert("Scanning failed: " + error);
        }
    );

}