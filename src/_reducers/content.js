import { ABOUT_CONTENT } from '../_actions/types';


const content = (state = {}, action) => {
    switch (action.type) {
      
        case ABOUT_CONTENT :
          return {
            ...state,
            contentInfo: action.payload
          };  
          break;
        default:
          return state;
      }
};

export default content;