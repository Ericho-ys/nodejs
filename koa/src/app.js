import Koa from "koa";
import Router from "koa-router";

import staticServer from "koa-static";
import {
  resolve
} from "path";
import bodyParser from "koa-bodyparser";
import cors from "koa-cors";
import api from "./router/index"
let app = new Koa();
const router = new Router();

// 中间件 洋葱执行机制
app.use(staticServer(resolve(__dirname, "../static")));
app.use(bodyParser());
app.use(cors());

router.use("/api", api)

app.use(router.routes()).use(router.allowedMethods());
app.listen(3001);