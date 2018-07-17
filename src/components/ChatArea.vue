<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/css/chat_area";
</style>

<template lang="pug">
  div.chat-area
    div.box-hd
      div.title 南源

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
        a.u-send(href="javascript:void(0)") 发送
</template>

<script>
import ws from '@/net/socket'
export default {
  name: 'ChatArea',
  data () {
    return {
    }
  },
  mounted () {
    ws.send('123');
    ws.message((m)=>{
      console.log('收到的信息'+m)
    })
  }
}
</script>
