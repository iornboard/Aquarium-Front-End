import { ABOUT_MODAL } from '../_actions/types';


const modal = (state = {}, action) => {
    switch (action.type) {
      
        case ABOUT_MODAL :
          return {
            ...state,
            madal: action.payload
          };  
          break;
        default:
          return state;
      }
};

export default modal;