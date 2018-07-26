const WebSocket = require('ws');

// 用户池
let clientList = {};

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
     *   event: reg/msg,
     *   from: uid,
     *   to: uid,
     *   username: username,
     *   type: text,
     *   data: data
     * }
     */
    const msg = JSON.parse(data);
    //添加到用户池
    if (msg.event == 'reg') {
      addclientList(ws, msg);
      broadcast(ws, msg, true);
    }
    else if (msg.event == 'msg') {
      // 发送
      if (msg.to == 'all') {
        broadcast(ws, msg);
      } else {
        sendUser(msg);
      }
    }
  });
}

//添加到用户池
function addclientList (ws, msg) {
  const uid = {
    ws: ws,
    username: msg.username
  }
  clientList[msg.from] = uid;
}

/**
 * 发送给谁
 * @param  {[type]} msg [description]
 * @return {[type]}     [description]
 */
function sendUser(msg) {

}

/**
 * 广播  貌似用到反射，此处为引用传递
 * @return mixed
 */
function broadcast (ws, msg, is_self=false) {
  msg['event'] = 'msg';
  const _send = '{"event":"msg","from":1531930917619,"to":"all","type":"text","data":"豆豆67号上线啦"}';
  wss.clients.forEach(function each(client) {
    if (client === ws && client.readyState === WebSocket.OPEN) {
      //发给自己
      if (is_self) {
        client.send("{\"a\": 1}");
      }
    } else {
      client.send(_send);
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
  msg.event = event;
  return JSON.stringify(msg);
}