import {
    datebaseName
} from "../module/config"
import db from "../module/mong"
import {
    vertify,
} from "./middleware/index"
import {
    returnObjectId
} from "../module/utils"
export default function registeMd(router) {

    router.post('/sendMd', vertify, async (ctx, next) => {
        const params = ctx.request.body
        const person = await db.findOne('person', {
            "_id": returnObjectId(params.createrId)
        })
        const result = await db.insertOne('mdlist', {
            createrName: person.username,
            createrId: params.createrId,
            title: params.title,
            type: params.type,
            top: params.top,
            setTopTime: params.setTopTime,
            createTime: new Date().getTime()
        })
        await db.insertOne('mddetail', {
            mdId: result.insertedId.toString(),
            ...params,
            createrName: person.username
        })
        ctx.body = {
            resCode: 1
        };
    })

    router.post('/getMdList', vertify, async (ctx, next) => {
        const params = ctx.request.body
        try {
            let queryDoc = {}
            if (params.type !== undefined) {
                queryDoc.type = params.type
            }
            const result = await db.find('mdlist', queryDoc, {
                "setTopTime": -1,
                "createTime": 1,
            }, params.pageNum, params.pageSize)
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