import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import jwt_decode from 'jwt-decode';

function Welcome (props) {

  switch(jwt_decode(localStorage.usertoken).role) {
    case 'admin':
      return(
        <div style={{"marginTop":"-25px","position": "relative"}}>    
          <img style={{'width':'100%','height':"95vh"}} src={'/images/admin1.jpg'}  />  
          <div className="jumbotron mt-5" style={{"opacity":".5","position":"absolute","top": "50%","left": "50%",
                                                                            "transform": "translate(-50%, -80%)","textAlign":"center"}} >
            <div style={{'color':"#000000"}}>
              <h2> Welcome Administrator </h2> 
              <h4> Manage Your Users </h4>
            </div>
          </div>
        </div> 
      )
    case 'doctor':
      return(
        <div style={{"marginTop":"-25px","position": "relative"}}>    
          <img style={{'width':'100%','height':"95vh"}} src={'/images/doctor3.jpg'}  />  
          <div className="jumbotron mt-5" style={{"opacity":".5","position":"absolute","top": "50%","left": "50%",
                                                                            "transform": "translate(-50%, -80%)","textAlign":"center"}} >
            <div style={{'color':"#000000"}}>
              <h2> Welcome Dr. {props.first_name + " " + props.last_name} </h2> 
              <h4> Enjoy Prescribing Digitally </h4>
            </div>
          </div>
        </div> 
      )
    case 'pharmasist':
      return(
        <div style={{"marginTop":"-25px","position": "relative"}}>    
          <img style={{'width':'100%','height':"95vh"}} src={'/images/pharmacist2.jpg'}  />  
          <div className="jumbotron mt-5" style={{"opacity":".5","position":"absolute","top": "50%","left": "50%",
                                                                            "transform": "translate(-50%, -80%)","textAlign":"center"}} >
            <div style={{'color':"#000000"}}>
              <h2> Welcome {props.first_name + " " + props.last_name} </h2> 
            </div>
          </div>
        </div> 
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
      <Welcome {...this.state} />
    )
  }
}
