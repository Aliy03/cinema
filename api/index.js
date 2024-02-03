const cinema = require("./cinema")
const user = require("./user")
module.exports = (app) =>{
    cinema(app)
    user(app)
}
