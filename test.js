require('chromedriver')
let { Builder } = require('selenium-webdriver')
let MongoClient = require('mongodb').MongoClient;

let driver = new Builder().forBrowser('chrome').build();

let HomePage = require('./pages/homePage');
let RegistrHome = require('./pages/registerPage');

let assert = require('assert');

let run = async function (username, email) {
    await driver.get("http://118.31.19.120:3000/")
    // await HomePage.clickregisterlink(driver)

    await HomePage.clickregisterlink(driver);

    await RegistrHome.registerUser(driver, username, "123456", "123456", email);
    let assertVal = "欢迎加入 Nodeclub！我们已给您的注册邮箱发送了一封邮件，请点击里面的链接来激活您的帐号。"
    let realVal = await RegistrHome.getRealVal(driver)

    assert.deepEqual(assertVal, realVal)
    await activeUser(username)
}

let test = async function () {
    for (let i = 0; i < 20; i++) {
        const name = "testuser"
        let username = name + i;
        let email = name + i + '@12.com'
        await run(username, email)
    }
}

let activeUser = function (user, done) {
    let url = "mongodb://118.31.19.120:27017/node_club_dev"
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        let collection = db.collection("users")
        // active user;

        console.log("will active the user", user)
        collection.updateOne({ name: `${user}` }, { $set: { "active": true } }, function (err, docs) {
            console.log(err, docs.result)
        })
        db.close(done);
    });
}


// let activeUser =  function (user) {
//     let url = "mongodb://118.31.19.120:27017/node_club_dev"
//     MongoClient.connect(url, function (err, db) {
//         assert.equal(null, err);
//         console.log("Connected correctly to server");
//         let collection = db.collection("users")
//         // collection.findOne({name: `${user}`},function(err,docs){
//         //     if(err){
//         //         console.log('No found');
//         //     }else{
//         //         // 找到注册的用户后调用发送邮件的js文件
//         //         done();
//         //     }       
//         // })
//         // //根据指定的字段找到要修改的用户 并更新某个字段的值
//         // collection.updateOne({ name: `${user}` }, { $set: { "active": true } }, function (err, docs) {
//         // assert.equal(null, err);
//         // return docs;
//         // console.log(docs.name);
//         // })
//         db.close();
//     })

// }

test()


// activeUser("xiaoming1")