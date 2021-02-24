import { combineReducers } from 'redux';  // 여러개의 reducer를 사용할 때 사용되는 메서드 
import counter from './testCounter'
import extra from './testExtra'


const rootReducer = combineReducers({
    counter,
    extra
});

export default rootReducer;