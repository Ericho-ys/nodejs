var http = require("http")
var url = require("url")
var queryString = require("querystring")
var serve = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url)
    var pathname = urlObj.pathname
    var port = urlObj.port
    var protocol = urlObj.protocol
    var query = urlObj.query
    var c = urlObj.search

    res.end(queryString.stringify(urlObj))
})

serve.listen(3000, "127.0.0.1")