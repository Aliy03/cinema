const cinemaModel = require("../../models/cinema")
module.exports = (app)=>{
    app.put("/cinema/orders/cancel",async (req,res)=>{
        await cinemaModel.cancelUserOrder(req.body.orderId)
        res.end()
    })
}
