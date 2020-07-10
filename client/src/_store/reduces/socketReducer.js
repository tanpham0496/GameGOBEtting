import {
    RESPONSE_SEND_MESSAGE,
    CLEAR_STATUS_SEND_MESSAGE,
    GET_CHAT_SUCCESS ,
    GET_CHAT_PAGINATION_SUCCESS,
   PUT_MONEY_ON_BET
} from '../actions/socketActions';


export default function (state = { listMessage : [], }, action ) {
    switch (action.type) {
        case GET_CHAT_SUCCESS : {
            return {
                ...state,
                listMessage: action.result.result
            }
        }
        case RESPONSE_SEND_MESSAGE:
            state.listMessage.push(action.data.message);
            return {
                ...state,
                statusSendMessage : action.data.status
            };
        case CLEAR_STATUS_SEND_MESSAGE:
            delete state.statusSendMessage;
            return {
                ...state
            };
        case GET_CHAT_PAGINATION_SUCCESS :
            action.result && action.result.listMessage.map(item => {
                state.listMessage.push(item);
            });
            return {
                ...state,
                amountMessage : action.result.amount,

            };
            case PUT_MONEY_ON_BET : {
                return {
                    ...state,
                    param: action.param
                }
            }

        default:
            return {
                ...state
            }
    
    }
}


