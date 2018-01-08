import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import { BrowserRouter, Route } from 'react-router-dom';
import './scss/main.scss';
import store from './utils/store';
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import setAuthToken from './utils/setAuthToken';
import SigninPage from './components/Signin/SigninForm.jsx';
import SignupPage from './components/Signup/SignupPage.jsx';
import Footer from '../client/components/Footer.jsx';
import Profile from '../client/components/Profile.jsx';
import { setCurrentUser } from './actions/auth/authActions';

const { localStorage } = window;
const jwtToken = localStorage && localStorage.getItem('jwtToken');
if (jwtToken) {
  const decodedToken = jwt.decode(jwtToken);
  const hasExpired = decodedToken.exp - (Date.now() / 1000) < 0;
  if (!hasExpired) {
    setAuthToken(jwtToken);
    store.dispatch(setCurrentUser(jwt.decode(jwtToken)));
  } else {
    localStorage.removeItem('jwtToken');
  }
}
render(
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
