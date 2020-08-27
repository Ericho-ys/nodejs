import Router from "koa-router"
import registeLogin from "./login"
import registeMain from "./main"
import registeMd from "./md"
import registeCount from './count'
const router = new Router()

registeLogin(router)
registeMain(router)
registeMd(router)
registeCount(router)

export default router.routes()