const defaultData = {
  is_new: false,
  type: "text"
}

class WSocket {
  wss;

  constructor() {
    if (! "WebSocket" in window) {
      alert("您的浏览器不支持 WebSocket!");
    }
    try {
      this.wss = new WebSocket("ws://localhost:8081");
    } catch( err ) {
      alert('连接服务器失败');
    }
  }

  open (user) {
    user['is_new'] = true;
    user['to'] = 'all';
    user['data'] = user.username + '上线啦';
    user = Object.assign(defaultData, user);
    this.wss.onopen = function() {
      this.send(JSON.stringify(user));
    };
  }

  message (f) {
    this.wss.onmessage = function(evt) {
      f(evt.data);
    };
  }
  
  send (msg) {
    this.wss.send(msg);
  }

}

export default new WSocket();