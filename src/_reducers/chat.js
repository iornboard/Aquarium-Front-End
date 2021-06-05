import { GET_CHAT , CREATE_CHAT } from '../_actions/types';


const post = (state = {}, action) => {
    switch (action.type) {
      
        case GET_CHAT :
          return {
            ...state,
            SignUpSuccess: action.payload
          };  
          break;
        case CREATE_CHAT :
          return {
            ...state,
            SignUpSuccess: action.payload
          };  
          break;
        default:
          return state;
      }
};

export default post;