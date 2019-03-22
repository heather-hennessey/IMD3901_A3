
const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO  = require('socket.io')(server); //hello I am new

const LISTEN_PORT = 8080; //make sure greater than 3000. Some ports are reserved/blocked by firewall ...

app.use((express.static(__dirname + '/public'))); //set root dir to the public folder

//routes
app.get('/', function(req,res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/mobile', function(req,res) {
    res.sendFile(__dirname + '/public/remote.html');
});

app.get('/desktop', function(req,res) {
    res.sendFile(__dirname + '/public/active.html');
});

//websocket stuff
socketIO.on('connection', function(socket) {
    console.log(socket.id + ' has connected!');

    socket.on('disconnect', function(data) {
        console.log(socket.id + ' has disconnected');
    });

    socket.on('compGame', function(data) {
        console.log('COMPETE');
        socket.broadcast.emit('remoteScreen', data);

    });
    socket.on('collabGame', function(data) {
        console.log('COLLAB');
        socket.broadcast.emit('activeScreen', data);

    });
    //custom events
    //socket = one client
    //socketIO.sockets = all clients
    socket.on('needSmallShape', function(data) {
        console.log('Small Shape Requested');
        socket.broadcast.emit('requestSmall', data);
    });
    socket.on('needMedShape', function(data) {
        console.log('Med Shape Requested');
        socketIO.sockets.emit('requestMed', data);
    });
    socket.on('needBigShape', function(data) {
        console.log('Big Shape Requested');
        socketIO.sockets.emit('requestBig', data);
    });
    socket.on('newShape', function(data) {
        console.log('Shape Created');
        socketIO.sockets.emit('appendShape', data);
    });
    socket.on('complete', function(data) {
        console.log('Completed Drawing');
        socketIO.sockets.emit('recreate', data);
    });
 

});

//finally, start server
server.listen(LISTEN_PORT);
console.log('listening to port: ' + LISTEN_PORT);