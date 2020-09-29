import React, { Component } from 'react';

import {
  Link,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom"

import { connect } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import './App.scss';

import Home from './components/Home/Home'
import Appointments from './components/Appointments/Appointments'

class App extends Component {
  render() {
    const { history } = this.props

    return (
      <ConnectedRouter history={history}>
        <div className="App">
          <Switch>
            <Link path='/home' component={Home} />
            <Link path='/appointments' component={Appointments} />
            <Redirect from='/' to='/home'/>
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

export default withRouter(connect()(App))