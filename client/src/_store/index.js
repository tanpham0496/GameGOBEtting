import { combineReducers } from 'redux';

import screenReducer  from './reduces/screenReducer';
import userReducer from './reduces/usersReducer';
import socketReducer from './reduces/socketReducer';
import roundReducer from './reduces/roundReducer';

const rootReducer = combineReducers({
      screens : screenReducer,
      user : userReducer,
      socket : socketReducer,
      round : roundReducer
});

export default rootReducer;