webpackJsonp([1],{"07PK":function(t,n,e){"use strict";(function(t){var r=e("Xxa5"),o=e.n(r),s=e("exGp"),a=e.n(s),i=e("Dd8w"),c=e.n(i),u=e("NYxO"),l=e("gyMJ");n.a={name:"HelloWorld",data:function(){return{msg:"Welcome to Your Vue.js App"}},computed:c()({},Object(u.c)(["count"])),methods:c()({},Object(u.b)(["increment"]),Object(u.d)({add:"INCREMENT"}),{fn:function(){console.log(t("h1")),this.$notify("自定义提示",{delay:1e3})},getData:function(){var t=this;return a()(o.a.mark(function n(){var e;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(l.a)();case 2:e=t.sent,console.log(e);case 4:case"end":return t.stop()}},n,t)}))()}})}}).call(n,e("7t+N"))},NHnr:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r={};e.d(r,"increment",function(){return g});var o={};e.d(o,"count",function(){return w});var s=e("/5sW"),a=e("07PK"),i={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"hello"},[e("h1",[t._v(t._s(t.msg))]),t._v(" "),e("button",{on:{click:t.fn}},[t._v("按钮")]),t._v(" "),e("h1",[t._v("VUEX")]),t._v(" "),e("button",{on:{click:t.increment}},[t._v("+1")]),t._v(" "),e("button",{on:{click:t.add}},[t._v("+1")]),t._v(" "),e("span",[t._v(t._s(t.count))]),t._v(" "),e("button",{on:{click:t.getData}},[t._v("获取轮播数据")])])},staticRenderFns:[]};var c=function(t){e("X+Yx")},u={name:"App",components:{HelloWorld:e("VU/8")(a.a,i,!1,c,"data-v-24376e2a",null).exports}},l={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"app"}},[e("router-link",{attrs:{to:"/swiper",tag:"button"}},[t._v("轮播图")]),t._v(" "),e("router-link",{attrs:{to:"/home",tag:"button"}},[t._v("首页")]),t._v(" "),e("router-link",{attrs:{to:"/list",tag:"button"}},[t._v("列表页")]),t._v(" "),e("router-view"),t._v(" "),e("button",{staticClass:"btn btn-default"},[t._v("bootstrap按钮")]),t._v(" "),e("HelloWorld")],1)},staticRenderFns:[]};var d=e("VU/8")(u,l,!1,function(t){e("TNql")},"data-v-2dd2122c",null).exports,v=e("Dd8w"),p=e.n(v),f={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",[n("div",{staticClass:"notify"},[this._v(this._s(this.value))])])},staticRenderFns:[]};var m=e("VU/8")({data:function(){return{value:"我太帅了"}}},f,!1,function(t){e("qrEf")},"data-v-2e38988e",null).exports,_={install:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{delay:3e3};t.prototype.$notify=function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!_.el){n=p()({},n,r);var o=new(t.extend(m)),s=document.createElement("div");o.$mount(s),e&&(o.value=e),document.body.appendChild(o.$el),_.el=o.$el,setTimeout(function(){document.body.removeChild(o.$el),_.el=null},n.delay)}}}},h=_,b=e("NYxO"),g=function(t){(0,t.commit)("INCREMENT")},w=function(t){return t.count},x={count:0},y=e("bOdI"),E=e.n(y)()({},"INCREMENT",function(t){t.count=t.count+1});e("sax8");s.a.use(b.a);var N=new b.a.Store({actions:r,getters:o,state:x,mutations:E,strict:!1,plugins:[]}),j=(e("qb6w"),e("Bb4J"),{render:function(){var t=this.$createElement;return(this._self._c||t)("div",[this._v("首页")])},staticRenderFns:[]}),$=e("VU/8")(null,j,!1,null,null,null).exports,C={render:function(){var t=this.$createElement;return(this._self._c||t)("div",[this._v("\n\t列表页\n")])},staticRenderFns:[]},O=e("VU/8")(null,C,!1,null,null,null).exports,T={name:"carrousel",data:function(){return{imgs:["https://m.360buyimg.com/mobilecms/s1125x549_jfs/t11578/40/1816587279/47894/42dba539/5a0d36f7N149b127f.jpg!q70.jpg","https://img1.360buyimg.com/da/jfs/t14110/207/712950073/377098/a23521b1/5a129386N7f39c763.jpg","https://img1.360buyimg.com/da/jfs/t13657/160/507550199/94542/6e62a404/5a0d3658Nce159095.jpg"],swiperOption:{pagination:{el:".swiper-pagination"},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},loop:!0}}},computed:{swiper:function(){return this.$refs.mySwiper.swiper}},mounted:function(){console.log(this.swiper)},methods:{onSetTranslate:function(){console.log("onSetTranslate")}}},k={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("swiper",{ref:"mySwiper",attrs:{options:t.swiperOption},on:{"set-translate":t.onSetTranslate}},[t._l(t.imgs,function(t){return e("swiper-slide",{key:t},[e("img",{attrs:{src:t}})])}),t._v(" "),e("div",{staticClass:"swiper-pagination",attrs:{slot:"pagination"},slot:"pagination"}),t._v(" "),e("div",{staticClass:"swiper-button-prev",attrs:{slot:"button-prev"},slot:"button-prev"}),t._v(" "),e("div",{staticClass:"swiper-button-next",attrs:{slot:"button-next"},slot:"button-next"}),t._v(" "),e("div",{staticClass:"swiper-scrollbar",attrs:{slot:"scrollbar"},slot:"scrollbar"})],2)],1)},staticRenderFns:[]};var R=e("VU/8")(T,k,!1,function(t){e("lrOG")},null,null).exports,q=e("/ocq");s.a.use(q.a);var U=new q.a({routes:[{path:"/",redirect:"/home"},{path:"*",redirect:"/home"},{path:"/home",component:$},{path:"/list",component:O},{path:"/swiper",component:R}]}),V=e("7QTg"),M=e.n(V);e("v2ns");s.a.use(M.a),s.a.use(h,{delay:5e3}),s.a.config.productionTip=!1,new s.a({el:"#app",render:function(t){return t(d)},store:N,router:U})},TNql:function(t,n){},"X+Yx":function(t,n){},gyMJ:function(t,n,e){"use strict";e.d(n,"a",function(){return s});var r=e("mtWM"),o=e.n(r);o.a.defaults.baseURL="http://localhost:3000",o.a.interceptors.response.use(function(t){return t.data});var s=function(){return o.a.get("/sliders").catch(function(t){console.log("服务器没打开",t)})}},lrOG:function(t,n){},qb6w:function(t,n){},qrEf:function(t,n){},v2ns:function(t,n){}},["NHnr"]);
//# sourceMappingURL=app.d2394b5416a2c15edf01.js.map