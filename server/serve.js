const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 8081,
});

wss.on('connection', connection);

function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send(`received:${message}`);
  });

  ws.send('connection success');
}