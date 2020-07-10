import {apiLocal} from "../../_helpers/config";
import {handleResponse} from '../../_helpers/commonImportModule'

export const GET_USER_SUCCESS  =  'GET_USER_SUCCESS';
export const GET_USER_FAILURE  =  'GET_USER_FAILURE';

export const userActions = {
    getUser,
};

function getUser() {
    const requestOption = {
        method : 'GET',
        headers : {'Content-Type' : 'application/json'},
        // body : JSON.stringify()
    };
    console.log('requestOption',requestOption);
    return dispatch => {
        fetch(`${apiLocal}/user/getUser`,requestOption).then(handleResponse).catch(err => console.log('error',err))
            .then(
                result => dispatch({type : GET_USER_SUCCESS, result}),
                err =>    dispatch({type : GET_USER_FAILURE, err})
            );
    }
}

