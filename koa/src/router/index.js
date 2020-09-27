import Router from "koa-router"
import registeLogin from "./login"
import registeMain from "./main"
import registeMd from "./md"
import registeCount from './count'
import registeUser from "./user"
import registeUploader from "./upload"
const router = new Router()

registeLogin(router)
registeMain(router)
registeMd(router)
registeCount(router)
registeUser(router)
registeUploader(router)

export default router.routes()