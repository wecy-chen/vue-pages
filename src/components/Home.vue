<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <button class="btn btn-default">bootstrap按钮</button>
    <button @click="fn">插件</button>
    <h1>VUEX</h1>
    <button @click='increment'>+1</button>
    <button @click='add'>+1</button>
    <span>{{count}}</span>
    <button @click='getData'>axios获取轮播数据</button>
    <br>

    <button @click='getStorage'>获取本地数据</button> <span></span>

    <router-link to="/swiper" tag="button">轮播图</router-link>
    <router-link to="/home" tag="button">首页</router-link>
    <br>
    <h2>better-scroll</h2>
    <router-link to='/better' tag='button'>slider轮播图</router-link> 
    <br>
    <router-link to='/scroll' tag='button'>scroll默认列表</router-link>
    <br> 
    <router-link to="/list" tag="button">拼音列表</router-link>
  </div>
</template>
<script>
import {mapGetters,mapActions,mapMutations} from 'vuex'
import {getSliders} from '@api/index.js'  //在build/webpack.base.conf.js 配置路径
import storage from 'good-storage' //本地存储
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed:{
    ...mapGetters([
      'count'
    ])
  },
    methods:{
      setStorage(){ //保存
        storage.set('XXX_KEY','这是本地保存数据')
      },
      getStorage(){ //获取
        this.msg=storage.get('XXX_KEY')
      },
      removeStorage(){ //删除
        storage.remove('XXX_KEY')
      },
      ...mapActions([
        'increment'
        ]),

      ...mapMutations({
        'add':'INCREMENT' //改名
      }),

      fn(){
        console.log($('h1'))
        //this.$notify()//默认值
        //this.$notify('默认延时3s');
        this.$notify('自定义提示',{delay:1000});
      },

      async getData(){ //异步获取数据
        let sliders=await getSliders()
        console.log(sliders)
      }
    }
}
</script>
<style scoped></style>
