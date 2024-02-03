const helper = require("../helper")
const config = require("../config")
const codes = {}
function generateCode(phoneNumber){
    let code = ''
    for(let i = 0; i<config.codeLength; i++){
        code += helper.getRandomInt(0,9)
    }
    codes[code] = phoneNumber;
    setTimeout(()=>{
        delete codes[code]
    },config.codeExpireTime)
    return code
}
function verifyCode(phoneNumber,code){
    if(codes[code] && codes[code] === phoneNumber){
        delete codes[code]
        return true
    }
    return false
}

module.exports = {
    generateCode,
    verifyCode
}
