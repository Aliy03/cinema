const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
mongoose.connect('mongodb://127.0.0.1:27017/cinema')
    .then(() => console.log('Mongodb connected!'));
const film = new Schema({
    title: String,
    description: String,
    image: String,
});

const RoomSchema = new mongoose.Schema({
    room: { type: String, required: true },
    times: [Date]
});
const schedule = new Schema({
    filmId: ObjectId,
    startDate: Date,
    endDate: Date,
    room: [RoomSchema],
})
const user = new Schema({
    firstName: String,
    lastName: String,
    fatherName: String,
    phoneNumber: String,
    email: String
});
const card = new Schema({
    cardNumber: String,
    cvv: String,
    endDate: String
});
const order = new Schema({
    phoneNumber: String,
    filmId: String,
    date:Date,
    metaInfo: String,
});

const FilmModel = mongoose.model('film', film);
const UserModel = mongoose.model('user', user);
const CardModel = mongoose.model('card', card);
const ScheduleModel = mongoose.model('schedule', schedule);
const OrderModel = mongoose.model('order', order);

module.exports = {
    FilmModel,
    UserModel,
    CardModel,
    ScheduleModel,
    OrderModel
}
