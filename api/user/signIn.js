const userModel = require("../../models/user")
const {verifyCode} = require("../../models/authCodes");
module.exports = (app)=>{
    app.post('/users/signin', async (req,res)=>{
        const code = req.body.code;
        const phoneNumber = req.body.phoneNumber
        if(verifyCode(phoneNumber,code)){
            const user = await userModel.getUserByPhoneNumber(phoneNumber)
            if(user)
                return res.json(user)
            else
                return res.status(500).send('User not found')
        }
        return res.status(500).send('Incorrect verify code')
    })
}
