import db from "../module/mong"
import auth from "../module/auth"
import crypto from "crypto"
import {
    serect,
    salt
} from "../module/authConfig.js"
import {
    datebaseName
} from "../module/config"

export default function registeLogin(router) {
    router.post('/login', async (ctx) => {
        const md5 = crypto.createHash('md5');
        const params = ctx.request.body
        const passwordStr = params.password + ":" + salt

        md5.update(passwordStr)
        const passwordMd5 = md5.digest('hex')
        const data = await db.findOne("person", {
            username: params.username,
        });
        if (data && data._id) {
            if (data.password == passwordMd5) {
                try {
                    const token = await auth.sign({
                            username: data.username,
                            password: data.password,
                        },
                        serect, {
                            expiresIn: "2h",
                        })
                    delete data.password
                    ctx.body = {
                        resCode: 1,
                        token,
                        user: data
                    };
                } catch (error) {
                    ctx.body = {
                        resCode: -1,
                        errorMsg: "登录失败，请稍后重试",
                    };
                }
            } else {
                ctx.body = {
                    resCode: -1,
                    errorMsg: "密码不正确",
                };
            }


        } else {
            ctx.body = {
                resCode: -1,
                errorMsg: "用户名不存在",
            };
        }
    })

}