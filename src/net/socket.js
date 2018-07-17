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

  send (msg) {
    this.wss.onopen = function() {
      this.send(msg);
    };
  }

  message (f) {
    this.wss.onmessage = function(evt) {
      f(evt.data);
    };
  }
}

export default new WSocket();