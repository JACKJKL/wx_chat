<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  font-weight: 400;
  font-size: 13px;
  color: #fff;
  line-height: 20px;
}
.current {
  background-color: #3a3f45;
}
.chat-item {
  display: flex;
  height: 40px;
  padding: 12px 18px; 
  cursor: pointer;
  .avatar {
    width: 50px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 3px;
    }
  }
  .name {
    &:extend(.text);
  }
}
</style>

<template lang="pug">
div.chat-item(:class="{current}")
  div.avatar
    img(src="@/assets/img/default_hd.jpg")
  div.name
    slot
</template>

<script>
export default {
  name: 'ChatItem',
  data () {
    return {
      current: false
    }
  },
  computed: {
    
  }
}
</script>
