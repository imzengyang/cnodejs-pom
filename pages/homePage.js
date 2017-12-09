
const { By } = require('selenium-webdriver')


let loginlink = By.css('a[href="/signin"]')
let registerlink = By.css('a[href="/signup"]')


let clickloginlink = async function (driver) {
    await driver.findElement(loginlink).click();
}

let clickregisterlink = async function(driver){
    await driver.findElement(registerlink).click();
}
 



module.exports.clickloginlink = clickloginlink;
module.exports.clickregisterlink = clickregisterlink;

