<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/css/chat_area";
</style>

<template lang="pug">
div.chat-area
  div.box-hd
    div.title {{ $store.state.currentChat.name }}

  div.chat-bd(ref="chatbox")
    div.empty 暂时没有新消息
    div.msg-item.msg-item-left.clearfix(v-for="x in '123'")
      div.nt-item
        img.image(src="@/assets/img/default_hd.jpg")
        div.content 可垃圾咯啦咯啦咯啦咯啦咯啦咯啦咯火辣辣啦啦啦啦啦啦啦啦芭芭拉巴巴爸爸火辣辣啦啦啦啦啦啦啦啦芭芭拉巴巴爸爸
    div.msg-item.msg-item-right.clearfix(v-for="x in '123'")
      div.nt-item
        div.content 可垃圾咯啦可垃圾咯啦咯啦咯啦咯啦咯啦咯啦咯火辣辣啦啦啦啦啦啦啦啦芭芭拉巴巴爸爸火辣辣啦啦啦啦啦啦啦啦芭芭拉巴巴爸爸
        img.image(src="@/assets/img/default_hd.jpg")

  div.m-ft
    ul.tool-tab
      li
        i.iconfont.icon-face
      li
        i.iconfont.icon-cut
      li
        i.iconfont.icon-file
    div.content
      div.input(contenteditable="true" ref="input")

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
    },
    '$store.state.currentChat.who': {
      handler(curVal, oldVal) {
        this._boxToBottom();
      }
    }
  },
  methods: {
    send () {
      let content = this.$refs.input.innerHTML;
      content = content.replace('^\s*','').replace('\s*$', '').substr(0, 200); // max 200
      if (!content) {
        return;
      }
      const conf = {
        to: this.$store.state.currentChat.who, //发送给当前窗口聊天对象
        data: content,
      };
      this.$store.commit('send', conf)
      
    },
    initChatArea () {
      console.log('aaa');
    },
    _boxToBottom () {
      this.$refs.chatbox.scrollTop = this.$refs.chatbox.scrollHeight;
    }
  },
  mounted () {
    this._boxToBottom();
  }
}
</script>
