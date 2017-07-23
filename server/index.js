var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = 6677;

app.use(express.static('client'));

app.get('/hola-mundo', function(req, res) {
    res.status(200).send('Hola mundo desde una ruta');
});

var messages = [{
    id: 1,
    text: 'Bienvenido al chat privado de Socket.IO y NodeJS',
    nickname: 'Bot - fdfdev@outlook.com'
}];

io.on('connection', function(socket) {
    console.log("El nodo " + socket.handshake.address + " se ha conectado");

    socket.emit('messages', messages);

    socket.on('add-message', function(data) {
        messages.push(data);
        socket.emit('messages', messages);
    });

});



server.listen(port, function() {
    console.log('Servidor está funcionando el puerto ' + port);
});
