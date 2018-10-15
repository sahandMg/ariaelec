import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history'
import './index.css';
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import  {Provider}  from "react-redux";
import thunk from "redux-thunk";
import { Route , Switch, withRouter } from 'react-router-dom';
// import registerServiceWorker from './registerServiceWorker';
import authReducer from './store/reducers/auth';
import cartReducer from './store/reducers/cart';
import * as actions from './store/actions/index';
import Example from './components/Example';
import RouteAPI from './RouteAPI';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer, cart: cartReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

store.dispatch( actions.authCheckState() );

export default class Test extends Component {
    state = {
        test: ''
    }

    testFunc = () => {

    }
    render() {
        return (
           <Provider store={store}>
            <Router history={createBrowserHistory()}>
             <RouteAPI/>
           </Router>
           </Provider>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Test />, document.getElementById('example'));
}
