const utils = require("./utils/commons.js")
const http = require("http")
const url = require("url")
const path = require("path")
import("./serve/index.js")
const htmlServe = http.createServer(async function (req, res) {
    let pathname = url.parse(req.url).pathname
    if (pathname == "/favicon.ico") return
    if (pathname === "/") {
        pathname = "/index.html"
    }
    const extname = path.extname(pathname)
    try {
        const data = await utils.readFile("../src" + pathname)
        const contentType = utils.getContentType(extname)
        res.writeHead(200, {
            "content-type": contentType
        })
        res.end(data)
    } catch (error) {

        if (extname == '.html') {
            const data404 = await utils.readFile("../static/404.html")
            res.end(data404)
        }

    }
});


htmlServe.listen(3000, "127.0.0.1")