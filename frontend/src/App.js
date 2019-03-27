import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './component/login/login-component';
import Singup from './component/singup/singup-component';
import Content from './component/content/content-component';
import Header from './component/header/header-component';

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
      // <BrowserRouter >
      //   <LoginContext.Provider
      //     value={{
      //       token: this.state.token,
      //       userId: this.state.userId,
      //       login: this.login,
      //       logout: this.logout
      //     }}
      //   >
      //     <Switch>
      //       {!this.state.token && <Redirect from="/" to="login" exact />}
      //       {this.state.token && <Redirect from="/" to="content" exact />}
      //       {this.state.token && <Redirect from="/login" to="content" exact />}
      //       {!this.state.token && <Route path="/login" component={Login} />}
      //       <Route path="/singup" component={Singup} />
      //       {this.state.token && <Route path="/content" component={Content} logout={this.state.logout} />}
      //     </Switch>
      //   </LoginContext.Provider>
      // </BrowserRouter>
      <Header />
    );
  }
}

export default App;
