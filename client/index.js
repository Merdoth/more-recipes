import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import { Route } from 'react-router-dom';
import { Router } from 'react-router';
import history from './utils/history';
import './scss/main.scss';
import store from './utils/store';
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import AuthenticateUser from './utils/AuthenticateUser';
import CheckLoggedinUser from './utils/CheckLoggedinUser';
import setAuthToken from './utils/setAuthToken';
import SigninPage from './components/Signin/SigninForm.jsx';
import SignupPage from './components/Signup/SignupPage.jsx';
import Footer from './components/Footer.jsx';
import Profile from './components/Profile.jsx';
import Recipes from './components/Recipes/Recipes.jsx';
import { setCurrentUser } from './actions/auth/authActions';

const { localStorage } = window;
const jwtToken = localStorage && localStorage.getItem('jwtToken');
if (jwtToken) {
  const valid = jwt.verify(
    jwtToken,
    'this23423girl223is#$3423crazy',
    (err, result) => {
      if (err) {
        return err;
      }
      return result;
    }
  );
  if (valid) {
    const decodedToken = jwt.decode(jwtToken);
    setAuthToken(jwtToken);
    store.dispatch(setCurrentUser(decodedToken));
  } else {
    localStorage.removeItem('jwtToken');
  }
}
render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route path="/" component={App} />
        <Route exact path="/" component={CheckLoggedinUser(Home)} />
        <Route path="/Signup" component={CheckLoggedinUser(SignupPage)} />
        <Route path="/Signin" component={CheckLoggedinUser(SigninPage)} />
        <Route path="/profile" component={AuthenticateUser(Profile)} />
        <Route path="/recipes" component={AuthenticateUser(Recipes)} />
        <Footer />
      </div>
    </Router>
  </Provider>,
  document.getElementById('app')
);
