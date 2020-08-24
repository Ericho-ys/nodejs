import db from "../module/mong"
import auth from "../module/auth"
import {
    vertify
} from "./middleware/vertify"
export default function registeMain(router) {

    router.post('/getAdminsList', vertify, async (ctx, next) => {
        try {
            await next()
            ctx.body = {
                resCode: 1,
                adminList: []
            }
        } catch (error) {
            console.log(error)
        }

    })
}