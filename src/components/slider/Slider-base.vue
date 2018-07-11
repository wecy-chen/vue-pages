<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div v-if='showDot' class="dots"> <!--小圆点-->
      <span class="dot" v-for="(item, index) in dots" :class="{active: currentPageIndex === index }"></span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
   function addClass(el, className) { //加class
      let reg = new RegExp('(^|\\s)' + className + '(\\s|$)') //"className" 或者 “   className     ”
      if (reg.test(el.className)) { //判断是否有class
        return
      }
      //加上class名
      let newClass = el.className.split(' ')
      newClass.push(className)
      el.className = newClass.join(' ')
    }
export default {
  name: 'slider',
  props: {
    loop: { //滑动
      type: Boolean,
      default: true
    },
    autoPlay: { //自动轮播
      type: Boolean,
      default: true
    },
    interval: { //轮播时间
      type: Number,
      default: 4000
    },
    showDot: { //小圆点
      type: Boolean,
      default: true
    },
    click: { //点击
      type: Boolean,
      default: true
    },
    threshold: { //滑动的阀值
      type: Number,
      default: 0.3
    },
    speed: { //速度
      type: Number,
      default: 400
    }

  },
  data() {
    return {
      dots: [], //点组
      currentPageIndex: 0 //点的位置
    }
  },
  mounted() {
    this.update()
    //窗口适应
    window.addEventListener('resize', () => {
      if (!this.slider||!this.slider.enabled) {
        return
      }
      clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => {
        if (this.slider.isInTransition) {
          this._onScrollEnd()
        } else {
          if (this.autoPlay) {
            this._play()
          }
        }
        this.refresh() //刷新
      }, 60)
    })
  },
   activated() {
    if (!this.slider) {
      return
    }
    this.slider.enable()
    let pageIndex = this.slider.getCurrentPage().pageX
    this.slider.goToPage(pageIndex, 0, 0)
    this.currentPageIndex = pageIndex
    if (this.autoPlay) {
      this._play()
    }
  },
  deactivated() {
    this.slider.disable()
    clearTimeout(this.timer)
  },
  beforeDestroy() {
    this.slider.disable()
    clearTimeout(this.timer)
  },
  methods: {
      update() {
      if (this.slider) {
        this.slider.destroy()
      }
      this.$nextTick(() => {
        this.init()
      })
    },
    refresh() {
      this._setSliderWidth(true)
      this.slider.refresh()
    },
    prev() {
      this.slider.prev()
    },
    next() {
      this.slider.next()
    },
    init() {
      clearTimeout(this.timer)
      this.currentPageIndex = 0
      this._setSliderWidth()
      if (this.showDot) {
        this._initDots()
      }
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    },
    _setSliderWidth(isResize) { //设置滑动块宽
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')//加class 有就不用加了
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth //为了实现回环无缝滚动
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _initSlider() {//初始化
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false, //根据滑动的距离和时间计算出动量
        snap: {
          loop: this.loop, //无缝滚动 需要加2个子宽度
          threshold:this.threshold,//表示可滚动到下一个的阈值
          speed: this.speed //过渡时间
        },
        bounce: false, //弹跳
        snapSpeed: 400, //下一个的时间
        click: this.click
      })
      //切换下一张调用
      this.slider.on('scrollEnd', this._onScrollEnd) //一张滑动结束
      this.slider.on('touchEnd', () => { // 滑动松手
        if (this.autoPlay) {
          this._play()
        }
      })
      this.slider.on('beforeScrollStart', () => { //手开始滑动
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
    },
    _onScrollEnd() {
      let pageIndex = this.slider.getCurrentPage().pageX
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        this._play()
      }
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _play() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval)
    }
  },
  watch: {
    loop() {
      this.update()
    },
    autoPlay() {
      this.update()
    },
    speed() {
      this.update()
    },
    threshold() {
      this.update()
    }
  }
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  // 颜色定义规范
$color-text-l = rgba(255, 255, 255, 0.5)
$color-text-ll = rgba(255, 255, 255, 0.8)

  .slider
    min-height: 1px
    position: relative
    width: 100%
    overflow: hidden
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
