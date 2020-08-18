import Koa from "koa";
import Router from "koa-router";
import jwt from "jsonwebtoken";
import staticServer from "koa-static";
import {
  resolve
} from "path";
import bodyParser from "koa-bodyparser";
import db from "./module/mong"
let app = new Koa();
const router = new Router();

// 中间件
app.use(staticServer(resolve(__dirname, "../static")));
app.use(bodyParser());
// app.use(async (ctx, next) => {
//     console.log(`这是第一个中间件，执行顺序${1}`)
//     next()
//     console.log(`匹配完成之后第一个中间件逻辑，执行顺序${3}`)
// })
// app.use(async (ctx, next) => {
//     console.log(`这是第二个中间件, 执行顺序${4}`)
//     next()
//     console.log(`匹配完成之后第二个中间件，执行顺序${5}`)
// })

// 注册路由
// router.get('/news', (ctx, next) => {
//   console.log(`匹配路由，执行顺序${2}`)
//   ctx.body = "这是一个新闻页面"
// })
router.post("/regist", async (ctx, next) => {
  const params = ctx.request.body;
  const data = await db.find("person", {
    //"username": params.username
  })
  const insertData = await db.insertMany("person", [{
    "username": "dy1"
  }, {
    "username": "dy2"
  }])
  if (insertData.result.ok) {
    console.log(insertData)
  }
  ctx.body = params;
});
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);