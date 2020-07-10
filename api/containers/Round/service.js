const db = require('../../db/db');
const ObjectId = require('mongoose').Types.ObjectId;
const isNull = require('lodash/isnull');

module.exports = {
    addEveryRoundOnMatch,
    getResultBetting,
};


                                                                      
async function addEveryRoundOnMatch({_idMatch, roundNumber, listPlayerBetting}) {
    try{
        if(!_idMatch || !listPlayerBetting || (listPlayerBetting && (!Array.isArray(listPlayerBetting) || listPlayerBetting.length === 0 )) )
             return{status : false, message : 'Not found request param'};
        let moneyPutIntoBlack = 0;
        let moneyPutIntoWhite = 0;
        // money player put into Black and White
        listPlayerBetting.map(async (value) => {
            if(value.chooseStone === 'Black') {
                moneyPutIntoBlack+= value.battingAmount;
            }
            else {
                moneyPutIntoWhite+= value.battingAmount;
            }
            const user = await db.User.find({_id : ObjectId(value.userId)}).lean();
            const changeBalance = user[0].userBalance - value.battingAmount;
            if(changeBalance) await db.User.findByIdAndUpdate({_id : ObjectId(value.userId)}, {$set : {'userBalance' : changeBalance}}, {new : true});
        });
        
        const checkRoundExit = await db.Round.find({matchId : ObjectId(_idMatch), roundNumber : roundNumber}).lean();
        console.log('checkRoundExit', checkRoundExit);
        if(checkRoundExit && checkRoundExit.length !== 0) return { status : false, message : 'Round exits'};
        const addRound = await db.Round.create({
            matchId: _idMatch,
            roundNumber : roundNumber,
            listPlayerBetting : listPlayerBetting,
            moneyPutIntoBlack :moneyPutIntoBlack,
            moneyPutIntoWhite : moneyPutIntoWhite
        });

        if(!addRound) return { status :false , message : 'Add round not success'};

        console.log('addRound',addRound);
        const data = {
            roundNumber : roundNumber,
            moneyPutIntoBlack :moneyPutIntoBlack,
            moneyPutIntoWhite : moneyPutIntoWhite
        };
        return { status : true , data : data}
    }
    catch(e){
        console.log('error', e);
        return { status : false, message : e}
    }

}
async function getResultBetting({_idMatch, winPlayer}) {
    try {
         if(!_idMatch) return {statusResult : false, message : 'Not found request param'};

         const roundOnMatch = await db.Round.find({matchId : ObjectId(_idMatch)}).lean();
         if(!roundOnMatch || roundOnMatch.length !==3) return {statusResult : false};

         roundOnMatch.map((round) => {
             round.listPlayerBetting.map( async (value) => {
                 let user = await db.User.findOne({_id : ObjectId(value.userId)});
                 if(value.chooseStone === winPlayer) {
                     const plusMoney = user.userBalance + value.battingAmount;
                     console.log('plusMoney',plusMoney);
                     if(plusMoney) {
                         const updateBalance = await db.User.findByIdAndUpdate({_id : ObjectId(value.userId)},
                             {$set : {'user.userBalance' : plusMoney}}, {new : true});

                         console.log('updateBalance------plus',updateBalance)
                     }
                 }
                 else {
                     const subtractMoney = user && user.userBalance - value.battingAmount;
                     console.log('subtractMoney',subtractMoney);
                     if(subtractMoney) {
                        const updateBalance = await db.User.findByIdAndUpdate({_id : ObjectId(value.userId)},
                             {$set : {'user.userBalance' : subtractMoney}}, {new : true});

                        console.log('updateBalance---sub',updateBalance)
                     }
                 }
             })
         });
         return {statusResult : true }
    }
    catch (e) {
       console.log('Error', e);
       return { statusResult : false, }
    }
}
