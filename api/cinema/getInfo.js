const cinemaModel = require("../../models/cinema")
module.exports = (app)=>{
    app.get("/cinema/film/:filmId",async (req,res)=>{
        const film = await cinemaModel.getFilm(req.params.filmId)
        if(film)
            res.json(film);
        else
            return res.status(500).send('Film not found')
    })
}
