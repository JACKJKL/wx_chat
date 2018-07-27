const WebSocket = require('ws');

// 用户池
let clientList = {};
//在线用户
let clientLive = [];

const wss = new WebSocket.Server({
  port: 8081,
});

wss.on('connection', connection);
//监听连接 和 信息
function connection(ws) {
  ws.on('message', function incoming(data) {
    /**
     * 接收数据格式 json
     * {
     *   event: reg/msg,
     *   from: uid,
     *   to: uid/all,
     *   username: username,
     *   type: text,
     *   data: data
     * }
     */
    const msg = JSON.parse(data);
    //添加到用户池
    if (msg.event == 'reg') {
      addclientList(ws, msg);
      broadcast(ws, sendFormatMsg(msg, 'reg'));
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
  wss.clients.forEach(function each(client) {
    if (client === ws && client.readyState === WebSocket.OPEN) {
      //发给自己
      if (is_self) {
        client.send( sendFormatMsg(msg) );
      }
    } else {
      client.send( sendFormatMsg(msg) );
    }
  });
}

function sendFormatMsg (msg, event='msg') {
  /**
   * 发送数据格式 json
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

/**
 * 计算存在的用户
 * @return {[type]} [description]
 */
function computeLive() {
  let _temp = [];
  wss.clients.forEach(function each(client) {
    for (let x in clientList) {
      if (clientList[x]['ws'] == client) {
        if(client.readyState === WebSocket.OPEN) {
          _temp.push({
            uid: x,
            username: clientList[x]['username']
          });
        }else {
          delete(clientList[x]);
        }
      }
    }
  });
  clientLive = _temp;
}

/**
 * 在线用户信息分发
 * @return {[type]} [description]
 */
function sendAllLive() {
  const msg = {
    event: 'user',
    from: 'server',
    to: 'all',
    username: 'server',
    type: 'text',
    data: clientLive
  };
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send( sendFormatMsg(msg, 'user') );
    }
  });
}

// 每隔一段时间定时计算在线用户及分发数据
setInterval(computeLive,1000*5);
setInterval(sendAllLive,1000*5);