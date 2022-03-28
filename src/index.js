import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import { createStore } from 'redux';

// import CustomerAskData from './CustomerAskData'

let basicState = [
  
]

function reducer(state = basicState, ACTION){

  if(ACTION.type === 'findInformation'){
    if(state.length === 0){
      let copy = [...state];
      copy.push(ACTION.PAYLOAD)
      return copy;
    }else{
      let copy = [...state];
      copy[0] = ACTION.PAYLOAD ;
      return copy;
    }
  }else{
    return state
  }
}

let store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
