const cinemaModel = require("../../models/cinema")
module.exports = (app)=>{
    app.post('/cinema/payment', async (req,res)=>{
        const phoneNumber = req.body.phoneNumber
        const filmId = req.body.filmId
        const date = req.body.date
        const metaInfo = req.body.metaInfo
        await cinemaModel.order(filmId,phoneNumber,date,metaInfo)
        res.end()
    })
}
