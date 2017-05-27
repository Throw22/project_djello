import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginContainer from '../containers/LoginContainer';
import BoardContainer from '../containers/BoardContainer';
import NavBar from '../components/NavBar';

class AppContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <NavBar />
        <Router>
          <Switch>
            <Route exact path="/" component={LoginContainer} />
            <Route path="/boards/:title" component={BoardContainer} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default AppContainer;
