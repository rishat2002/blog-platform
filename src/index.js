/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { createStore,combineReducers,applyMiddleware,compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import articleReducer from "./redux/articles-reducer";


   const reducer = combineReducers({
   articleReducer
  })
  const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  }) : compose;
  const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)))
  const el = <Provider store={store}><App /></Provider>;
ReactDOM.render(el, document.getElementById('root'));
