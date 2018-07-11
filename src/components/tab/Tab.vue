<template>
  <footer class="footer_guide">
    <span class="guide_item" :class="{on: '/home'===$route.path}" @click="goTo('/home')">
      <span class="item_icon">
        <i class="glyphicon glyphicon-home"></i>
      </span>
      <span>主页</span>
    </span>
    <span class="guide_item" :class="{on: '/list'===$route.path}" @click="goTo('/list')">
      <span class="item_icon">
        <i class="glyphicon glyphicon-th-list"></i>
      </span>
      <span>列表</span>
    </span>
    <span class="guide_item" :class="{on: '/other'===$route.path}" @click="goTo('/other')">
      <span class="item_icon">
        <i class="glyphicon glyphicon-edit"></i>
      </span>
      <span>其他</span>
    </span>
    <span class="guide_item" :class="{on: '/my'===$route.path}" @click="goTo('/my')">
      <span class="item_icon">
        <i class="glyphicon glyphicon-user"></i>
      </span>
      <span>我的</span>
    </span>
  </footer>
</template>

<script>
export default {
  methods:{
    goTo (path) {
      this.$router.replace(path)
    }
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import '~common/stylus/mixins.styl'
  .footer_guide  //footer
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #02a774
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px
</style>