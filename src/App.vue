<style>
  @import "./assets/font/iconfont.css";
</style>
<style lang="less" scoped>
  @import "./assets/css/app";
</style>

<template>
  <div id="app">
    <main class="main">
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
                <div class="name">猫猫</div>
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
              <template v-for="x in 'abcdefghijklmnopqrstyvwxyz'">
                <ChatItem>野人{{x}}号</ChatItem>
              </template>
            </div>
          </div>
        </div>
        <div class="chat-box">
          <router-view/>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import ChatItem from '@/components/ChatItem'
import ws from '@/net/socket'

export default {
  name: 'App',
  components: {
    ChatItem: ChatItem
  },

  mounted() {
    
  }
}
</script>
