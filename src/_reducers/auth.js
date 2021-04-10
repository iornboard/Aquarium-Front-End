import { AUTH, JOIN ,LOGIN } from '../_actions/types';


const auth = (state = {}, action) => {
    switch (action.type) {

        case AUTH:
          return {
            ...state,
            userData: action.payload
          };  
          break;
        case JOIN:
          return {
            ...state,
            SignUpSuccess: action.payload
          };  
          break;
        case LOGIN:
          return {
            ...state,
            SignInSuccess: action.payload
          }; 
          break;
        default:
          return state;
      }
};

export default auth;