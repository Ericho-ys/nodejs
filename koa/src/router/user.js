import db from "../module/mong"
import auth from "../module/auth"
import {
    ObjectId
} from "mongodb"
import {
    vertify
} from "./middleware/index"
export default function registeUser(router) {

    router.post('/getUsers', vertify, async (ctx, next) => {
        const params = ctx.request.body
        try {
            const result = await db.findOne('person', {
                "_id": new ObjectId(params.userId)
            })
            const users = await db.find('person', {
                "type": {
                    $gte: result.type
                }
            })
            ctx.body = {
                resCode: 1,
                result: users
            }
        } catch (error) {
            console.log(error)
        }

    })

    router.post('/getUserDetailById', vertify, async (ctx, next) => {
        const params = ctx.request.body
        try {
            const result = await db.findOne('person', {
                "_id": new ObjectId(params.userId)
            })
            ctx.body = {
                resCode: 1,
                result: result
            }
        } catch (error) {
            console.log(error)
        }
    })

    router.post('/updateAuth', vertify, async (ctx, next) => {
        const params = ctx.request.body
        try {
            await db.update('person', {
                "_id": new ObjectId(params.userId)
            }, params)
            ctx.body = {
                resCode: 1,
                result: "ok"
            }
        } catch (error) {

        }
    })

    router.post('/createUser', vertify, async (ctx, next) => {
        const params = ctx.request.body
        try {
            await db.insertOne('person', params)
            ctx.body = {
                resCode: 1,
                result: "ok"
            }
        } catch (error) {

        }
    })
}