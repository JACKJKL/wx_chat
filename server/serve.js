const WebSocket = require('ws');

// 用户池
let clientList = [];

const wss = new WebSocket.Server({
  port: 8081,
});

wss.on('connection', connection);
//监听连接 和 信息
function connection(ws) {
  ws.on('message', function incoming(data) {
    /**
     * 数据格式 json
     * {
     *   is_new： false,
     *   from: uid,
     *   to: uid,
     *   username: username,
     *   type: text,
     *   data: data
     * }
     */
    const msg = JSON.parse(data);
    console.log(msg);
    //添加到用户池
    if (msg.is_new) {
      addclientList(ws, msg);
    }

    // 发送
    if (msg.to == 'all') {
      broadcast(ws, msg);
    } else {
      sendUser(msg);
    }
  });
}

//添加到用户池
function addclientList (ws, msg) {
  const uid = {
    ws: ws,
    username: msg.username
  }
  clientList[msg.uid] = uid;
}

/**
 * 发送给谁
 * @param  {[type]} msg [description]
 * @return {[type]}     [description]
 */
function sendUser(msg) {

}

/**
 * 广播 除了自己
 * @return mixed
 */
function broadcast (ws, msg) {
  wss.clients.forEach(function each(client) {
    if (client === ws && client.readyState === WebSocket.OPEN) {
      for (let x in clientList) {
        console.log(x);
      }
      //发给自己
      ws.send('myself');
    } else {
      //发给其他人
      client.send(sendFormatMsg(msg));
    }
  });
}

function sendFormatMsg (msg, event='msg') {
  /**
   * 数据格式 json
   * {
   *   event: 'msg',
   *   from: uid,
   *   to: uid,
   *   username: username,
   *   type: text,
   *   data: data
   * }
   */
  delete(msg.is_new);
  msg.event = event;
  return JSON.stringify(msg);
}