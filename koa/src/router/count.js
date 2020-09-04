import db from "../module/mong"
import {
    vertify,
} from "./middleware/index"
const types = ['javascript', 'css', 'Vue', 'webpack', 'nodejs', 'flutter', 'canvas', 'd3']
let mdTypeCount = types.reduce((pre, cur, index) => {
    let temp = {
        type: index,
        value: cur
    }

    return [...pre, temp]
}, [])
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

    router.post('/getMdCount', vertify, async (ctx, next) => {
        try {
            for (let i = 0; i < mdTypeCount.length; i++) {
                const count = await db.find('mdlist', {
                    "type": mdTypeCount[i].type
                })
                mdTypeCount[i].count = count.length
            }
            ctx.body = {
                resCode: 1,
                result: mdTypeCount
            }
        } catch (error) {

        }

    })
}