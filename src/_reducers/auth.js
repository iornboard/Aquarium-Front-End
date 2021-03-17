import { SIGN_UP } from '../_actions/types';


const auth = (state = {}, action) => {
    switch (action.type) {
      
        case SIGN_UP:
          return {
            ...state,
            SignUpSuccess: action.payload
          };   
          
        default:
          return state;
      }
};

export default auth;