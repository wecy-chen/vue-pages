<template>
  <div class="scroll-list" ref='main'>

    <scroll ref='scroll'
    :listData='listData' 
    :scrollbar='scrollbarObj'
    :pullUpLoad="pullUpLoadObj"
    :listenScroll="listenScroll"
    @pullingUp="onPullingUp"
    :pullDownRefresh="pullDownRefresh"
    @pullingDown='pullingDown'
    @scroll='scroll'
    
    :startY="parseInt(startY)"
    >
    <!-- 列表 -->
        <div class="list-content" ref='content'>
          <ul>
          <li v-for="item in listData" class="list-item" @click='getOne(item)'>{{item}}</li>
          </ul>
             <!--  往上加载 -->
        <div class="pullup-wrapper" v-if='showLoad'>
          <div class="before-trigger" v-if="!isPullUpLoad">
            <span>{{pullUpTxt}}</span>
          </div>
          <div class="after-trigger" v-else>
            <loading></loading>
          </div>
        </div>
          <!-- 往下刷新 -->
       <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="showRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <bubble :y="bubbleY"></bubble>
        </div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading">
            <loading></loading>
          </div>
          <div v-else><span>{{refreshTxt}}</span></div>
        </div>
      </div>
      </div>
    </scroll>
  </div>
  </div>
</template>
<script type="ecmascript-6">
  import Scroll from '@/base/scroll/scroll'
  import Loading from '@/base/loading/loading.vue'
  import Bubble from '@/base/bubble/bubble.vue'
  export default{
    name:'scroll-list',
    data(){
      return {
        listData:[],
        scrollbar: true,
        scrollbarFade: true,//滑动条飞入自动隐藏
        pullUpLoad: true, // 功能加载更多
        isPullUpLoad: false,//是否加载
        pullUpLoadThreshold: 0,//阈值
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了',
        pullUpTxt:'',//加载文本
        showLoad: true, //本地显示加载
        pullDownRefresh:true,//下刷新
        showRefresh:false,//显示下刷新
        pullDownStyle: '', //下拉刷新样式
        refreshTxt:'刷新成功',
        listenScroll:true, //才有滑动事件
        beforePullDown: true,//开始下拉了
        isPullingDown: false,//下拉刷新状态
        bubbleY: 0, //气泡y值
        isRebounding: false,//回弹
        startY:0 ,//y值
      }
    },
    created(){
      for(let i=0;i<5;i++){ //设置数据
        this.listData.push('这是第'+(i+1)+'条数据')
      }
       this.pullDownInitTop = -50
    },
    mounted(){
      this.$refs.content.style.minHeight=this.getRect(this.$refs.main).height+1+'px' //可滑动最小的高度
    },
    methods:{
      getOne(item){
        alert(item)
      },
        onPullingUp() { //加载数据
        this.showLoad=true
        this.isPullUpLoad=true
        console.log('加载数据中')
        setTimeout(() => {
          if (Math.random() > 0.5) { 
            // 如果有新数据
            let count=this.listData.length+1
            this.listData.push('这是加载第'+count+'条数据')

            this.pullUpTxt='加载更多'
            this.isPullUpLoad=false
            this.$refs.scroll.finishPullUp() //加载完成
          } else {
            this.isPullUpLoad=false
            // 如果没有新数据
            this.pullUpTxt='没有更多了'
            this.$refs.scroll.finishPullUp() 
          }
        }, 2000)
      },
      pullingDown(){ //下拉松开触发
        this.showRefresh=true
        this.beforePullDown = false
        this.isPullingDown = true
           // 模拟更新数据
        setTimeout(() => {
          if (Math.random() > 0.5) {
            // 如果有新数据
            this.isPullingDown = false
            this.refreshTxt='数据更新完成'
            let count=this.listData.length+1
            this.listData.unshift('这是刷新第'+count+'数据')
            setTimeout(() => {
            this.beforePullDown = true
            this.isPullingDown = true
            this.$refs.scroll.finishPullDown() 
          }, 2000)
            
          } else {
            // 如果没有新数据
            this.isPullingDown = false
            this.refreshTxt='没有数据了'
          setTimeout(() => {
            this.beforePullDown = true
            this.isPullingDown = true
            this.$refs.scroll.finishPullDown() 
          }, 2000)
        }
      }, 1000)
      },
      rebuildScroll() { //重加载scroll
        this.$nextTick(function(){
          this.$refs.scroll.destroy()
          this.$refs.scroll._initScroll()
        });
    },
    scroll(pos){ //下拉刷新滚动
      if (!this.pullDownRefresh) {
      return
      }
      this.pullDownStyle=`top:${Math.min(20-pos.y, this.pullDownInitTop)}px`

      if (this.beforePullDown) { 
      this.showRefresh=true
      this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
      } else {
      this.bubbleY = 0
      }
   },
     getRect(el) { //DOM操作 获取
        if (el instanceof window.SVGElement) {
        let rect = el.getBoundingClientRect()
        return {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      }
    } else {
      return {
        top: el.offsetTop,
        left: el.offsetLeft,
        width: el.offsetWidth,
        height: el.offsetHeight
      }
    }
  },
    },
    computed:{
       scrollbarObj: function () { //滑动条效果
        return this.scrollbar ? {fade: this.scrollbarFade} : false
      },
       pullUpLoadObj: function () {//加载更多
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      },
       pullDownRefreshObj: function () {
        return this.pullDownRefresh ? {
          threshold: parseInt(this.pullDownRefreshThreshold),
          stop: parseInt(this.pullDownRefreshStop)
        } : false
      },
    },
    watch:{
      scrollbarObj: {
        handler() {
          this.rebuildScroll()
        },
        deep: true
      },
       pullUpLoadObj: {
        handler() {
          this.rebuildScroll()
        },
        deep: true
      },
      pullDownRefreshObj: {
        handler() {
          this.rebuildScroll()
        },
        deep: true
      },
       startY(val) {
        this.rebuildScroll()
      },
    },
    components:{
      Scroll,
      Loading,
      Bubble
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/reset'
  @import "~common/stylus/variable.styl"
    .scroll-list
      position: absolute
      left: 0
      top: 0
      right: 0
      bottom: 50px

      /*ul内容*/
      .list-content
        position: relative
        z-index: 20
        background: #fff
        .list-item
          height: 60px
          line-height: 60px
          font-size: 18px
          padding-left: 20px
          border-bottom: 1px solid #e5e5e5
      
      .pulldown-wrapper
        position: absolute
        height:50px
        /*background:red*/
        width: 100%
        left: 0
        display: flex
        justify-content center
        align-items center
        transition: all

      .pullup-wrapper
        width: 100%
        display: flex
        justify-content center
        align-items center
        padding: 16px 0
</style>