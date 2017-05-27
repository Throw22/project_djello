import React, { Component } from 'react';
import { connect } from 'react-redux';
import serialize from 'form-serialize';
import { getUser } from '../actions';
import Login from '../components/Login';
import { withRouter } from 'react-router';

class LoginContainer extends Component {
  constructor() {
    super();
  }

  componentWillReceiveProps(newProps) {
    console.log('newProps:', newProps);

    this.props.history.push(`/boards/${newProps.user.boards[0].title}`);
  }

  render() {
    return <Login onLoginSubmit={this.props.onLoginSubmit} />;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoginSubmit: e => {
      e.preventDefault();
      const form = e.target;
      const data = serialize(form, { hash: true });

      dispatch(getUser(data));
      form.reset();
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(LoginContainer)
);
