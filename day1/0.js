var http = require("http");
var fs = require("fs");
var url = require("url");
// 创建服务器
var serve = http.createServer(function (req, res) {
  // req表示请求 request; res标识响应 response
  // 设置HTTP头部， 状态码是200， 文件类型是 html ，字符集是 utf-8
  res.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
  if (req.url == "/index") {
    fs.readFile("index.html", function (error, data) {
      console.log(error, data);
      res.end(data);
    });
  } else {
    res.end("没有这个页面");
  }
});
serve.listen(3000, "127.0.0.1");
// http module