import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

// import scss stylesheet
import './scss/main.scss';

// import component
import store from './utils/store';
import Home from './components/Home.jsx';
import AuthRoutes from './utils/AuthRoutes';
import setAuthToken from './utils/setAuthToken';
import SigninPage from './components/Signin/SigninForm.jsx';
import SignupPage from './components/Signup/SignupPage.jsx';
import NavigationBar from './components/NavigationBar.jsx';
import Footer from './components/Footer.jsx';
import { setCurrentUser } from './actions/auth/authActions';
import CheckLoggedinUser from './utils/CheckLoggedinUser';

const { localStorage } = window;
const jwtToken = localStorage && localStorage.getItem('jwtToken');
if (jwtToken) {
  const valid = jwt.verify(jwtToken, process.env.SECRET_KEY, (err, result) => {
    if (err) {
      return err;
    }
    return result;
  });
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
    <BrowserRouter>
      <div>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Signup" component={CheckLoggedinUser(SignupPage)} />
          <Route path="/Signin" component={CheckLoggedinUser(SigninPage)} />
          <Route component={AuthRoutes} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
