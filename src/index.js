/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import ArticleService from "./article-service/article-service";
//import { createStore,combineReducers,applyMiddleware,compose } from 'redux';
//import { Provider } from 'react-redux';
//import thunk from 'redux-thunk';

  //const composeEnhancers =
//  typeof window === 'object' &&
 // window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  //  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
   // }) : compose;
//const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)))
//const el = <Provider store={store}><App /></Provider>;
new ArticleService().getResource('articles').then((res)=> {
   console.log(res)
})
const el = <App/>
ReactDOM.render(el, document.getElementById('root'));
