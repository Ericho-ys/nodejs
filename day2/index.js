var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");
var qs = require("querystring")
var serve = http.createServer(function (req, res) {
    let pathname = url.parse(req.url).pathname
    if (pathname == "/favicon.ico") return
    if (req.url == "/dopost" && req.method.toLocaleLowerCase() == "post") {
        var postData = ""
        req.addListener('data', function (chunk) {
            postData += chunk;
        });
        req.addListener('end', function () {
            var obj = qs.parse(postData)
            fs.readdir("./static", function (err, data) {
                console.log(data)
                res.writeHead(200, {
                    //'Access-Control-Allow-Credentials': 'true', // 后端允许发送Cookie
                    'Access-Control-Allow-Origin': 'http://127.0.0.1:3000', // 允许访问的域（协议+域名+端口）
                    /* 
                     * 此处设置的cookie还是domain2的而非domain1，因为后端也不能跨域写cookie(nginx反向代理可以实现)，
                     * 但只要domain2中写入一次cookie认证，后面的跨域接口都能从domain2中获取cookie，从而实现所有的接口都能跨域访问
                     */
                    //'Set-Cookie': 'l=a123456;Path=/;Domain=www.domain2.com;HttpOnly' // HttpOnly的作用是让js无法读取cookie
                });
                var obj = {},
                    tempArr = []
                for (var i = 0; i < data.length; i++) {
                    tempArr[i] = {}
                    tempArr[i].name = data[i].split(".")[0]
                    tempArr[i].url = "http://127.0.0.1:3001/" + data[i]
                }

                obj.result = tempArr
                res.end(JSON.stringify(obj))
            })

        });
    }
    const extname = path.extname(pathname);
    if (extname) {
        fs.readFile("./static" + pathname, function (err, data) {
            res.writeHead(200, {
                "content-type": getContentType(extname)
            })
            res.end(data)
        })
    }

});
serve.listen(3001, "127.0.0.1");

var htmlServe = http.createServer(function (req, res) {
    let pathname = url.parse(req.url).pathname
    if (pathname == "/favicon.ico") return
    if (pathname === "/") {
        pathname = "/index.html"
    }
    const extname = path.extname(pathname)
    fs.readFile("./src" + pathname, function (err, data) {

        if (err && extname == ".html") {
            fs.readFile("./static/404.html", function (err, _Data) {
                res.writeHead(404, {
                    "content-type": "text/html;charset=utf-8",
                });
                res.end(_Data)
            })
        }
        if (!err) {
            const contentType = getContentType(extname);
            res.writeHead(200, {
                "content-type": contentType
            })
            res.end(data)
        }

    })
});

function getContentType(extname) {
    switch (extname) {
        case ".js":
            return "application/x-javascript";
        case ".html":
            return "text/html;charset=utf-8";
        case ".css":
            return "text/css";
        case ".jpg":
            return "image/jpeg";
        case ".png":
            return "image/png";

    }
}
htmlServe.listen(3000, "127.0.0.1")