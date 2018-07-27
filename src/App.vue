<style>
  @import "./assets/font/iconfont.css";
</style>
<style lang="less" scoped>
  @import "./assets/css/app";
</style>

<template>
  <div id="app">
    <div id="mask" v-if="$store.state.mask">
      <div class="panel">
        <div>快帮自己取个名字吧。</div>
        <div><input type="text" v-model="$store.state.user.username" maxlength="6" ></div>
        <div class="ok"><span @click="ok">确定</span></div>
      </div>
    </div>
    <div class="main">
      <div class="main-inner">
        <!-- 左边栏 -->
        <div class="sd">
          <!-- 头部 -->
          <div class="m-hd">
            <div class="header">
              <div class="avatar">
                <img src="@/assets/img/default_hd.jpg">
              </div>
              <div class="info">
                <div class="name">{{ $store.state.user.username }}</div>
                <div class="menu">
                  <i class="iconfont icon-menu"></i>
                </div>
              </div>
            </div>
            <div class="search">
              <i class="iconfont icon-sousuo u-search"></i>
              <input type="text" placeholder="搜索">
            </div>
            <ul class="m-tab">
              <li class="current">
                <i class="iconfont icon-liaotian"></i>
              </li>
              <li>
                <i class="iconfont icon-yuedu"></i>
              </li>
              <li>
                <i class="iconfont icon-tongxunlu"></i>
              </li>
            </ul>
          </div>
          <!-- 列表 -->
          <div class="m-lst-box topnav_box">
            <div class="m-lst">
              <template>
                <ChatItem @click.native="tapChat('all', '群聊')">群聊</ChatItem>
              </template>
              <template v-for="x in $store.state.userList" v-if="x.uid != $store.state.user.uid">
                <ChatItem @click.native="tapChat(x.uid, x.username)">{{ x.username }}</ChatItem>
              </template>
            </div>
          </div>
        </div>
        <div class="chat-box">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatItem from '@/components/ChatItem'

export default {
  name: 'App',
  components: {
    ChatItem: ChatItem
  },

  methods: {
  },
  mounted () {
    //初始化用户信息
    let user = localStorage.user;
    if (user) {
      this.$store.state.user = JSON.parse(user);
    } else {
      this.$store.state.user.uid = Number(new Date());
    }
  },
  methods : {
    ok () {
      this.$store.state.user.username = this.$store.state.user.username.replace(' ','').replace('　', '');
      if (this.$store.state.user.username == '') {
        return;
      }
      const u = {
        'uid': this.$store.state.user.uid,
        'username': this.$store.state.user.username
      }
      localStorage.user = JSON.stringify(u);
      // 初始化连接信息与接收
      this.$store.commit('initConn', function(msg) {
        console.log(msg);
      })
      this.$store.state.mask = false;
    },

    tapChat (who, name) {
      this.$store.state.currentChat = {
        who: who,
        name: name
      }
    }
  }
}
</script>
