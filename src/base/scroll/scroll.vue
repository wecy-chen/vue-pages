<template>
  <div ref="wrapper" class="scroll">
      <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  export default {
    name:'scroll',
    props: {
      probeType: { //默认1,2,3,有时候我们需要知道滚动的位置,派发滑动事件
        type: Number,
        default: 1
      },
      click: { // 点击
        type: Boolean,
        default: true
      },
      listenScroll: { //监听滚动事件
        type: Boolean,
        default: false
      },
      listData: { // 数据动态变化
        type: Array,
        default: null
      },
      scrollbar: { //滑动条
        type: null,
        default: false
      },
      beforeScroll: { //滚动之前
        type: Boolean,
        default: false
      },
      refreshDelay: { //刷新的时间
        type: Number,
        default: 20
      },
      pullUpLoad: { //上拉加载
        type: null,
        default: false
      },
      pullDownRefresh: { //下拉刷新
        type: null,
        default: false
      },
      startY: { //记录Y值
        type: Number,
        default: 0
      },
    },
    mounted() {
      setTimeout(() => { //确保DOM的渲染
        this._initScroll() //初始化方法
      }, 20)
    },
     destroyed() {
      this.$refs.scroll && this.$refs.scroll.destroy()
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) { 
          return
        }
        //参数
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,//滑动速度监听 1
          click: this.click, //true
          scrollbar: this.scrollbar, //滑动条
          pullUpLoad: this.pullUpLoad,//上拉加载
          pullDownRefresh: this.pullDownRefresh,//上刷新
          startY: this.startY,// Y值
        })

        if (this.listenScroll) {//监听滚动事件
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos) //派发scroll事件 拿到位置
          })
        }

        if (this.pullUpLoad) {
          this._initPullUpLoad() //加载更多
        }
         if (this.pullDownRefresh) {
          this._initPullDownRefresh() //下拉刷新
        }

        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() { //关
        this.scroll && this.scroll.disable()
      },
      enable() { //开
        this.scroll && this.scroll.enable()
      },
      refresh() { //刷新
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {//滚动到
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {// 滚动到DOM元素
        this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
      },
      destroy(){
         this.scroll &&this.scroll.destroy()
      },
      _initPullUpLoad() { //加载更多
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      },
       _initPullDownRefresh() { //上刷新
        this.scroll.on('pullingDown', () => { 
          this.$emit('pullingDown')
        })
      },
      finishPullUp(){//加载完成
        this.scroll&&this.scroll.finishPullUp()
      },
      finishPullDown(){ //上刷新
        this.scroll&&this.scroll.finishPullDown()
      }
    },
    watch: {
      listData() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)//默认刷新的20ms
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .scroll
    position:relative
    height:100%
    background: #fff
</style>