import { combineReducers } from 'redux';  // 여러개의 reducer를 사용할 때 사용되는 메서드 
import auth from './auth'
import post from './post'
import file from './file'
import chat from './chat'



const rootReducer = combineReducers({
    auth,
    post,
    file,
    chat
});

export default rootReducer;