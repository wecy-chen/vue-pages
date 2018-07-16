<template>
  <div class="list">
    <scroll  
    :listData="cityData" 
    ref="listview"
    :listenScroll="listenScroll"
    :probeType="probeType"
    @scroll="scroll"
    >
      <ul>
        <li v-for="group in cityData" class="list-group" ref="listGroup">
          <h2 class="list-group-title">{{group.name}}</h2>
          <ul>
            <li v-for="item in group.cities" class="list-group-item">
              <span>{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <!-- 侧边栏 -->
      <div class="list-shortcut"  @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item,index) in shortcutList" class="item" :class="{'current':currentIndex===index}"
         :data-index="index">
          {{item}}
        </li>
      </ul>
    </div>
      <!-- 导航A-Z栏 -->
      <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}} </div>
    </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
import Scroll from '@/base/scroll/scroll'
let cityData  = require('@/api/citys.json') //导入数据
 const TITLE_HEIGHT = 30 //标题的高度
 const ANCHOR_HEIGHT = window.innerHeight <= 480 ? 17 : 18  //导航A-Z的高度
 //设置属性
function getData(el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}
export default {
  name: 'list',
  data() {
    return {
      cityData : cityData,
      shortcutList:[],
      scrollY: -1,
      currentIndex: 0,
      diff: -1 //表示上限 A-z标题滚动差
    }
  },
  created() { //没有放在data属性里不需要观察数据变化
    this.touch = {}
    this.listenScroll = true //监听滑动的事件
    this.probeType = 3 //默认是1 设置3防止节流,派发滚动事件
    this.listHeight = [] //offsetheight
  },
  computed:{
  	   data() { 
        let ret = []
        this.cityData.forEach((cityGroup) => { //处理城市数据
          let group = {}
          group.name = cityGroup.name
          group.items = []
          cityGroup.cities.forEach((city) => {
            let item = {}
            item.name = city.name
            item.value = city.cityid
            group.items.push(item)
          })
          ret.push(group)
        })
     },
     fixedTitle() { //标题
       if (this.scrollY > 0) {
         return ''
       }
       return this.cityData[this.currentIndex] ? this.cityData[this.currentIndex].name : ''
     }
  },
  watch:{
     scrollY(newY){
       const listHeight = this.listHeight
       // 当滚动到顶部，newY>0
       if (newY > 0) {
         this.currentIndex = 0
         return
       }
       

       // 在中间部分滚动
       //滑动最底位置
       //let lastY=listHeight[listHeight.length - 1]-scrollClientHeight
       for (let i = 0; i < listHeight.length - 1; i++) {
         let height1 = listHeight[i]
         let height2 = listHeight[i + 1]
         if (-newY >= height1 && -newY < height2) {
           this.currentIndex = i
           this.diff = height2 + newY//表示固定滚动的两个标题之间的距离
           return
         }
       }
       // 当滚动到底部，且-newY大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2
     }, 	
      diff(newVal) {
       let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
       if (this.fixedTop === fixedTop) {  
         return
       }
       this.fixedTop = fixedTop
       this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)` //大于0小于30 往上  往下小于-30到0
     }
  },
  mounted() {
  	this.sideBar()
  	this._calculatedHeight()
  },
  methods: {
  	//侧边栏数据
  	sideBar(){
  		if(this.cityData.length){
  			this.shortcutList= this.cityData.map((group) => {
          return group.name.substr(0, 1)
        })
  		}
  	},
    _calculatedHeight(){ //计算保存高度
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight//单元高
        this.listHeight.push(height)
      }
    },
   scroll(pos){ //滑动事件
      this.scrollY=pos.y
   },
   onShortcutTouchStart(e) { //侧边栏触摸点击事件
       let anchorIndex = getData(e.target, 'index') //获取点击的index
       let firstTouch = e.touches[0] //一个触摸点
       this.touch.y1 = firstTouch.pageY //y
       this.touch.anchorIndex=anchorIndex
       this._scrollTo(this.touch.anchorIndex)
     },
     onShortcutTouchMove(e){ //侧边栏滑动事件
      let moveTouch=e.touches[0];
      this.touch.y2=moveTouch.pageY
      let dis=(this.touch.y2-this.touch.y1)/ANCHOR_HEIGHT|0 //触摸偏移 向下取整
      let newIndex=parseInt(this.touch.anchorIndex)+dis;
      this._scrollTo(newIndex)
     },
      _scrollTo(index){ //滑动跳到位置
        if (!index && index !== 0) { //处理ui布局多余的空白undefined
         return
       }
       if (index < 0) { //index 边界的情况
         index = 0
       } else if (index > this.listHeight.length - 2) {
         index = this.listHeight.length - 2
       }
        this.scrollY = -this.listHeight[index]//A-z对应
        this.currentIndex=index
       this.$refs.listview.scrollToElement(this.$refs.listGroup[index],600)//滚动到目标元素 0动画时间
     },
  },
  components: {
    Scroll
  }
}
</script>
<style scoped lang='stylus' ref='styleshhet/stylus'>
  @import '~common/stylus/reset'
  @import '~common/stylus/variable'
    .list
      position:absolute
      left:0
      right:0
      top:0
      bottom:50px
      
      .list-group
        background-color:$color-white
        border-radius:2px
        font-size:$fontSize-medium
        .list-group-title
          padding-left:5px
          height:30px
          line-height:30px
          background-color:$color-light-grey-ss
          color:$color-light-cyan
        .list-group-item
          padding-left:5px
          height:30px
          line-height:30px
      //侧边栏
      .list-shortcut
        position:absolute
        z-index:30
        top:50%
        right:0
        display: inline-block
        transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        width:20px
        text-align:center
        background-color:$color-light-grey-ss
        border-radius:2px
        .item
          color:$color-light-grey
          &.current
            color:$color-light-cyan
      //A-Z导航栏
      .list-fixed
        position:absolute
        top:0
        left:0
        width:100%
        .fixed-title
          height:30px
          line-height:30px
          padding-left:5px
          background-color:$color-light-grey-ss
          color:$color-light-cyan     
</style>