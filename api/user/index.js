const opt = require("./opt")
const signIn = require("./signIn")
const session = require("./session")
module.exports = (app)=>{
    opt(app)
    signIn(app)
    session(app)
}
