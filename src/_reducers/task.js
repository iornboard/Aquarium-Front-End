import { SET_TASK } from '../_actions/types';

const task = (state = {}, action) => {
    switch (action.type) {
      
        case SET_TASK :
          return {
            ...state,
            usingTask: action.payload
          };
          break;
        default:
          return state;
      }
};

export default task;