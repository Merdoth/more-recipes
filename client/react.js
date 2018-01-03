import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import './main.scss';
import store from './utils/store';
import App from './components/App';
import Home from './components/Home';
import SigninPage from './components/Signin/SigninPage';
import SignupPage from './components/Signup/SignupPage';
import Footer from '../client/components/Footer';
import Profile from '../client/components/Profile';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path="/" component={App} />
        <Route exact path="/" component={Home} />
        <Route path="/Signup" component={SignupPage} />
        <Route path="/Signin" component={SigninPage} />
        <Route path="/profile" component={Profile} />
        <Footer />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
