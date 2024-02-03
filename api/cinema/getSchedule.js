const cinemaModel = require("../../models/cinema")
module.exports = (app)=>{
    app.get("/cinema/film/:filmId/schedule",async (req,res)=>{
        const schedule = await cinemaModel.getSchedule(req.params.filmId)
        if(schedule) {
            res.json(schedule);
        }
        else
            return res.status(500).send('Film not found')
    })
}
