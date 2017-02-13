import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { loginUser } from '../../actions/auth';

const form = reduxForm({
  form: 'login',
});

class Login extends Component {
  handleFormSubmit(formProps) {
    this.props.loginUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="form_container">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          {this.renderAlert()}
          <div className="input_field">
            <label className="input_label">Email</label>
            <Field name="email" className="form_control" component="input" type="text" />
          </div>
          <div className="input_field">
            <label className="input_label">Password</label>
            <Link className="forgot" to="/forgot-password">Forgot Password?</Link>
            <Field name="password" className="form_control" component="input" type="password" />
          </div>
          <hr />
          <button className="login_submit" type="submit">Login</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message,
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, { loginUser })(form(Login));
