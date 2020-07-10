const db = require('../../db/db');

module.exports = {
    getAll,
    addMessage,
    getMessagePagination,
};

async function getAll() {
    return await db.Chatting.find({}).limit(30).lean();
}

async function addMessage({message, userId, userName}) {
  try{
        if(!userName || !message || !userId) return {status : false ,message : 'Not found param'};

        const addNewMessage = await db.Chatting.create({
            message : message,
            senderId : userId,
            senderName : userName
        });
        if(!addMessage) return {status : false ,message : 'Can not create message'};
        return {status : true, message : addNewMessage};
  }
  catch(err) {
    console.log("Error " , e);
    return { status : false, message : e}
  }
}

async function getMessagePagination({page}) {
    try{
        if(!page) return {status : false, message : 'Not found param'};

        const data = await db.Chatting.find({}).skip(page*30).limit(30).lean();
        const countAllMessage = await  db.Chatting.count({});
        return { status : true, listMessage : data, amount : countAllMessage }
    }
    catch(e)
    {
        console.log("Error", e);
    }
}