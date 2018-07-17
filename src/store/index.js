import Vue from 'vue'
import Vuex from 'vuex'
import ws from '@/net/socket'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      username: 'uu',
      uid: 'uid'
    }
  },
  mutations: {
    initConn (state, callback) {
      ws.open(JSON.stringify(state.user));
      ws.message(callback);
    }
  }
});

export default store;
