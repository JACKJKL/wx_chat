<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/css/chat_area";
</style>

<template lang="pug">
div.chat-area
  div.box-hd
    div.title {{ $store.state.currentChat.name }}

  div.chat-bd
    div.msg-item.clearfix(v-for="x in '123'")
      div 今天天气如何

  div.m-ft
    ul.tool-tab
      li
        i.iconfont.icon-face
      li
        i.iconfont.icon-cut
      li
        i.iconfont.icon-file
    div.content
      div.input(contenteditable="true")
        img(src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3062734635,4183904616&fm=96")

    div.action
      span.notice 按ctrl+enter发送
      a.u-send(href="javascript:void(0)" @click="send") 发送
</template>

<script>
import ws from '@/net/socket'
export default {
  name: 'ChatArea',
  data () {
    return {
    }
  },
  watch: {
    '$store.state.mask':{
      handler(curVal,oldVal){
        //监听变量变化，发送请求
        this.initChatArea();
      },
      deep:true
    }
  },
  methods: {
    send () {
      const conf = {
        to: this.$store.state.currentChat.who, //发送给当前窗口聊天对象
        data: 'hahaha '+ Number(new Date()),
      };
      this.$store.commit('send', conf)
    },
    initChatArea () {
      console.log('aaa');
    }
  },
  mounted () {
  }
}
</script>
