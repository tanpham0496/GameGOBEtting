import {
    GET_USER_SUCCESS,
    GET_USER_FAILURE
} from '../actions/userActions'


export default function (state = {}, action) {
      switch (action.type) {
          case GET_USER_SUCCESS:
             
              return {
                  ...state,
                  user : action.result.user[0]
              };
          case GET_USER_FAILURE:
              return{
                  ...state,
                  error : action.err
              };
          default :
              return {
                  ...state
              }
      }
}