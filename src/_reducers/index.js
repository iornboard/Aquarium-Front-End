import { combineReducers } from 'redux';  // 여러개의 reducer를 사용할 때 사용되는 메서드 
import auth from './auth'
import post from './post'
import file from './file'



const rootReducer = combineReducers({
    auth,
    post,
    file
});

export default rootReducer;