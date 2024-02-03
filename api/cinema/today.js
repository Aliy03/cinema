const cinemaModel = require("../../models/cinema")
module.exports = (app)=>{
    app.get("/cinema/today",async (req,res)=>{
        const films = await cinemaModel.getTodayFilms()
        res.json(films);
    })
}
