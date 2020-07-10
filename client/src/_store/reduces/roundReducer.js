import {
    START_GAME,
    RESPONSE_BETTING,
    START_ROUND_ONE,
    START_ROUND_TWO,
    START_ROUND_THREE,
    RESPONSE_RESULT_ON_MATCH
} from '../actions/roundActions';

const initialState = {
    idMatch : '',
    dataOnRound : {},
    betting : false,
    time: 0
};

export default function (state = initialState, action ) {
    switch (action.type) {

        case START_GAME :
            console.log('START_GAME' , action.data);
            return {
                ...state,
                time : action.data.timeWaiting
            };
        case RESPONSE_BETTING :
            console.log('RESPONSE_BETTING' , action.data);
            return {
                ...state,
                betting :  action.data.betting,
                time : action.data.timeWaiting
            };
        case START_ROUND_ONE :
            console.log('START_ROUND_ONE' , action.data);
            // const moneyBlack =
            return {
                ...state,
                dataOnRound : action.data.round1,
                betting:  action.data.betting,
                idMatch: action.data.idMatch,
                time : action.data.timeWaiting
            };
        case START_ROUND_TWO :
            console.log('START_ROUND_TWO' , action.data);
            return {
                ...state,
                dataOnRound : action.data.round2,
                betting:  action.data.betting,
                time : action.data.timeWaiting
            };
        case START_ROUND_THREE :
            console.log('START_ROUND_THREE' , action.data);
            return {
                ...state,
                dataOnRound : action.data.round3,
                betting:  action.data.betting,
                time : action.data.timeWaiting
            };
        case RESPONSE_RESULT_ON_MATCH :
            console.log('RESPONSE_RESULT_ON_MATCH' , action.data);
            return {
                ...state,
                dataOnRound : action.data.round4,
                betting:  action.data.betting,
                time : action.data.timeWaiting
            };
        default:
            return {
                ...state
            }
    }
}