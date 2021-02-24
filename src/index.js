import React from 'react';
import ReactDOM from 'react-dom';
import Root from './client/Root';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducer from './_reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구



const store = createStore(Reducer, composeWithDevTools()); // 스토어 생성 +  composeWithDevTools 를 사용하여 리덕스 개발자 도구 활성화
//console.log(store.getState());

ReactDOM.render(
  <Provider store = {store}>
  <React.StrictMode>
    <Root/>
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
