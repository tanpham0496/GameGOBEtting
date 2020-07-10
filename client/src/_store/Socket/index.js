import {apiLocal} from '../../_helpers/config';
import {applySocketMiddeware} from './middleWareSocket'

import io from 'socket.io-client';
import {socketActions} from "../actions/socketActions";
import {roundActions} from '../actions/roundActions';
const socketClient = io(apiLocal);

const socketEvent = {
    //USER
    USER_CONNECT: (socket, action) => {
        const token = localStorage.getItem('token');
        // console.log('USER_CONNECT ', {socket,action});
        socket.emit(action.type, {type : action.type, token})
    },
    //CHAT
    SEND_MESSAGE: (socket, action) => {
        socket.emit(action.type, { ...action });
    },
    //GAME
    PUT_MONEY_ON_BET : (socket, action) => {
        // console.log('PUT_MONEY_ON_BET', action);
        socket.emit(action.type, {...action});
    }
};


const socketReceive = (dispatch, socket) => {
    //USER CONNECT TO ROOM
    socket.on('connectToRoom', (data) => {
        console.log('data',data);
    });
    socket.on('WAITING_MATCH_FINISHED', () => {

    });
    //CHAT MESSAGE
    socket.on('RESPONSE_SEND_MESSAGE', (data) => {
       dispatch(socketActions.responseSendMessage(data));
    });

    // ROUND
    socket.on('START_GAME_GO', (data) => {
        dispatch(roundActions.startGame(data))
    });
    socket.on('RESPONSE_BETTING', (data) => {
        dispatch(roundActions.responseBetting(data))
    });

    socket.on('RESPONSE_START_ROUND_1', (data) => {
        dispatch(roundActions.startRoundOne(data));
    });

    socket.on('RESPONSE_START_ROUND_2', (data) => {
        dispatch(roundActions.startRoundTwo(data));
    });

    socket.on('RESPONSE_START_ROUND_3', (data) => {
        dispatch(roundActions.startRoundThree(data));
    });

    socket.on('RESPONSE_RESULT', (data) => {
        dispatch(roundActions.responseResultOnMatch(data));
    });

};

const socketMiddleware = applySocketMiddeware(socketClient, socketEvent);

const socketReceiver = (dispatch) => {
    socketClient.on('connect', () => {
        socketReceive(dispatch, socketClient);
    })

}

export {
    socketMiddleware,
    socketReceiver
}