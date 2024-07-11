const exress = require('express');
const app = exress();
const http = require('http');
const server = http.createServer(app);
const port = 3004
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected with id ' + socket.id);;
    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        socket.emit('message', msg);
        socket.emit("message", "hey client");
        
        socket.on('greet', msg => console.log(msg))

    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});