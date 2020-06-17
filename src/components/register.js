import React, { Component } from 'react'
import axios from 'axios';

class Register extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password:'',
      role:'',
      errors:{}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleValidation(){
    let first_name =this.state.first_name;
    let last_name =this.state.last_name;
    let email = this.state.email;
    let password = this.state.password;
    let confirm_password = this.state.confirm_password;
    let role = this.state.role;

    let errors = {};
    let formIsValid = true;

    //First Name
    if(!first_name){
      formIsValid = false;
      errors["first_name"] = "Please Enter Your First Name";
    }else{
      if(!first_name.match(/^[a-zA-Z]+$/)){
        formIsValid = false;
        errors["first_name"] = "Only letters are permitted";
      }        
    }

    //Last Name
    if(!last_name){
      formIsValid = false;
      errors["last_name"] = "Please Enter Your Last Name";
    }else{
      if(!last_name.match(/^[a-zA-Z]+$/)){
        formIsValid = false;
        errors["last_name"] = "Only letters are permitted";
      }        
    }

    //Email
    if(!email){
       formIsValid = false;
       errors["email"] = "Cannot be empty";
    }else{
      let lastAtPos = email.lastIndexOf('@');
      let lastDotPos = email.lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
         formIsValid = false;
         errors["email"] = "Email is not valid";
       }
    }
    
    //Password
    if(!password){
      formIsValid = false;
      errors["password"] = "Please Enter Your Password";
    }else{
      if(!password.match(/^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/)){
        formIsValid = false;
        errors["password"] = "Password must be of length 6 to 20 & contain atleast one digit and letter";
      }  
    }

    //Confirm Password
    if(!confirm_password){
      formIsValid = false;
      errors["confirm_password"] = "Please Confirm Your Password";
    }else{
      if(!confirm_password.match(password)){
        formIsValid = false;
        errors["confirm_password"] = "Password Mismatch";
      }  
    }

    //Confirm Password
    if(!confirm_password){
      formIsValid = false;
      errors["confirm_password"] = "Please Confirm Your Password";
    }else{
      if(!confirm_password.match(password)){
        formIsValid = false;
        errors["confirm_password"] = "Password Mismatch";
      }  
    }

    //Role
    if(!role){
      formIsValid = false;
      errors["role"] = "Please Select Your Role";
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  onSubmit(e) {
    e.preventDefault()

    if(this.handleValidation()){
      const newUser = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role
      }

      axios.post('http://localhost:5000/users/register', newUser)
      .then(response => {
        alert(response.data);
        this.props.history.push(`/`)
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 style={{textAlign:"center"}} className="h3 mb-3 font-weight-normal">Register</h1>
              <div className="form-group">
                <label htmlFor="name">First name</label>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  placeholder="Enter your first name"
                  value={this.state.first_name}
                  onChange={this.onChange}
                />
                <span style={{color: "red"}}>{this.state.errors["first_name"]}</span>
              </div>
              <div className="form-group">
                <label htmlFor="name">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  placeholder="Enter your lastname name"
                  value={this.state.last_name}
                  onChange={this.onChange}
                />
                 <span style={{color: "red"}}>{this.state.errors["last_name"]}</span>
              </div>
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
              <div className="form-group">
                <label htmlFor="confirm_password">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  value={this.state.confirm_password}
                  onChange={this.onChange}
                />
               <span style={{color: "red"}}>{this.state.errors["confirm_password"]}</span>
              </div >
              <div className="form-group" >
                <label htmlFor="role">Role: </label>
                <input type="radio" style={{marginLeft:"20px"}} name="role" value="doctor"  onChange={this.onChange}/> Doctor
                <input type="radio" style={{marginLeft:"30px"}} name="role" value="pharmasist"  onChange={this.onChange}/> Pharmasist 
                <span style={{color: "red"}}>{this.state.errors["role"]}</span>
              </div>
              <button type="submit" className="btn btn-lg btn-primary btn-block">
                Register!
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
