import db from "../module/mong"
import {
    ObjectId
} from "mongodb"
import {
    vertify
} from "./middleware/index"
import {
    qiuniuConfig
} from "../module/config"

import qiniu from "qiniu"
export default function registeUploader(router) {

    router.post('/getUploadToken', vertify, async (ctx, next) => {



        const mac = new qiniu.auth.digest.Mac(qiuniuConfig.AccessKey, qiuniuConfig.SecretKey)

        const options = {
            scope: qiuniuConfig.Bucket,
            returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
        };
        const putPolicy = new qiniu.rs.PutPolicy(options);
        const uploadToken = putPolicy.uploadToken(mac);
        ctx.body = {
            resCode: 1,
            result: {
                uploadToken,
                Domain: qiuniuConfig.Domain
            }
        }

    })

}