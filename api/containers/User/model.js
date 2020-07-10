const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: { type: String, unique: true, required: true },
    userBalance : {type : Number, default : 0},
    socketId : { type : mongoose.Schema.Types.ObjectId},
});

module.exports = mongoose.model('User', userSchema);