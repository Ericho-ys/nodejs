const fs = require("fs")

function readFile(url) {
    return new Promise((resolve, reject) => {
        fs.readFile(url, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}
const getContentType = (extname) => {
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
};
exports.getContentType = getContentType
exports.readFile = readFile