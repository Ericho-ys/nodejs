const {
    MongoClient
} = require("mongodb")

const url = "mongodb://127.0.0.1:27017"

const dbName = "test"

const client = new MongoClient(url, {
    useUnifiedTopology: true
});

client.connect((err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log("数据库连接成功")
    let db = client.db(dbName)
    // 1.查找数据
    // db.collection("person").find({"age": 13}).toArray((err, data) => {
    //     console.log(data)
    //     client.close()
    // })

    // 2. 增加数据
    // db.collection("person").insertOne({
    //     "name": "lisi",
    //     "age": 101
    // }, (err, data) => {
    //     if (err) {
    //         console.log("增加失败")
    //         return
    //     }
    //     console.log(data)
    // })

    // 3.修改数据

    // db.collection("person").updateOne({
    //     "name": "lisi",
    //     "age": 101
    // }, {
    //     $set: {
    //         "name": "lisi101"
    //     }
    // }, (err, result) => {
    //     if (err) {
    //         console.log("修改失败")
    //         return
    //     }
    //     console.log(result)
    //     client.close()
    // })

    // 4.删除数据

    db.collection("person").deleteMany({
        "age": 101
    }, (err) => {
        if (err) {
            console.log(err)
        }
        client.close()
    })
})