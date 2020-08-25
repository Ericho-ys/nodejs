import Router from "koa-router"
import registeLogin from "./login"
import registeMain from "./main"
import registeMd from "./md"
const router = new Router()

registeLogin(router)
registeMain(router)
registeMd(router)
export default router.routes()