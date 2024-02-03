const db = require("../db")

async function getUserByPhoneNumber(phoneNumber){
    const user = await db.UserModel.findOne({phoneNumber})
    return user || false
}

module.exports = {
    getUserByPhoneNumber
}
