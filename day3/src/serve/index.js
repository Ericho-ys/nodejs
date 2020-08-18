const fs = require("fs")
const http = require("http"),
    path = require("path"),
    qs = require("querystring")
const {
    MongoClient
} = require("mongodb")
const url = "mongodb://127.0.0.1:27017"
const dbName = "test"
const client = new MongoClient(url, {
    useUnifiedTopology: true
})
const serve = http.createServer((req, res) => {
    let pathname = path.parse(req.url).pathname
    if (pathname == "/favicon.ico") return
    if (req.url == "/dopost" && req.method.toLocaleLowerCase() == "post") {
        let postData = ""
        req.addListener("data", chunk => {
            postData += chunk
        })
        req.addListener("end", () => {
            res.writeHead(200, {
                'Access-Control-Allow-Origin': 'http://127.0.0.1:3000', // 允许访问的域（协议+域名+端口）
            });
            let queryParams = JSON.parse(postData)
            let resultObJ = {}
            // 连接数据库
            client.connect(err => {
                if (err) {
                    console.log("数据库连接失败")
                    return
                }
                console.log(queryParams)
                let db = client.db(dbName)
                db.collection("person").find({
                    "age": {
                        $lte: queryParams.age
                    }
                }).toArray((err, data) => {
                    console.log(data)
                    resultObJ.result = data
                    client.close()
                    res.end(JSON.stringify(resultObJ))
                })
            })
        })
    }
})
serve.listen(3001, "127.0.0.1")