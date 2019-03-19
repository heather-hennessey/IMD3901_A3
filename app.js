const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO  = require('socket.io')(server); //hello I am new

const LISTEN_PORT = 8080; //make sure greater than 3000. Some ports are reserved/blocked by firewall ...

app.use((express.static(__dirname + '/public'))); //set root dir to the public folder

//routes
app.get('/mobile', function(req,res) {
    res.sendFile(__dirname + '/public/mobile.html');
});

app.get('/desktop', function(req,res) {
    res.sendFile(__dirname + '/public/desktop.html');
});

//websocket stuff
socketIO.on('connection', function(socket) {
    console.log(socket.id + ' has connected!');

    socket.on('disconnect', function(data) {
        console.log(socket.id + ' has disconnected');
    });

    //custom events
    //socket = one client
    //socketIO.sockets = all clients
    socket.on('objUnavailble', function(data) {
        console.log('Got to sockets');
        socketIO.sockets.emit('unavailable', data);
    });
    socket.on('objAvailble', function(data) {
        socketIO.sockets.emit('available', data);
    });
});

//finally, start server
server.listen(LISTEN_PORT);
console.log('listening to port: ' + LISTEN_PORT);