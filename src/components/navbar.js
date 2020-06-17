import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const adminLink = (
  <>
  <li className="navbar-item">
  <Link to="/doctorslist" className="nav-link">Doctors</Link>
  </li>

  <li className="navbar-item">
  <Link to="/pharmasistlist" className="nav-link">Pharmasists</Link>
  </li>

  <li className="navbar-item">
  <Link to="/approveuser" className="nav-link">Approve User</Link>
  </li>
  </>
)

const doctorLink = (
  <>
  <li className="navbar-item">
  <Link to="/prescribe" className="nav-link">Prescribe</Link>
  </li>
  </>
)
const pharmasistLink = (
  <>
  <li className="navbar-item">
  <Link to="/viewprescription" className="nav-link">Prescriptions</Link>
  </li>
  </>
)


function GetUserLinks(props) {
  switch(jwt_decode(localStorage.usertoken).role) {
    case 'admin': return adminLink;

    case 'doctor': return doctorLink;

    case 'pharmasist': return pharmasistLink;
    default:
  }
}

class Navbar extends Component {
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
  }

  getUserLink() {
    
  }

  render() {

    const loginLink = (
      <>
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Home</Link>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </li>
        </ul>
      </>
    )

    const userLink = (
      <>
      <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
        <Link to="/dashboard" className="nav-link">Profile</Link>
        </li>

        <GetUserLinks />
      </ul>
      <ul className="navbar-nav">
        <li className="nav-item">
        <Link to="#" onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </Link>
        </li>
      </ul>
      </>
    )

    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Pharmacon</Link>
        <div className="collpase navbar-collapse">
        {localStorage.usertoken ? userLink : loginLink}
        </div>
      </nav>
    );
  }
}
export default withRouter(Navbar)