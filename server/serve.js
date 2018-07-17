const WebSocket = require('ws');

// 用户池
let clientList = [];

const wss = new WebSocket.Server({
  port: 8081,
});

wss.on('connection', connection);
function connection(ws) {
  ws.on('message', function incoming(data) {
    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
      //添加到用户池
      if (client === ws && client.readyState === WebSocket.OPEN) {
        // json 为新加入用户？
        if (isJson(data)) {
          const u = isJson(data);
          ws.username = u.username;
          clientList.push(ws);
        }
        //发给自己
        ws.send('myself');
      } else {
        //发给其他人
        client.send(data);
      }
    });
  });
}

// 广播.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

function isJson (str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return false;
  }
}