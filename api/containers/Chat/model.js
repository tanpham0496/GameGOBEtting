const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema ({
	message : {type : String , require : true},
	senderId : {type : mongoose.Schema.Types.ObjectId , ref : 'User'},
	senderName : {type : String, require: true, trim : true}
},{timestamps : true});

module.exports = mongoose.model('Chatting', chatSchema);