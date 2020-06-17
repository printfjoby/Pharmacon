import React, { Component } from 'react'
import axios from 'axios';

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  handleValidation(){
    let email = this.state.email;
    let password = this.state.password;
    let errors = {};
    let formIsValid = true;

    //Email
    if(!email){
       formIsValid = false;
       errors["email"] = "Cannot be empty";
    }

    if(typeof email !== "undefined"){
      let lastAtPos = email.lastIndexOf('@');
      let lastDotPos = email.lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
         formIsValid = false;
         errors["email"] = "Email is not valid";
       }
    }
    
    //password
    if(!password){
      formIsValid = false;
      errors["password"] = "Please Enter Your Password";
   }

    this.setState({errors: errors});
    return formIsValid;
  }




  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    if(this.handleValidation()){
      const user = {
        email: this.state.email,
        password: this.state.password
      }

      axios.post('http://localhost:5000/users/login', user)
        .then(response => {
          if(!response.data.msg){ //verify that there is no error messages
            localStorage.setItem('usertoken', response.data);
            this.props.history.push(`/dashboard`);
          }else{
            this.setState({
            errors: {"invalid_login": response.data.msg}
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">

            <form noValidate onSubmit={this.onSubmit}>

              <h1 style={{textAlign:"center"}} className="h3 mb-3 font-weight-normal">Please sign in</h1>

              <span style={{color: "red"}}>{this.state.errors["invalid_login"]}</span>
              
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <span style={{color: "red"}}>{this.state.errors["email"]}</span>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <span style={{color: "red"}}>{this.state.errors["password"]}</span>
              </div>

              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
