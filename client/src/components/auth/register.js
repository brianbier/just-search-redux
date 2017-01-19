import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { registerUser } from '../actions';

const form = reduxForm({
  form: 'register',
  validate
});

const renderField = (field) => (
  <div>
    <input className="form-control" {...field.input} />
    { field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
)

function validate(formProps){
  const errors = {};

  if(!formProps.firstName){
    errors.firstName = 'Please enter a first name';
  }
  if(!formProps.lastName){
    errors.lastName = 'Please enter a last name';
  }
  if(!formProps.email){
    errors.email = 'Please enter a email';
  }
  if(!formProps.password){
    errors.password = 'Please enter a password';
  }
  if(!formProps.zipCode){
    errors.zipCode = 'Please enter a zipcode';
  }
  return errors;
}

class Register extends Component {

  handleFormSubmit(formProps){
    this.props.registerUser(formProps);
  }

  handleAlert(){
    if(this.props.errorMessage){
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      )
    }
  }

  render(){
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="row">
          <div className="col-md-6">
            <label>First Name</label>
            <Field name="firstName" className="form-control" component={renderField} type="text" />
          </div>
          <div className="col-md-6">
            <label>Last Name</label>
            <Field name="lastName" className="form-control" component={renderField} type="text" />
          </div>
          <div className="col-md-6">
            <label>Email</label>
            <Field name="email" className="form-control" component={renderField} type="text" />
          </div>          
          <div className="col-md-6">
            <label>Password</label>
            <Field name="password" className="form-control" component={renderField} type="password" />
          </div>
          <div className="col-md-6">
            <label>Zipcode</label>
            <Field name="zipCode" className="form-control" component={renderField} type="text" />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </div>
      </form>
    )
  }
}

function mapStateToProps(state){
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  }
}

export default connect(mapStateToProps,{registerUser})(form(Register));




