const db = require('../../db/db');
const ObjectId = require('mongoose').Types.ObjectId;
const isNull = require('lodash/isNull')

module.exports = {
    getUser
};

async function getUser() {
    try{
        const checkExitUser = await db.User.find({});
        if(checkExitUser.length === 0){
            const user = await db.User.create({
                userName : 'Shin shin',
                userBalance : 9999999,
            });
            if(!user) return { status : false, message : 'create user not success!'};
        }
        else {}
        const user = await db.User.find({});
        return {status: true, user}
    }
    catch (e) {
       console.log('error',e)
    }

}