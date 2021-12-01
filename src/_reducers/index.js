import { combineReducers } from 'redux';  // 여러개의 reducer를 사용할 때 사용되는 메서드 
import auth from './auth'
import file from './file'
import task from './task'
import user from './user'
import modal from './modal'
import content from './content'
import project from './project'




const rootReducer = combineReducers({
    auth,
    file,
    task,
    user,
    modal,
    content,
    project
});

export default rootReducer;