const cinemaModel = require("../../models/cinema")
module.exports = (app)=>{
    app.get("/cinema/orders",async (req,res)=>{
        const orders = await cinemaModel.getUserOrders(req.query.phoneNumber)
        if(orders)
            res.json(orders);
        else
            return res.status(500).send('Orders not found')
    })
}
