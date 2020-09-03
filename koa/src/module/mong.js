import {
    MongoClient
} from "mongodb";
import {
    url,
    datebaseName
} from "./config";

class Db {
    db = null
    constructor() {
        this.connect()
    }
    async connect() {
        try {
            if (!this.db) {
                const client = new MongoClient(url, {
                    useUnifiedTopology: true
                })
                await client.connect()
                this.db = client.db(datebaseName)
            }
        } catch (error) {
            console.log(error)
        }
    }
    async find(collectionName, json = {}) {
        await Db.getDbInstance.call(this)
        const result = this.db.collection(collectionName).find(json)
        return result.toArray()
    }
    async findOne(collectionName, json = {}) {
        await Db.getDbInstance.call(this)
        const result = this.db.collection(collectionName).findOne(json)
        return result
    }
    async getCount(collectionName, json = {}) {
        await Db.getDbInstance.call(this)
        const result = this.db.collection(collectionName).find(json).count()
        return result
    }
    async insertOne(collectionName, doc = {}) {
        try {
            await Db.getDbInstance.call(this)
            return await this.db.collection(collectionName).insertOne(doc)
        } catch (error) {
            console.log(error)
        }
    }
    async insertMany(collectionName, docs = []) {
        try {
            await Db.getDbInstance.call(this)
            return await this.db.collection(collectionName).insertMany(docs)
        } catch (error) {
            console.log(error)
        }
    }
    async update(collectionName, oldDoc = {}, newDoc = {}) {
        try {
            await Db.getDbInstance.call(this)
            return await this.db.collection(collectionName).update(oldDoc, {
                $set: newDoc
            })
        } catch (error) {

        }
    }
    static async getDbInstance() {
        if (!this.db) {
            await this.connect()
        }
    }
    static getInstance() {
        if (!Db.instance) {
            Db.instance = new Db()
        }
        return Db.instance
    }
}
const db = Db.getInstance()
export default db

// const db = Db.getInstance();
// console.time("start1")
// db.find("person").then(data => {
//     console.timeEnd("start1")
//     console.log(data)
// });
// setTimeout(() => {
//     const db2 = Db.getInstance();
//     console.time("start2")
//     db2.find("person").then(data => {
//         console.timeEnd("start2")
//         console.log(data)
//     });
// }, 10000)