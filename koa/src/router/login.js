import db from "../module/mong"
import auth from "../module/auth"
import crypto from "crypto"
import {
    serect,
    salt
} from "../module/authConfig.js"

export default function registeLogin(router) {
    router.post('/login', async (ctx) => {
        const md5 = crypto.createHash('md5');
        const params = ctx.request.body
        const passwordStr = params.password + ":" + salt
        md5.update(passwordStr)
        const passwordMd5 = md5.digest('hex')
        const data = await db.findOne("person", {
            username: params.username,
            password: passwordMd5,
        });
        if (data._id) {
            try {
                const token = await auth.sign({
                        username: data.username,
                        password: data.password,
                    },
                    serect, {
                        expiresIn: "2h",
                    })
                ctx.body = {
                    resCode: 1,
                    token,
                };
            } catch (error) {

            }

        } else {
            ctx.body = {
                code: 200,
                errorMsg: "用户名不存在",
            };
        }
    })

}