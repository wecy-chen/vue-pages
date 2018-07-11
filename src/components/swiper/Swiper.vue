<template>
  <div>
    <swiper :options="swiperOption" ref="mySwiper" @set-translate="onSetTranslate">
      <!-- 滑动内容 -->
      <!-- <swiper-slide>I'm Slide 1</swiper-slide> -->
      <!--    <swiper-slide>I'm Slide 2</swiper-slide> -->
      <!--  <swiper-slide>I'm Slide 3</swiper-slide> -->
      <swiper-slide v-for='i in imgs' :key=i>
        <img :src=i>
      </swiper-slide>
      <!-- 选项 -->
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-scrollbar" slot="scrollbar"></div>
    </swiper>
  </div>
</template>
<script>
export default {
  name: 'carrousel',
  data() {
    return {
      imgs: [
        'https://m.360buyimg.com/mobilecms/s1125x549_jfs/t11578/40/1816587279/47894/42dba539/5a0d36f7N149b127f.jpg!q70.jpg',
        'https://img1.360buyimg.com/da/jfs/t14110/207/712950073/377098/a23521b1/5a129386N7f39c763.jpg',
        'https://img1.360buyimg.com/da/jfs/t13657/160/507550199/94542/6e62a404/5a0d3658Nce159095.jpg'
      ],
      swiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        pagination: { //分页
          el: '.swiper-pagination' //class
        },
        navigation: { //左右按钮
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        loop:true //循环
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted() {
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    //console.log(this.swiper)
    // this.swiper.slideTo(3, 1000, false) 跳转到第三张
  },
  methods: {
    onSetTranslate() { //swiper滑动触发
      //console.log('onSetTranslate')
    }
  }
}

</script>
<style>
img {
  width: 100%
}

</style>