import crypto from "crypto"
import {
    salt
} from "../module/authConfig.js"
import {
    ObjectId
} from "mongodb"
export function createCrypto(str) {
    const md5 = crypto.createHash('md5');
    const passwordStr = str + ":" + salt
    md5.update(passwordStr)
    const passwordMd5 = md5.digest('hex')
    return passwordMd5
}
export function returnObjectId(idStr) {
    return new ObjectId(idStr)
}