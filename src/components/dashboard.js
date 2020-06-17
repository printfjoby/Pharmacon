import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';

function Welcome (props) {

  switch(jwt_decode(localStorage.usertoken).role) {
    case 'admin':
      return(
        <>
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Welcome Admin</h1>
          </div>
        </>
      )
    case 'doctor':
      return(
        <>
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Welcome Dr. {props.first_name + " " + props.last_name} </h1>
          </div>
        </>
      )
    case 'pharmasist':
      return(
        <>
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Welcome {props.first_name + " " + props.last_name} </h1>
          </div>
        </>
      )
    default:
      return(
        <>
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Oops! Something went wrong </h1>
          </div>
        </>
      )
  }
}

export default class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      first_name: decoded.first_name,
      last_name: decoded.last_name,
    })
  }
  
  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <Welcome {...this.state} />
        </div>
      </div>
    )
  }
}
