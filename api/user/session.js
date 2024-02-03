const userModel = require("../../models/user")
module.exports = (app)=>{
    app.post('/users/session', async (req,res)=>{
        const phoneNumber = req.body.phoneNumber
        const user = await userModel.getUserByPhoneNumber(phoneNumber)
        if(user)
            return res.json(user)
        else
            return res.status(500).send('User not found')
    })
}
