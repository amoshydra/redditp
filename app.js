var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/js', express.static(__dirname + '/js'));


// respond with "hello world" when a GET request is made to the homepage
app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  var d = new Date()
  var socketId = socket.id;
  var clientIp = socket.client.request.headers['x-forwarded-for'] || socket.request.connection.remoteAddress;
  console.log(d.toLocaleString() + ": Connected " + clientIp + " (" + socketId + ")");

  socket.on('start animation', function(imageIndex){
    io.emit('start animation', imageIndex);
  });
  socket.on('prev slide', function(){
    io.emit('prev slide');
  });
  socket.on('hasNewConnection', function(path){
    io.emit('hasNewConnection', path);
  });
});

var port = process.env.PORT || 3031;
//app.set('port', port);

http.listen(port, function () {
    console.log('Listening on port: ' + port);
});
