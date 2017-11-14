import React from 'react';
import ReactDOM from 'react-dom';
import './main.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './components/App';
import Home from './components/Home';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import SigninPage from './components/Signin/SigninPage';
import SignupPage from './components/Signup/SignupPage';
import rootReducer from './rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
    applyMiddleware(thunk)
);
const store = createStore(rootReducer, enhancer);

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
        <div>
                <Route path="/" component={App}/>
                <Route exact path="/" component={Home}/>
                <Route path="/Signup" component={SignupPage}/>
                <Route path="/Signin" component={SigninPage}/>
            </div>
        </BrowserRouter>
    </Provider>
    ),
    document.getElementById('app')
);





 

