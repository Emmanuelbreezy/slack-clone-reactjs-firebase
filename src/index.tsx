import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './assets/css/app.main.css';
import App from './container/App/App';

import { createStore,applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { Provider,connect} from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension';

import reportWebVitals from './reportWebVitals';
import { Login } from './components/AuthUI/Login/login';
import { Register } from './components/AuthUI/Register/register';
import firebaseAuth from './firebase/firebase';
import rootReducer from './store/reducers';

// actions exported from actions/index
import * as actionTypes from './store/actions';

import {BrowserRouter, Switch,Route, withRouter} from 'react-router-dom';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))); //composeWithDevTools()

const Root = ({_setUser, history,_clearUser}:any) => {
  useEffect(()=>{
    firebaseAuth
            .auth()
            .onAuthStateChanged(user => {
              if(user){
                _setUser(user);
                 history.push('/');
              }else{
                history.push('/login');
                _clearUser();
              }
            })
  },[_setUser,history,_clearUser]);

  return(
    <Switch>
      <Route exact  path="/" component={App} />
      <Route  path="/login" component={Login} />
      <Route  path="/register" component={Register} />
    </Switch>
  );
}


// mapdispatchtoprops
const mapDispatchToProps = (dispatch:any) => {
  return{
    _setUser: (user:any) => dispatch(actionTypes.setUser(user)),
    _clearUser: () => dispatch(actionTypes.clearUser),
  }
}

//connected our store to root components and the withRouter
const RootwithAuth = withRouter(
  connect(null,mapDispatchToProps)(Root)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
          <RootwithAuth />
        </BrowserRouter>
    </Provider>
    </React.StrictMode>
  
    ,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
