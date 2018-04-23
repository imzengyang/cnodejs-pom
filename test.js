require('chromedriver')
let { Builder } = require('selenium-webdriver')
let HomePage = require('./pages/homePage');
let RegistrHome = require('./pages/registerPage');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const name = "user"
const baseIp = "192.168.219.138"
const serverUrl = "http://" + baseIp + ":3000/"
const mongodbUrl = "mongodb://" + baseIp + ":27017"

let run = async function (driver,username, email) {
    
    await driver.get(serverUrl)
    await HomePage.clickregisterlink(driver);
    await RegistrHome.registerUser(driver, username, "123456", "123456", email);
    await activeUser(username)
}

let test = async function () {
    let driver = new Builder().forBrowser('chrome').build();
    for (let i = 0; i < 20; i++) {
        let username = name + i;
        let email = name + i + '@12.com'
        await run(driver, username, email)
    }
    await driver.quit()
}

let activeUser = function (username) {
    const dbName = 'node_club_dev';
    // Use connect method to connect to the server
    MongoClient.connect(mongodbUrl, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        const collection = db.collection('users');

        collection.updateOne({ "name": username }
            , { $set: { "active": true } }, function (err, result) {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                console.log("Updated the User");
            });
        client.close();
    });
}

test()
