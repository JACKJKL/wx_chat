import Vue from 'vue'
import Vuex from 'vuex'
import ws from '@/net/socket'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      username: '',
      uid: ''
    },
    userList: [],
    currentChat: {
      who: 'all',
      name: '群聊'
    },
    mask: true
  },
  mutations: {
    initConn (state, callback) {
      const u = {
        event: 'reg',
        from: state.user.uid,
        username: state.user.username,
        to: 'all',
        data: state.user.username + '上线啦'
      }
      ws.open(u);
      ws.message((msg)=>{
        msg = JSON.parse(msg);
        if (msg.event == 'msg') {
          // 消息
          callback(msg);
        }
        else if (msg.event == 'user') {
          //用户列表信息
          if (state.userList != msg.data) {
            state.userList = msg.data;
          }
          
        }
      }); 
    },

    send (state, conf) {
      let _conf = {
        event: 'msg',
        from: state.user.uid,
        username: state.user.username,
        to: 'all',
        data: ''
      };
      _conf = Object.assign(_conf, conf);
      ws.send(_conf);
    }
  }
});

export default store;
