import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import './main.scss';
import store from './utils/store';
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import SigninPage from './components/Signin/SigninPage.jsx';
import SignupPage from './components/Signup/SignupPage.jsx';
import Footer from '../client/components/Footer.jsx';
import Profile from '../client/components/Profile.jsx';

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
