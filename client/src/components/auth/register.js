import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { registerUser } from '../../actions/auth';

const form = reduxForm({
  form: 'register',
  validate,
});

const renderField = field => (
  <div>
    <input className="form_control" {...field.input} />
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
);

function validate(formProps) {
  const errors = {};

  if (!formProps.firstName) {
    errors.firstName = 'Please enter a first name';
  }

  if (!formProps.lastName) {
    errors.lastName = 'Please enter a last name';
  }

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }
  if (!formProps.zipCode) {
    errors.zipCode = 'Please enter a zipcode';
  }

  return errors;
}

class Register extends Component {
  handleFormSubmit(formProps) {
    this.props.registerUser(formProps);
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
        <div className="row">
          <div className="col-md-6">
            <div className="input_field">
              <label className="input_label" >First Name</label>
              <Field name="firstName" className="form_control" component={renderField} type="text" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input_field">
              <label className="input_label" >Last Name</label>
              <Field name="lastName" className="form_control" component={renderField} type="text" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="input_field">
              <label>Email</label>
              <Field name="email" className="form_control" component={renderField} type="text" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="input_field">
              <label>Password</label>
              <Field name="password" className="form_control" component={renderField} type="password" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="input_field">
              <label>Zipcode</label>
              <Field name="zipCode" className="form_control" component={renderField} type="zipCode" />
            </div>
          </div>
        </div>
        <button type="submit" className="login_submit">Register</button>
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

export default connect(mapStateToProps, { registerUser })(form(Register));
