import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/app.main.css';
import App from './container/App/App';

import { createStore } from 'redux';
import { Provider,connect } from 'react-redux'
import {BrowserRouter, Switch,Route} from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import { Login } from './components/AuthUI/Login/login';
import { Register } from './components/AuthUI/Register/register';

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
