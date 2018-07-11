<template>
  <div>
  	<slider :speed='speed'>
  		 <div v-for="item in imgs">
              <a href="#">
                <img class="needsclick" :src="item">
              </a>
            </div>
  	</slider>	
  </div>
</template>
<script type='text/ecmascript-6'>
import Slider from './Slider-base.vue'
export default {
  data() {
  	return{
  		  imgs: [
      'https://m.360buyimg.com/mobilecms/s1125x549_jfs/t11578/40/1816587279/47894/42dba539/5a0d36f7N149b127f.jpg!q70.jpg',
      'https://img1.360buyimg.com/da/jfs/t14110/207/712950073/377098/a23521b1/5a129386N7f39c763.jpg',
      'https://img1.360buyimg.com/da/jfs/t13657/160/507550199/94542/6e62a404/5a0d3658Nce159095.jpg'
    ],
    speed:1000
  	}
  },
  components:{
  	Slider
  }
}

</script>
