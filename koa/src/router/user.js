import db from "../module/mong"
import {
    vertify
} from "./middleware/index"
import {
    createCrypto,
    returnObjectId
} from "../module/utils"
export default function registeUser(router) {

    router.post('/getUsers', vertify, async (ctx, next) => {
        const params = ctx.request.body
        try {
            const result = await db.findOne('person', {
                "_id": returnObjectId(params.userId)
            })
            const users = await db.find('person', {
                "type": {
                    $gt: result.type
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
                "_id": returnObjectId(params.userId)
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
        const userId = params.userId
        delete params.userId
        if (params.oldPassword) {
            const oldPasswordMd5 = createCrypto(params.oldPassword)
            try {
                const user = await db.findOne('person', {
                    "_id": returnObjectId(userId)
                })
                if (oldPasswordMd5 == user.password) {
                    const result = await db.update('person', {
                        "_id": returnObjectId(userId)
                    }, params)

                    ctx.body = {
                        resCode: 1,
                        result: "ok"
                    }
                } else {
                    ctx.body = {
                        resCode: -1,
                        result: "老密码不正确"
                    }
                }
            } catch (error) {
                ctx.body = {
                    resCode: -1,
                    result: error
                }
            }
        } else {
            try {
                const result = await db.update('person', {
                    "_id": returnObjectId(userId)
                }, params)
                ctx.body = {
                    resCode: 1,
                    result: "ok"
                }
            } catch (error) {
                ctx.body = {
                    resCode: -1,
                    result: error
                }
            }
        }

    })

    router.post('/createUser', vertify, async (ctx, next) => {
        const params = ctx.request.body
        const passwordMd5 = createCrypto(params.password)
        params.password = passwordMd5
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