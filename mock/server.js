let http = require('http');
let fs = require('fs');
let url = require('url');

//访问根地址:http://localhost:3000

// 获取本地轮播图数据 
let sliders = require('./sliders');

http.createServer((req, res) => {
  //设置请求头(打包不用设置)
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  // res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // res.setHeader("X-Powered-By", ' 3.2.1')
  // if (req.method == "OPTIONS") return res.end(); /*让options请求快速返回*/

  let { pathname, query } = url.parse(req.url, true); // true把query转化成对象

  if (pathname === '/sliders') { // /sliders返回轮播图数据
    res.setHeader('Content-Type', 'application/json;charset=utf8');
    return res.end(JSON.stringify(sliders));
  }
   // 读取本地html放在服务器中; 
    fs.stat('.'+pathname,function (err,stats) { //读取一个路径 /
      if(err){
        fs.createReadStream('index.html').pipe(res);
      }else{
        if(stats.isDirectory()){
          let p = require('path').join('.'+pathname,'./index.html');
          fs.createReadStream(p).pipe(res);
        }else{
          fs.createReadStream('.'+pathname).pipe(res);
        }
      }
    });
}).listen(3000, function() {
  console.log("http://localhost:3000")
})
