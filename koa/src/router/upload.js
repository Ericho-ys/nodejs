import db from "../module/mong"
import {
    ObjectId
} from "mongodb"
import {
    vertify
} from "./middleware/index"
import {
    uploadToken
} from "../module/qiniu"
export default function registeUploader(router) {

    router.post('/getUploadToken', vertify, async (ctx, next) => {
        ctx.body = {
            resCode: 1,
            result: uploadToken
        }

    })

}