
const {By} = require('selenium-webdriver')


const input_username = By.id('loginname');
const input_passwd = By.id('pass');
const input_repass = By.id('re_pass');
const input_email = By.id('email');

const submit_btn = By.css('.span-primary');



const assertPage =  By.css('strong')


let registerUser = async function (driver,username,passwd,repass,email) {
    await driver.findElement(input_username).sendKeys(username)
    await driver.findElement(input_passwd).sendKeys(passwd)
    await driver.findElement(input_repass).sendKeys(repass)
    await driver.findElement(input_email).sendKeys(email)
    await driver.findElement(submit_btn).click();
}


let getRealVal  = async function(driver){
    let getVal = await driver.findElement(assertPage).getText();
    return getVal;
}

module.exports.registerUser = registerUser;
module.exports.getRealVal = getRealVal;