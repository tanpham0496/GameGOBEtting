const mongoose = require('mongoose');

const roundSchema = new mongoose.Schema({
	matchId : {type : mongoose.Schema.Types.ObjectId, ref : 'Match'},
	roundNumber: {type:Number,required:true,index: true},
	listPlayerBetting: [{
		userId : {type:mongoose.Schema.Types.ObjectId , ref:"User"},
		battingAmount : { type:Number, required:true, default: 0 },
		chooseStone : { type:String, required:true },    //chooseStone : black or white
	}],
	moneyPutIntoBlack: {type : Number, default: 0},
	moneyPutIntoWhite: {type : Number, default: 0},
});

module.exports = mongoose.model('Round', roundSchema);