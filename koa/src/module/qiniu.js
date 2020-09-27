import {
    qiniuAK,
    qiniuSK
} from "./config"

import qiniu from "qiniu"

const mac = new qiniu.auth.digest.Mac(qiniuAK, qiniuSK)

const options = {
    scope: "dy-head",
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

export {
    uploadToken
}