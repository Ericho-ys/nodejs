import db from "../module/mong"
import {
    vertify,
} from "./middleware/index"
export default function registeMd(router) {

    router.post('/sendMd', vertify, async (ctx, next) => {
        const params = ctx.request.body
        const result = await db.insertOne('mdlist', {
            userId: params.userId,
            title: params.title,
            type: params.type,
            top: params.top,
        })
        console.log(result.insertedId)
        await db.insertOne('mddetail', {
            mdId: result.insertedId.toString(),
            ...params
        })
        ctx.body = {
            resCode: 1
        };
    })

    router.post('/getMdList', vertify, async (ctx, next) => {
        const params = ctx.request.body
        try {
            const result = await db.find('mdlist', {
                "userId": params.userId
            })
            ctx.body = {
                resCode: 1,
                result
            }
        } catch (error) {

        }
    })

    router.post('/getMdDetaiById', vertify, async (ctx, next) => {
        const params = ctx.request.body
        try {
            const result = await db.find('mddetail', {
                "userId": params.userId,
                "mdId": params.mdId
            })
            ctx.body = {
                resCode: 1,
                result
            }
        } catch (error) {

        }
    })
}