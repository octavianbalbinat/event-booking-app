import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './component/login/login-component';
import Singup from './component/singup/singup-component';
import Content from './component/content/content-component';

import LoginContext from './component/context/login-context';

class App extends Component {
  state = {
    token: null,
    userId: null
  }

  login = (token, userId, tokenExpiration) => {
    this.setState({
      token: token,
      userId: userId
    })
  }

  logout = (token, userId, tokenExpiration) => {
    this.setState({
      token: null,
      userId: null
    })
  }

  render() {
    return (
      <BrowserRouter >
        <LoginContext.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout
          }}
        >
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/singup" component={Singup} />
            <Route path="/content" component={Content} />
          </Switch>
        </LoginContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
