import modal from './notify.vue';
let notify = { // 需要在此对象中拥有一个install方法

};
// this.$notify('吃饭了吗？',{delay:1000})
notify.install = function(Vue, options = { delay: 3000 }) {
  Vue.prototype.$notify = function(message, opt = {}) {
    if (notify.el) return; //多次触发,DOM还没消失
    options = { ...options, ...opt }; // 用自己调用插件时传递过来的属性 覆盖掉默认设置好的
    let V = Vue.extend(modal); // 返回的是一个构造函数的子类，参数是包含组件选项的对象
    let vm = new V;
    let oDiv = document.createElement('div'); //创建一个div将实例挂载到元素上
    vm.$mount(oDiv);

    
    if(message){
        vm.value = message; //提示信息
    }
    document.body.appendChild(vm.$el); // 把当前实例这个真实对象扔到页面上

    notify.el = vm.$el;//先挂载DOM对象

    setTimeout(() => { // 延迟多少秒 将dom元素移除掉
      document.body.removeChild(vm.$el); // 将实例的元素删除掉
      notify.el = null //删掉DOM对象
    }, options.delay);
  }
};
// 导出这个包含install的对象，如果使用Vue.use就会调用这个install 方法
export default notify;
