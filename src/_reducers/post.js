import { CREATE_POST , POST } from '../_actions/types';


const post = (state = {}, action) => {
    switch (action.type) {
      
        case CREATE_POST :
          return {
            ...state,
            SignUpSuccess: action.payload
          };  
          break;
        case POST :
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