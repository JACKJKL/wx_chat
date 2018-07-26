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
      ws.message(callback);
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
