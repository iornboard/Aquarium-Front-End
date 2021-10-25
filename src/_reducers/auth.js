import { AUTH, JOIN ,LOGIN } from '../_actions/types';


const auth = (state = {}, action) => {
    switch (action.type) {

        case AUTH:
          return {
            ...state,
            userData: action.payload.data
          };  
          break;
        case JOIN:
          return {
            ...state,
            SignUpSuccess: action.payload.data
          };  
          break;
        case LOGIN:
          return {
            ...state,
            SignInSuccess: action.payload.data
          }; 
          break;
        default:
          return state;
      }
};

export default auth;