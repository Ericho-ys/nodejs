import Router from "koa-router"
import registeLogin from "./login"
import registeMain from "./main"
const router = new Router()

registeLogin(router)
registeMain(router)
export default router.routes()