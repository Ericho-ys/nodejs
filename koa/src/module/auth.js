import jwt from "jsonwebtoken";

class Auth {
    constructor() {}
    sign(params = {}, serect, options = {}) {
        return new Promise((resolve, reject) => {
            try {
                const token = jwt.sign(params, serect, options)
                resolve(token)
            } catch (error) {
                reject(error)
            }
        })
    }
    vertify(token, serect) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, serect, (err, decoded) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(decoded)
                }
            });
        })

    }
    static getInstance() {
        if (!Auth.instance) {
            Auth.instance = new Auth()
        }
        return Auth.instance
    }
}
export default Auth.getInstance()