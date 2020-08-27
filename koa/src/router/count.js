import db from "../module/mong"
import {
    vertify,
} from "./middleware/index"
export default function registeCount(router) {

    router.post('/getCount', vertify, async (ctx, next) => {
        let count = {}
        const mdTotal = await db.getCount('mdlist')
        count.mdTotal = mdTotal
        const userTotal = await db.getCount('person')
        count.userTotal = userTotal
        count.readTotal = 1000
        count.otherTotal = 1000
        ctx.body = {
            resCode: 1,
            result: count
        };
    })
}