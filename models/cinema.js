const db = require("../db")
async function getTodayFilms(){
    let todayStart = new Date();
    todayStart.setHours(0,0,0,0);

    let todayEnd = new Date();
    todayEnd.setHours(23,59,59,999);

    const schedules = await db.ScheduleModel.find({
        startDate:{
            $lte: todayEnd
        },
        endDate:{
            $gte: todayStart
        }
    })

    const filmIds = new Set();
    for(let item of schedules){
        filmIds.add(item.filmId);
    }
    const films = await db.FilmModel.find({
        _id:{
            $in:Array.from(filmIds)
        }
    })
    return films
}

async function getFilm(filmId){
    const film = db.FilmModel.findOne({
        _id: filmId
    })
    return film || false
}

async function getSchedule(filmId){
    const schedules = await db.ScheduleModel.find({
        filmId
    })
    return schedules || false
}

async function order(filmId, phoneNumber, date, metaInfo){
    const order = new db.OrderModel({
        phoneNumber,
        filmId,
        date,
        metaInfo
    })
    await order.save();
}

async function getUserOrders(phoneNumber){
    const orders = await db.OrderModel.find({phoneNumber});
    return orders || false
}

async function cancelUserOrder(orderId){
    await db.OrderModel.deleteOne({_id:orderId})
}

module.exports = {
    getTodayFilms,
    getFilm,
    getSchedule,
    order,
    getUserOrders,
    cancelUserOrder
}
