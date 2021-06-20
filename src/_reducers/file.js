import { IMAGE } from '../_actions/types';


const file = (state = {}, action) => {
    switch (action.type) {
      
        case IMAGE :
          return {
            ...state,
            ImgFileInfo: action.payload
          };  
          break;
        default:
          return state;
      }
};

export default file;