const today = require("./today")
const getInfo = require("./getInfo")
const getSchedule = require("./getSchedule")
const order = require("./order")
const getOrders = require("./getOrders")
const cancelOrder = require("./cancelOrder")
module.exports = (app)=>{
    today(app)
    getInfo(app)
    getSchedule(app)
    order(app)
    getOrders(app)
    cancelOrder(app)
}
