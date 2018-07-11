import axios from 'axios';
// 增加默认的请求的路径
// 拦截器
axios.defaults.baseURL = 'http://localhost:3000';
axios.interceptors.response.use((res)=>{
  return res.data; // 在这里统一拦截结果 把结果处理成res.data
});
// 获取轮播图数据 , 返回的是一个promise对象
export let getSliders = () =>{
  return axios.get('/sliders').catch(e=>{
    console.log("服务器没打开",e)
  })
};