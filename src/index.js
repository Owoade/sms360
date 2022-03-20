import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore,combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as actions from './actions/';
import { reveal } from './actions/actionMethods';

const bgReducer = (state=localStorage.getItem("isDarkmode") == undefined ? "false" : localStorage.getItem("isDarkmode"), action)=>{
   switch(action.type){
     
     case actions.DARK_MODE:
       state="true"
       localStorage.setItem("isDarkmode","true");
       return state
     break 
     case actions.LIGHT_MODE :
       state = "false";
       localStorage.setItem("isDarkmode","false");
       return state
     break 
     case actions.REVEAL:
       return state
      break    
   }
}
const store = createStore(bgReducer);
store.dispatch(reveal())
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
