<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/css/chat_area";
</style>

<template>
  <div class="chat-area">
    <div class="box-hd">
      <div class="title">
        南源
      </div>
    </div>
    <div class="chat-bd">
      <div class="msg-item clearfix" v-for="x in '123'">
        今天天气如何？
      </div>
      <div class="msg-item clearfix">
        还好吧
      </div>
    </div>
    <div class="m-ft">
      <ul class="tool-tab">
        <li><i class="iconfont icon-face"></i></li>
        <li><i class="iconfont icon-cut"></i></li>
        <li><i class="iconfont icon-file"></i></li>
      </ul>
      <div class="content">
        <div class="input" contenteditable="true">
          <img src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3062734635,4183904616&fm=96">
        </div> 
      </div>
      <div class="action">
        <span class="notice">按ctrl+enter发送</span>
        <a href="javascript:void(0)" class="u-send">发送</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatArea',
  data () {
    return {
    }
  }
}
</script>
