import { SET_JOIN_USERS } from '../_actions/types';

const user = (state = {}, action) => {
    switch (action.type) {
      
        case SET_JOIN_USERS :
          return {
            ...state,
            joinUsers: action.payload
          };  
          break;
        default:
          return state;
      }
};

export default user;