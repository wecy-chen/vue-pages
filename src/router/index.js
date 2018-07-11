import Vue from 'vue';
import Home from '@components/Home.vue';
import List from '@components/List.vue';
import My from '@components/My.vue';
import Other from '@components/Other.vue';
import Swiper from '@components/swiper/Swiper.vue';
import Silder from '@components/slider/Slider.vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter); // 和以前不一样的地方引入router必须使用use
// 注册一些全局的内容
export default new VueRouter({
    routes:[
    		{path:'/',redirect:'/home'},
    		{path:'*',redirect:'/home'},
        {path:'/home',component:Home}, 
        {path:'/list',component:List},
        {path:'/my',component:My},
        {path:'/other',component:Other},
        //另外的写法{path:'/home',component:()=>import('../components/Home.vue')}
        {path:'/swiper',component:Swiper},
        {path:'/better',component:Silder}
    ]
});
