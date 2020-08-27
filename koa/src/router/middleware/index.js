import auth from "../../module/auth.js"
import {
    serect
} from "../../module/authConfig.js"
export async function vertify(ctx, next) {
    const token = ctx.headers['token']
    const errBody = {
        resCode: 0,
        msgCode: 10005,
        errMsg: "未登陆，请先登陆"
    }
    if (token) {
        try {
            const decode = await auth.vertify(token, serect)
            console.log(decode)
            await next() // 需要增加 await 要不然无法进入下一个中间件
        } catch (error) {
            console.log(error)
            ctx.body = errBody
        }

    } else {
        ctx.body = errBody
    }

}