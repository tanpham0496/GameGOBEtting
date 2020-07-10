import {apiLocal} from "../../_helpers/config";
import {handleResponse} from "../../_helpers/commonImportModule";

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const USER_CONNECT = 'USER_CONNECT';
export const RESPONSE_SEND_MESSAGE = 'RESPONSE_SEND_MESSAGE';
export const CLEAR_STATUS_SEND_MESSAGE = 'CLEAR_STATUS_SEND_MESSAGE';
export const GET_CHAT_SUCCESS = 'GET_CHAT_SUCCESS';
export const GET_CHAT_PAGINATION_SUCCESS = 'GET_CHAT_PAGINATION_SUCCESS';
export const PUT_MONEY_ON_BET = 'PUT_MONEY_ON_BET';

export const socketActions = {
    sendMessage,
    userConnect,
    responseSendMessage,
    clearStatusSendMessage,
    getAllChat,
    getMessagePagination,
    putMoneyOnBet ,
};

function sendMessage(param) {
    return ({type : SEND_MESSAGE, param});
}

function userConnect () {
   return ({type : USER_CONNECT})
}
function responseSendMessage(data) {
    return ({type : RESPONSE_SEND_MESSAGE, data})
}
function clearStatusSendMessage() {
    return ({type : CLEAR_STATUS_SEND_MESSAGE});
}

function getAllChat() {
    const requestOption = {
        method : 'GET',
        headers : {'Content-Type' : 'application/json'}
    };
    return dispatch => {
        fetch(`${apiLocal}/chat/getAll`, requestOption)
            .then(handleResponse).catch(err => console.log('Error ', err))
            .then(
                result => dispatch({type : GET_CHAT_SUCCESS, result })
            )
    }
}

function getMessagePagination(param) {
    const requestOption = {
        method : 'POST',
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify(param)
    };
    console.log('requestOption', requestOption);
    return dispatch => {
        fetch(`${apiLocal}/chat/getMessagePagination`, requestOption)
            .then(handleResponse).catch(err => console.log('Error ', err))
            .then(
                result => dispatch({type : GET_CHAT_PAGINATION_SUCCESS, result })
            )
    }
}

function putMoneyOnBet(param) {
    return ({type : PUT_MONEY_ON_BET, param })
}
