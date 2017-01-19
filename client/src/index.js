import React from 'react';  
import ReactDOM from 'react-dom';  
import { Provider } from 'react-redux';  
import { createStore, applyMiddleware } from 'redux';  
import { Router, browserHistory } from 'react-router';  
import reduxThunk from 'redux-thunk';  
import routes from './routes';  
import reducers from './components/reducers/';
import { AUTH_USER } from './components/actions/types';
import cookie from 'react-cookie';  

// Import stylesheets like this, if you choose: import './public/stylesheets/base.scss';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);  

const store = createStoreWithMiddleware(reducers);

ReactDOM.render(  
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.querySelector('.root'));