const db = require("./db")
const helper = require("./helper");

const films = [
    'Санечек',
    'Геи',
    "Коты",
    'В',
    "Открытом",
    "Космосе",
    "Парк",
    "Майонез",
    "Дукентр",
    "и",
    "зачем",
    "в три",
    "часа",
    "ночи",
    "два",
    "сеньора",
]

const photos = [
    "https://do-slez.com/uploads/posts/2021-09/1632916274_2.jpg",
    'http://m.gjcdn.net/fireside-post-image/900/1719935-mtpbk5fm-v4.jpg',
    'https://webpulse.imgsmail.ru/imgpreview?mb=webpulse&key=pulse_cabinet-image-d85c7da3-ff2b-420f-b48a-94218c17bddc',
    'https://i.pinimg.com/originals/57/9e/ca/579eca4477d870ee8f76b6327387b1de.jpg',
    'https://i.pinimg.com/originals/e4/0e/a4/e40ea430a1b88756985bb45504502feb.jpg',
    'https://i.pinimg.com/originals/7f/dc/f9/7fdcf90cd4b43ef966a1b70d6cbb7fea.jpg'
]
const rooms = ["ROOM1", "ROOM2", "ROOM3", "ROOM4", "ROOM5"]

function generateTitle(wordsCount = 3 ){
    const totalWordsCount = helper.getRandomInt(wordsCount,wordsCount+2)
    const words = [];
    for(let i = 0; i < totalWordsCount; i++){
        words.push(films[helper.getRandomInt(0,films.length-1)]);
    }
    return words.join(" ")
}

function getTimes() {
    const times = [];
    for(let j = 0; j< helper.getRandomInt(1, 10); j++){
        const date = new Date()
        date.setHours(helper.getRandomInt(0,23));
        date.setMinutes(helper.getRandomInt(1,59));
        times.push(date);
    }
    return times;
}

function getRooms() {
    const r = []

    const getRoom = function () {
        const room = rooms[helper.getRandomInt(0, rooms.length -1)]
        if (r.some(el => el.room === room)) {
            return getRoom()
        } else {
            return room;
        }
    }

    for(let j = 0; j< helper.getRandomInt(1, rooms.length); j++){
        const room = {
            room: getRoom(),
            times: getTimes()
        }

        r.push(room)
    }

    return r;
}

function getDaysStart(daysArray) {
    const dateStart = new Date();
    dateStart.setDate(dateStart.getDate() + helper.getRandomInt(0,7));
    dateStart.setHours(helper.getRandomInt(1,23),helper.getRandomInt(0,59))
    if (
      daysArray.some(el =>
        el.getDate() === dateStart.getDate() && el.getMonth() === dateStart.getMonth()
      )
    ) {
        return getDaysStart(daysArray)
    } else {
        return dateStart
    }
}

async function generateFilms(){
    for(let k = 0; k<12; k++){
        const film = new db.FilmModel({
            title: generateTitle(),
            description: generateTitle(12),
            image: photos[helper.getRandomInt(0, photos.length-1)]
        })
        await film.save()

        const daysArray = []
        for(let i = 0; i<5; i++){
            const dateStart = getDaysStart(daysArray)
            const dateEnd = new Date(dateStart);
            dateEnd.setDate(dateEnd.getDate()+7)
            daysArray.push(dateStart)
            const schedule = new db.ScheduleModel({
                filmId: film._id,
                startDate: dateStart,
                endDate: dateEnd,
                room: getRooms(),

            })
            await schedule.save()
        }
    }
}

(async function (){
    await generateFilms()
})()
