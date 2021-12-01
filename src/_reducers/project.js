import { SET_TERM } from '../_actions/types';

const project = (state = {}, action) => {
    switch (action.type) {
      
        case SET_TERM :
          return {
            ...state,
            term: action.payload
          };
          break;
        default:
          return state;
      }
};

export default project;