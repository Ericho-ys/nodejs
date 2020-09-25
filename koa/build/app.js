"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _koa = _interopRequireDefault(require("koa"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _path = require("path");

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

var _koaCors = _interopRequireDefault(require("koa-cors"));

var _index = _interopRequireDefault(require("./router/index"));

//import staticServer from "koa-static";
var app = new _koa["default"]();
var router = new _koaRouter["default"](); // 中间件 洋葱执行机制
// app.use(staticServer(resolve(__dirname, "../static")));

app.use((0, _koaBodyparser["default"])());
app.use((0, _koaCors["default"])());
router.use("/api", _index["default"]);
app.use(router.routes()).use(router.allowedMethods());
app.listen(3001);