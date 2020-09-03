import Router from "koa-router"
import registeLogin from "./login"
import registeMain from "./main"
import registeMd from "./md"
import registeCount from './count'
import registeUser from "./user"
const router = new Router()

registeLogin(router)
registeMain(router)
registeMd(router)
registeCount(router)
registeUser(router)

export default router.routes()