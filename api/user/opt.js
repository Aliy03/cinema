const authCodes = require("../../models/authCodes")
module.exports = (app)=>{
    app.post('/auth/opt', (req,res)=>{
        const code = authCodes.generateCode(req.body.phoneNumber)
        res.json({
            code
        })
    })
}
