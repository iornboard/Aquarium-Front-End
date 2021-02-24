import { INCREMENT, DECREMENT, SET_DIFF } from '../_actions/types';

const counterInitialState = {
    value: 0,
    diff: 1
};

const counter = (state = counterInitialState, action) => {
    switch (action.type) {
        case SET_DIFF:
          return {
            ...state,
            diff: action.diff
          };
        case INCREMENT:
          return {
            ...state,
            value: state.value + state.diff
          };
        case DECREMENT:
          return {
            ...state,
            value: state.value - state.diff
          };
        default:
          return state;
      }
};

export default counter;